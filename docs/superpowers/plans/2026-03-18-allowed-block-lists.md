# Allowed Block Lists Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add ability to create, manage, and reuse predefined lists of allowed blocks for the block editor field.

**Architecture:** Add new global option to store block lists, new REST API endpoints, new frontend components (custom select control + modals), and migration logic to convert existing allowed_blocks settings.

**Tech Stack:** PHP (WordPress REST API), React (WordPress components), WordPress options API

---

## File Structure

### New Files to Create
- `src/RestApi/AllowedBlockLists.php` - REST API controller for CRUD operations
- `src/Helpers/AllowedBlockLists.php` - Helper class for managing block lists
- `assets/app/controls/BlockListSelect.js` - Custom select control with icon buttons
- `assets/app/components/Modals/BlockListEditor.js` - Modal for create/edit lists
- `assets/app/components/Modals/ManageBlockLists.js` - Modal for managing all lists

### Files to Modify
- `src/Helpers/Data.php` - Add method to get all available blocks
- `src/Registry.php` - Add `allowed_block_list` setting
- `src/RestApi/Save.php` - Add reusable parse method

---

## Task 1: PHP Backend - Helper Class

**Files:**
- Create: `src/Helpers/AllowedBlockLists.php`

- [ ] **Step 1: Create AllowedBlockLists helper class**

```php
<?php
namespace MBB\Helpers;

use WP_Block_Type_Registry;

class AllowedBlockLists {
    public const OPTION_NAME = 'mbb_allowed_block_lists';
    public const INITIALIZED_OPTION = 'mbb_allowed_block_lists_initialized';

    public static function get_lists(): array {
        return get_option( self::OPTION_NAME, [] );
    }

    public static function update_lists( array $lists ): bool {
        return (bool) update_option( self::OPTION_NAME, $lists );
    }

    public static function get_list( string $id ): ?array {
        $lists = self::get_lists();
        return $lists[ $id ] ?? null;
    }

    public static function update_list( string $id, string $name, array $blocks ): bool {
        $lists            = self::get_lists();
        $lists[ $id ]    = [
            'name'   => $name,
            'blocks' => self::filter_valid_blocks( $blocks ),
        ];
        return self::update_lists( $lists );
    }

    public static function delete_list( string $id ): bool {
        $lists = self::get_lists();
        unset( $lists[ $id ] );
        return self::update_lists( $lists );
    }

    public static function seed_defaults(): void {
        if ( get_option( self::INITIALIZED_OPTION ) ) {
            return;
        }

        $defaults = [
            'basic'  => [
                'name'   => __( 'Basic', 'meta-box-builder' ),
                'blocks' => [
                    'core/paragraph',
                    'core/heading',
                    'core/image',
                    'core/list',
                    'core/list-item',
                    'core/quote',
                ],
            ],
            'text'   => [
                'name'   => __( 'Text', 'meta-box-builder' ),
                'blocks' => [
                    'core/paragraph',
                    'core/heading',
                    'core/list',
                    'core/list-item',
                    'core/quote',
                ],
            ],
            'layout' => [
                'name'   => __( 'Layout', 'meta-box-builder' ),
                'blocks' => [
                    'core/group',
                    'core/columns',
                    'core/cover',
                    'core/media-text',
                    'core/paragraph',
                    'core/heading',
                    'core/image',
                    'core/list',
                    'core/list-item',
                    'core/quote',
                ],
            ],
        ];

        update_option( self::OPTION_NAME, $defaults );
        update_option( self::INITIALIZED_OPTION, true );
    }

    private static function filter_valid_blocks( array $blocks ): array {
        $registry = WP_Block_Type_Registry::get_instance();

        return array_filter( $blocks, static function ( $block ) use ( $registry ) {
            return $registry->is_registered( $block );
        } );
    }

    public static function generate_id( string $name ): string {
        $id       = sanitize_key( $name );
        $lists    = self::get_lists();
        $counter  = 2;

        while ( isset( $lists[ $id ] ) ) {
            $id = sanitize_key( $name ) . '-' . $counter;
            $counter++;
        }

        return $id;
    }

    public static function get_options_for_select(): array {
        self::seed_defaults();
        $lists   = self::get_lists();
        $options = [ '' => __( 'Allow all blocks', 'meta-box-builder' ) ];

        foreach ( $lists as $id => $list ) {
            $options[ $id ] = $list['name'];
        }

        return $options;
    }
}
```

---

## Task 2: PHP Backend - REST API Controller

**Files:**
- Create: `src/RestApi/AllowedBlockLists.php`
- Modify: `src/RestApi/Fields.php` - Add blocks endpoint
- Modify: `src/RestApi/Save.php` - Extract reusable save method

- [ ] **Step 1: Create REST API controller**

```php
<?php
namespace MBB\RestApi;

use MBB\Helpers\AllowedBlockLists;
use WP_REST_Server;
use WP_REST_Request;
use WP_Error;

class AllowedBlockLists {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    public function register_routes(): void {
        register_rest_route( 'mbb', 'allowed-block-lists', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'           => [ $this, 'get_items' ],
                'permission_callback' => [ $this, 'has_permission' ],
            ],
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'           => [ $this, 'update_item' ],
                'permission_callback' => [ $this, 'has_permission' ],
                'args'               => $this->get_schema(),
            ],
        ] );

        register_rest_route( 'mbb', 'allowed-block-lists/(?P<id>[\w-]+)', [
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'           => [ $this, 'delete_item' ],
                'permission_callback' => [ $this, 'has_permission' ],
            ],
        ] );

        register_rest_route( 'mbb', 'allowed-block-lists/import', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'           => [ $this, 'import_items' ],
                'permission_callback' => [ $this, 'has_permission' ],
            ],
        ] );

        register_rest_route( 'mbb', 'allowed-block-lists/export', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'           => [ $this, 'export_items' ],
                'permission_callback' => [ $this, 'has_permission' ],
            ],
        ] );
    }

    public function has_permission(): bool {
        return current_user_can( 'manage_options' );
    }

    public function get_items( WP_REST_Request $request ): array {
        AllowedBlockLists::seed_defaults();
        return AllowedBlockLists::get_lists();
    }

    /**
     * @return array|WP_Error
     */
    public function update_item( WP_REST_Request $request ) {
        $id     = $request->get_param( 'id' );
        $name   = $request->get_param( 'name' );
        $blocks = $request->get_param( 'blocks' ) ?: [];

        if ( empty( $name ) ) {
            return new WP_Error( 'rest_invalid', __( 'Name is required.', 'meta-box-builder' ), [ 'status' => 400 ] );
        }

        if ( empty( $id ) ) {
            $id = AllowedBlockLists::generate_id( $name );
        }

        AllowedBlockLists::update_list( $id, $name, $blocks );

        return AllowedBlockLists::get_lists();
    }

    public function delete_item( WP_REST_Request $request ): array {
        $id = $request->get_param( 'id' );
        AllowedBlockLists::delete_list( $id );

        return AllowedBlockLists::get_lists();
    }

    /**
     * @return array|WP_Error
     */
    public function import_items( WP_REST_Request $request ) {
        $data = $request->get_param( 'lists' ) ?: [];

        if ( ! is_array( $data ) ) {
            return new WP_Error( 'rest_invalid', __( 'Invalid data format.', 'meta-box-builder' ), [ 'status' => 400 ] );
        }

        $lists = AllowedBlockLists::get_lists();

        foreach ( $data as $id => $item ) {
            if ( isset( $item['name'], $item['blocks'] ) ) {
                $lists[ $id ] = [
                    'name'   => $item['name'],
                    'blocks' => $item['blocks'],
                ];
            }
        }

        AllowedBlockLists::update_lists( $lists );

        return AllowedBlockLists::get_lists();
    }

    public function export_items( WP_REST_Request $request ): array {
        return AllowedBlockLists::get_lists();
    }

    private function get_schema(): array {
        return [
            'id'     => [
                'type'        => 'string',
                'description' => __( 'List ID (optional).', 'meta-box-builder' ),
            ],
            'name'   => [
                'type'        => 'string',
                'description' => __( 'List name.', 'meta-box-builder' ),
                'required'    => true,
            ],
            'blocks' => [
                'type'        => 'array',
                'description' => __( 'Array of block names.', 'meta-box-builder' ),
                'items'       => [
                    'type' => 'string',
                ],
            ],
        ];
    }
}
```

- [ ] **Step 2: Register the controller**

Add instantiation in `bootstrap.php` after other RestApi controllers:

```php
new RestApi\AllowedBlockLists();
```

- [ ] **Step 3: Add blocks endpoint for frontend**

Modify `src/RestApi/Fields.php` to add endpoint for getting all available blocks:

```php
register_rest_route( 'mbb', '/blocks', [
    'methods'             => WP_REST_Server::READABLE,
    'callback'            => function() {
        return \MBB\Helpers\Data::get_blocks();
    },
    'permission_callback' => '__return_true',
] );
```

- [ ] **Step 4: Extract save logic to reusable method in Save.php**

Add a static method to `src/RestApi/Save.php` that can be reused by both the save endpoint and the list deletion logic:

```php
public static function parse( \WP_Post $post, array $fields, array $settings, ?string $post_title = null, ?string $post_name = null ): MetaBoxParser {
    $base_parser = new BaseParser();

    $base_parser->set_settings( $settings )->parse_boolean_values()->parse_numeric_values();
    update_post_meta( $post->ID, 'settings', $base_parser->get_settings() );

    $base_parser->set_settings( $fields )->parse_boolean_values()->parse_numeric_values();
    update_post_meta( $post->ID, 'fields', $base_parser->get_settings() );

    $submitted_data = [
        'fields'     => $fields,
        'settings'   => $settings,
        'post_title' => $post_title ?? $post->post_title,
        'post_name'  => $post_name ?? $post->post_name,
    ];

    $parser = new MetaBoxParser( $submitted_data );
    $parser->parse();

    update_post_meta( $post->ID, 'meta_box', $parser->get_settings() );

    return $parser;
}
```

Then update the existing `save()` method to use it:

```php
public function save( WP_REST_Request $request ): array {
    $post_id     = $request->get_param( 'post_id' );
    $post_title  = $request->get_param( 'post_title' );
    $post_name   = $request->get_param( 'post_name' );
    $fields      = $request->get_param( 'fields' );
    $settings    = $request->get_param( 'settings' );

    if ( ! $post_name ) {
        $post_name = sanitize_title( $post_title );
    }

    $post = get_post( $post_id );
    if ( ! $post ) {
        return [
            'success' => false,
            'message' => __( 'The field group might have been deleted. Please refresh the page and try again.', 'meta-box-builder' ),
        ];
    }

    $post_status = $post->post_status;
    if ( ! in_array( $post_status, [ 'publish', 'draft' ], true ) ) {
        $post_status = 'publish';
    }

    $result = wp_update_post( [
        'ID'          => $post_id,
        'post_title'  => $post_title,
        'post_name'   => $post_name,
        'post_status' => $post_status,
        'post_date'   => $post->post_date,
    ] );

    if ( is_wp_error( $result ) ) {
        return [
            'success' => false,
            'message' => $result->get_error_message(),
        ];
    }

    $fields   = apply_filters( 'mbb_save_fields', $fields, $request );
    $settings = apply_filters( 'mbb_save_settings', $settings, $request );

    $parser = self::parse( $post, $fields, $settings, $post_title, $post_name );

    do_action( 'mbb_after_save', $parser, $post_id, compact( 'fields', 'settings', 'post_title', 'post_name' ) );

    return [
        'success' => true,
        'message' => __( 'Data saved successfully', 'meta-box-builder' ),
    ];
}
```

- [ ] **Step 5: Update delete_item to use the new helper method**

Update the `delete_item` method in the REST API controller to use `Save::parse()`:

```php
public function delete_item( WP_REST_Request $request ): array {
    $id = $request->get_param( 'id' );

    $query = new \WP_Query( [
        'post_type'      => 'meta-box',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'meta_key'       => 'fields',
    ] );

    foreach ( $query->posts as $post ) {
        $fields   = get_post_meta( $post->ID, 'fields', true );
        $settings = get_post_meta( $post->ID, 'settings', true );

        if ( ! is_array( $fields ) ) {
            continue;
        }

        $modified = false;
        foreach ( $fields as &$field ) {
            if ( isset( $field['allowed_block_list'] ) && $field['allowed_block_list'] === $id ) {
                unset( $field['allowed_block_list'] );
                unset( $field['allowed_blocks'] );
                $modified = true;
            }
        }

        if ( $modified ) {
            Save::parse( $post, $fields, $settings ?? [] );
        }
    }

    AllowedBlockLists::delete_list( $id );

    return AllowedBlockLists::get_lists();
}
```

---

## Task 3: PHP Backend - Registry Setting

**Files:**
- Modify: `src/Registry.php` - Add `allowed_block_list` setting

- [ ] **Step 1: Add new setting to Registry**

Find where `allowed_blocks` is defined and add new setting:

```php
'allowed_block_list' => Control::Select( 'allowed_block_list', [
    'label'       => __( 'Allowed block list', 'meta-box-builder' ),
    'description' => __( 'Select a predefined list of allowed blocks', 'meta-box-builder' ),
    'options'     => MBB\Helpers\AllowedBlockLists::get_options_for_select(),
] ),
```

- [ ] **Step 2: Add migration logic**

**When loading field settings (REST API):**
In `src/RestApi/Fields.php`, when preparing field settings for frontend, add migration logic:

```php
// Check if allowed_block_list is empty but allowed_blocks has value
if ( empty( $field['allowed_block_list'] ) && ! empty( $field['allowed_blocks'] ) ) {
    $list_name = sprintf( __( '%s: allowed blocks', 'meta-box-builder' ), $field['name'] ?? $field['id'] );
    $list_id   = \MBB\Helpers\AllowedBlockLists::generate_id( $list_name );
    
    \MBB\Helpers\AllowedBlockLists::update_list( $list_id, $list_name, $field['allowed_blocks'] );
    
    $field['allowed_block_list'] = $list_id;
    unset( $field['allowed_blocks'] );
}
```

**When saving field settings:**
Convert `allowed_block_list` back to `allowed_blocks` before saving:

```php
if ( ! empty( $settings['allowed_block_list'] ) ) {
    $list = \MBB\Helpers\AllowedBlockLists::get_list( $settings['allowed_block_list'] );
    if ( $list ) {
        $settings['allowed_blocks'] = $list['blocks'];
    }
} else {
    unset( $settings['allowed_blocks'] );
}
```

Note: When a list is deleted, `delete_item()` already clears `allowed_block_list` and `allowed_blocks` from affected fields and reparses the field group. No additional fallback logic is needed.

---

## Task 4: Frontend - BlockListSelect Control

**Files:**
- Create: `assets/app/controls/BlockListSelect.js`

- [ ] **Step 1: Create BlockListSelect component with modal integration**

```javascript
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import BlockListEditor from '../components/Modals/BlockListEditor';
import ManageBlockLists from '../components/Modals/ManageBlockLists';

const BlockListSelect = ( { name, value, updateField } ) => {
    const [ lists, setLists ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ showEditor, setShowEditor ] = useState( false );
    const [ showManage, setShowManage ] = useState( false );
    const [ editId, setEditId ] = useState( null );

    const fetchLists = () => {
        apiFetch( { path: '/mbb/allowed-block-lists' } )
            .then( data => {
                const options = Object.entries( data ).map( ( [ id, list ] ) => ( {
                    value: id,
                    label: list.name,
                } ) );
                setLists( options );
                setLoading( false );
            } )
            .catch( () => setLoading( false ) );
    };

    useEffect( () => {
        fetchLists();
    }, [] );

    const handleChange = e => updateField( name, e.target.value );

    const handleManageClose = () => {
        setShowManage( false );
        fetchLists();
    };

    const handleEdit = id => {
        setEditId( id );
        setShowEditor( true );
        setShowManage( false );
    };

    const handleAddNew = () => {
        setEditId( null );
        setShowEditor( true );
        setShowManage( false );
    };

    const handleEditorClose = () => {
        setShowEditor( false );
        setEditId( null );
    };

    const handleEditorSaved = () => fetchLists();

    return (
        <div className="mbb-block-list-select">
            <select
                value={ value || '' }
                onChange={ handleChange }
                disabled={ loading }
                className="mbb-select"
            >
                <option value="">{ __( 'Allow all blocks', 'meta-box-builder' ) }</option>
                { lists.map( list => (
                    <option key={ list.value } value={ list.value }>{ list.label }</option>
                ) ) }
            </select>
            <div className="mbb-block-list-buttons">
                <Button
                    icon="menu"
                    variant="tertiary"
                    label={ __( 'Manage lists', 'meta-box-builder' ) }
                    onClick={ () => setShowManage( true ) }
                />
                <Button
                    icon="plus"
                    variant="tertiary"
                    label={ __( 'Add new list', 'meta-box-builder' ) }
                    onClick={ handleAddNew }
                />
                <Button
                    icon="edit"
                    variant="tertiary"
                    label={ __( 'Edit list', 'meta-box-builder' ) }
                    onClick={ () => handleEdit( value ) }
                    disabled={ ! value }
                />
            </div>
            <ManageBlockLists
                isOpen={ showManage }
                onClose={ handleManageClose }
                onEdit={ handleEdit }
                onAddNew={ handleAddNew }
            />
            <BlockListEditor
                isOpen={ showEditor }
                onClose={ handleEditorClose }
                editId={ editId }
                onSaved={ handleEditorSaved }
            />
        </div>
    );
};

export default BlockListSelect;
```

- [ ] **Step 2: Add styles**

Add CSS for the control in appropriate SASS file.

---

## Task 5: Frontend - BlockListEditor Modal

**Files:**
- Create: `assets/app/components/Modals/BlockListEditor.js`

- [ ] **Step 1: Create BlockListEditor modal component**

```javascript
import { __ } from '@wordpress/i18n';
import { Modal, Button, TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const BlockListEditor = ( { isOpen, onClose, editId, onSaved } ) => {
    const [ name, setName ] = useState( '' );
    const [ availableBlocks, setAvailableBlocks ] = useState( [] );
    const [ selectedBlocks, setSelectedBlocks ] = useState( [] );
    const [ saving, setSaving ] = useState( false );

    useEffect( () => {
        if ( ! isOpen ) return;

        // Fetch available blocks
        apiFetch( { path: '/mbb/blocks' } )
            .then( data => setAvailableBlocks( data ) )
            .catch( () => setAvailableBlocks( [] ) );

        // Load existing list if editing
        if ( editId ) {
            apiFetch( { path: '/mbb/allowed-block-lists' } )
                .then( data => {
                    const list = data[ editId ];
                    if ( list ) {
                        setName( list.name );
                        setSelectedBlocks( list.blocks || [] );
                    }
                } );
        } else {
            setName( '' );
            setSelectedBlocks( [] );
        }
    }, [ isOpen, editId ] );

    const moveToSelected = block => setSelectedBlocks( prev => [ ...prev, block ] );

    const moveToAvailable = block => setSelectedBlocks( prev => prev.filter( b => b !== block ) );

    const handleSave = async ( asNew = false ) => {
        if ( ! name.trim() ) return;

        setSaving( true );
        try {
            await apiFetch( {
                path: '/mbb/allowed-block-lists',
                method: 'POST',
                data: {
                    ...(!asNew && editId ? { id: editId } : {}),
                    name: name.trim(),
                    blocks: selectedBlocks,
                },
            } );
            onSaved();
            onClose();
        } catch ( e ) {
            console.error( e );
        }
        setSaving( false );
    };

    if ( ! isOpen ) return null;

    // Create a map for quick label lookup
    const blockMap = Object.fromEntries( availableBlocks.map( b => [ b.value, b.label ] ) );

    // Data::get_blocks() returns { value, label }, filter selected
    const available = availableBlocks.filter( b => ! selectedBlocks.includes( b.value ) );

    // For selected blocks, show formatted label (value is the block name like "core/paragraph")
    const getBlockLabel = blockName => blockMap[ blockName ] || blockName;

    return (
        <Modal
            title={ editId ? __( 'Edit List', 'meta-box-builder' ) : __( 'Add New List', 'meta-box-builder' ) }
            onClose={ onClose }
            className="mbb-block-list-editor"
        >
            <TextControl
                label={ __( 'List Name', 'meta-box-builder' ) }
                value={ name }
                onChange={ setName }
                required
            />

            <div className="mbb-block-list-columns">
                <div className="mbb-block-list-column">
                    <h4>{ __( 'Available Blocks', 'meta-box-builder' ) }</h4>
                    <div className="mbb-block-list-items">
                        { available.map( block => (
                            <div
                                key={ block.value }
                                className="mbb-block-item"
                                onClick={ () => moveToSelected( block.value ) }
                            >
                                <span className="mbb-block-label">{ block.label }</span>
                            </div>
                        ) ) }
                    </div>
                </div>

                <div className="mbb-block-list-column">
                    <h4>{ __( 'Selected Blocks', 'meta-box-builder' ) }</h4>
                    <div className="mbb-block-list-items">
                        { selectedBlocks.map( block => (
                            <div
                                key={ block }
                                className="mbb-block-item"
                                onClick={ () => moveToAvailable( block ) }
                            >
                                <span className="mbb-block-label">{ getBlockLabel( block ) }</span>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>

            <div className="mbb-modal-actions">
                <Button
                    variant="primary"
                    onClick={ handleSave }
                    disabled={ saving || ! name.trim() }
                >
                    { __( 'Save', 'meta-box-builder' ) }
                </Button>
                { editId && (
                    <Button
                        onClick={ () => handleSave( true ) }
                        disabled={ saving || ! name.trim() }
                    >
                        { __( 'Save as new', 'meta-box-builder' ) }
                    </Button>
                ) }
                <Button
                    variant="secondary"
                    onClick={ onClose }
                >
                    { __( 'Cancel', 'meta-box-builder' ) }
                </Button>
            </div>
        </Modal>
    );
};

export default BlockListEditor;
```

---

## Task 6: Frontend - ManageBlockLists Modal

**Files:**
- Create: `assets/app/components/Modals/ManageBlockLists.js`

- [ ] **Step 1: Create ManageBlockLists modal component**

```javascript
import { __ } from '@wordpress/i18n';
import { Modal, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const ManageBlockLists = ( { isOpen, onClose, onEdit, onAddNew } ) => {
    const [ lists, setLists ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ deleting, setDeleting ] = useState( null );

    const fetchLists = () => {
        apiFetch( { path: '/mbb/allowed-block-lists' } )
            .then( data => {
                setLists( Object.entries( data ).map( ( [ id, list ] ) => ( {
                    id,
                    name: list.name,
                    count: list.blocks?.length || 0,
                } ) ) );
                setLoading( false );
            } )
            .catch( () => setLoading( false ) );
    };

    useEffect( () => {
        if ( isOpen ) {
            fetchLists();
        }
    }, [ isOpen ] );

    const handleDelete = async id => {
        if ( ! confirm( __( 'Are you sure you want to delete this list?', 'meta-box-builder' ) ) ) {
            return;
        }

        setDeleting( id );
        try {
            await apiFetch( {
                path: `/mbb/allowed-block-lists/${ id }`,
                method: 'DELETE',
            } );
            fetchLists();
        } catch ( e ) {
            console.error( e );
        }
        setDeleting( null );
    };

    const handleExport = () => {
        apiFetch( { path: '/mbb/allowed-block-lists/export' } )
            .then( data => {
                const blob = new Blob( [ JSON.stringify( data, null, 2 ) ], { type: 'application/json' } );
                const url = URL.createObjectURL( blob );
                const a = document.createElement( 'a' );
                a.href = url;
                a.download = 'allowed-block-lists.json';
                a.click();
                URL.revokeObjectURL( url );
            } );
    };

    const handleImport = () => {
        const input = document.createElement( 'input' );
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async e => {
            const file = e.target.files[ 0 ];
            if ( ! file ) return;

            const reader = new FileReader();
            reader.onload = async event => {
                try {
                    const lists = JSON.parse( event.target.result );
                    await apiFetch( {
                        path: '/mbb/allowed-block-lists/import',
                        method: 'POST',
                        data: { lists },
                    } );
                    fetchLists();
                } catch ( err ) {
                    console.error( err );
                }
            };
            reader.readAsText( file );
        };
        input.click();
    };

    if ( ! isOpen ) return null;

    return (
        <Modal
            title={ __( 'Manage Block Lists', 'meta-box-builder' ) }
            onClose={ onClose }
            className="mbb-manage-block-lists"
        >
            <div className="mbb-manage-header">
                <Button variant="primary" onClick={ onAddNew }>
                    { __( 'Add New', 'meta-box-builder' ) }
                </Button>
            </div>

            <table className="widefat">
                <thead>
                    <tr>
                        <th>{ __( 'Name', 'meta-box-builder' ) }</th>
                        <th>{ __( 'Block Count', 'meta-box-builder' ) }</th>
                        <th>{ __( 'Actions', 'meta-box-builder' ) }</th>
                    </tr>
                </thead>
                <tbody>
                    { loading ? (
                        <tr><td colSpan={ 3 }>{ __( 'Loading...', 'meta-box-builder' ) }</td></tr>
                    ) : lists.length === 0 ? (
                        <tr><td colSpan={ 3 }>{ __( 'No lists found.', 'meta-box-builder' ) }</td></tr>
                    ) : (
                        lists.map( list => (
                            <tr key={ list.id }>
                                <td>{ list.name }</td>
                                <td>{ list.count }</td>
                                <td>
                                    <Button
                                        variant="link"
                                        onClick={ () => onEdit( list.id ) }
                                    >
                                        { __( 'Edit', 'meta-box-builder' ) }
                                    </Button>
                                    <Button
                                        variant="link"
                                        isDestructive
                                        onClick={ () => handleDelete( list.id ) }
                                        disabled={ deleting === list.id }
                                    >
                                        { __( 'Delete', 'meta-box-builder' ) }
                                    </Button>
                                </td>
                            </tr>
                        ) )
                    ) }
                </tbody>
            </table>

            <div className="mbb-manage-footer">
                <Button onClick={ handleExport }>
                    { __( 'Export All', 'meta-box-builder' ) }
                </Button>
                <Button onClick={ handleImport }>
                    { __( 'Import', 'meta-box-builder' ) }
                </Button>
            </div>
        </Modal>
    );
};

export default ManageBlockLists;
```

---

## Task 7: Frontend - Integration

**Files:**
- Create: `assets/app/controls/BlockListSelect.js`
- Create: `assets/app/components/Modals/BlockListEditor.js`
- Create: `assets/app/components/Modals/ManageBlockLists.js`

Controls are dynamically loaded via lazy imports in `assets/app/components/Panels/FieldSettings/Tab.js`. The control filename must match the control name specified in the Registry.

- [ ] **Step 1: Create control and modal components**

Create the files as specified in Tasks 4, 5, and 6. The control name `BlockListSelect` in the Registry will automatically load `assets/app/controls/BlockListSelect.js`.

- [ ] **Step 2: Build frontend**

```bash
pnpm run build
```

---

## Task 8: Testing

**Files:**
- Test: Various PHP and JS tests

- [ ] **Step 1: Write PHPUnit tests for AllowedBlockLists helper**

Test: get_lists, update_list, delete_list, generate_id, filter_valid_blocks

- [ ] **Step 2: Write PHPUnit tests for REST API**

Test: GET, POST, DELETE, import, export endpoints

- [ ] **Step 3: Test migration logic**

- [ ] **Step 4: Run tests**

```bash
./vendor/bin/phpunit
```

---

## Task 9: Lint & Typecheck

- [ ] **Step 1: Run PHP lint**

```bash
composer phpcs src
```

- [ ] **Step 2: Run JS lint/build**

```bash
pnpm run build
```

---

## Summary

Total tasks: 9

Priority order:
1. PHP Backend - Helper Class
2. PHP Backend - REST API Controller
3. PHP Backend - Registry Setting
4. Frontend - BlockListSelect Control
5. Frontend - BlockListEditor Modal
6. Frontend - ManageBlockLists Modal
7. Frontend - Integration
8. Testing
9. Lint & Typecheck
