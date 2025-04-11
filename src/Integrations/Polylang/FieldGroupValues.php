<?php
namespace MBB\Integrations\Polylang;

use MBB\Control;

class FieldGroupValues {
    public function __construct() {
        add_filter( 'mbb_settings_controls', [ $this, 'add_translation_control' ] );
    }

    public function add_translation_control( $controls ) {
        // Add the control after the custom settings control (index 40)
        $controls[50] = Control::Select( 'translation', [
            'label'   => __( 'Translation', 'meta-box-builder' ),
            'tooltip' => __( 'Choose how to handle field translations in this field group', 'meta-box-builder' ),
            'options' => [
                'ignore'    => __( 'Do not translate any fields in this field group', 'meta-box-builder' ),
                'translate' => __( 'Translate all fields in this field group', 'meta-box-builder' ),
                'copy'      => __( 'Synchronize values accross languages', 'meta-box-builder' ),
                'advanced'  => __( 'Set translation mode per field', 'meta-box-builder' ),
            ],
        ], 'ignore' );

        return $controls;
    }
}