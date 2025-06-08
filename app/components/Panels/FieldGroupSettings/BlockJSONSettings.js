import { Flex } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from '../../../controls/DivRow';
import Input from '../../../controls/Input';
import Toggle from "../../../controls/Toggle";
import { fetcher } from "../../../functions";
import useSettings from "../../../hooks/useSettings";

const BlockJSONSettings = () => {
	const { getSetting, updateSetting } = useSettings();
	const block_json = getSetting( 'block_json', {} );

	const [ blockPathError, setBlockPathError ] = useState( MbbApp.data?.block_path_error );
	const [ isNewer, setIsNewer ] = useState( true );

	/**
	 * Get local path data, including whether the path is writable, block.json version.
	 *
	 * @param any _
	 * @param string path
	 */
	const getLocalPathData = async ( _, path ) => {
		const postName = document.getElementById( 'post_name' ).value;

		if ( !postName ) {
			return;
		}

		const { is_writable, is_newer } = await fetcher( 'local-path-data', {
			path,
			version: block_json.version || 0,
			postName
		} );

		const errorMessage = is_writable ? '' : __( 'The path is not writable.', 'meta-box-builder' );

		setIsNewer( is_newer );
		setBlockPathError( errorMessage );
	};

	useEffect( () => {
		if ( !block_json.path ) {
			return;
		}

		getLocalPathData( null, block_json.path );
	}, [] );

	const handleOverride = async ( e ) => {
		e.preventDefault();

		if ( !confirm( __( 'Are you sure you want to override the block settings from the block.json file?', 'meta-box-builder' ) ) ) {
			return;
		}

		try {
			const response = await fetcher( 'override-block-json', {
				post_id: MbbApp.data.post_id,
				post_title: document.getElementById( 'post_title' ).value,
				post_name: document.getElementById( 'post_name' ).value,
				post_status: document.getElementById( 'post_status' ).value,
				settings: {
					block_json: {
						path: block_json.path,
						version: block_json.version
					}
				}
			}, 'POST' );

			if ( response.success ) {
				window.location.reload();
			} else {
				alert( response.message || __( 'Failed to override block.json', 'meta-box-builder' ) );
			}
		} catch ( error ) {
			alert( __( 'Failed to override block.json', 'meta-box-builder' ) );
		}
	};

	return <>
		<Toggle
			name="block_json.enable"
			label={ __( 'Generate block.json', 'meta-box-builder' ) }
			componentId="settings-block_json_enable"
			defaultValue={ !!block_json.enable }
			updateField={ updateSetting }
		/>

		<Input
			name="block_json.path"
			label={ __( 'Block folder', 'meta-box-builder' ) }
			componentId="settings-block-path"
			description={ __( 'Enter absolute path to the folder containing the <code>block.json</code> and block asset files. <b>Do not include the block name (e.g. field group ID)</b>. The full path for the block files will be like <code>path/to/folder/block-name/block.json</code>.', 'meta-box-builder' ) }
			defaultValue={ block_json.path }
			error={ blockPathError }
			updateField={ value => {
				updateSetting( 'block_json.path', value );
				getLocalPathData( null, value );
			} }
			dependency="block_json_enable:true"
		/>

		<input type="hidden" name="settings[block_json][version]" value={ block_json.version } />

		{
			isNewer &&
			<DivRow dependency="block_json_enable:true" label={ __( 'Synchronize block.json', 'meta-box-builder' ) }>
				<Flex direction="column">
					<div className="og-error" dangerouslySetInnerHTML={ {
						__html: __( 'We detected a newer version of <code>block.json</code>, do you want to override settings from this file?', 'meta-box-builder' )
					} }></div>

					<button
						type="button"
						className="button secondary"
						onClick={ handleOverride }
					>
						{ __( 'Yes, override from block.json', 'meta-box-builder' ) }
					</button>
				</Flex>
			</DivRow>
		}

		<DivRow dependency="block_json_enable:true" label={ `<span class="og-indent"></span>${ __( 'Supported variables', 'meta-box-builder' ) }` } >
			<table className="og-block-description">
				<tbody>
					<tr>
						<td><code>{ "{{ site.path }}" }</code></td>
						<td>{ __( 'Site path', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ site.url }}" }</code></td>
						<td>{ __( 'Site URL', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ theme.path }}" }</code></td>
						<td>{ __( 'Path to the current [child] theme directory', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ theme.url }}" }</code></td>
						<td>{ __( 'URL to the current [child] theme directory', 'meta-box-builder' ) }</td>
					</tr>
				</tbody>
			</table>
		</DivRow>
	</>;
};

export default BlockJSONSettings;