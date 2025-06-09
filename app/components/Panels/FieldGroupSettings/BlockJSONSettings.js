import { Button } from "@wordpress/components";
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

	const [ blockPathError, setBlockPathError ] = useState( '' );
	const [ isNewer, setIsNewer ] = useState( true );

	const getLocalPathData = async () => {
		const postName = document.querySelector( '#post_name' ).value;
		if ( !postName ) {
			return;
		}

		const { is_writable, is_newer } = await fetcher( 'local-path-data', {
			path: block_json.path,
			version: block_json.version || 0,
			postName
		} );

		const errorMessage = is_writable ? '' : __( 'The path is not writable.', 'meta-box-builder' );

		setIsNewer( is_newer );
		setBlockPathError( errorMessage );
	};

	useEffect( () => {
		getLocalPathData();
	}, [ block_json.path ] );

	const handleOverride = async ( e ) => {
		e.preventDefault();

		if ( !confirm( __( 'Are you sure you want to override the block settings from the block.json file?', 'meta-box-builder' ) ) ) {
			return;
		}

		try {
			const response = await fetcher( 'override-from-block-json', {
				post_id: document.querySelector( '#post_ID' ).value,
				post_name: document.querySelector( '#post_name' ).value,
				path: block_json.path,
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
			updateField={ updateSetting }
			dependency="block_json_enable:true"
		/>

		{
			isNewer &&
			<DivRow dependency="block_json_enable:true" label={ __( 'Override from block.json', 'meta-box-builder' ) }>
				<p className="og-error">
					{ __( 'We detected a newer version of block.json, do you want to override settings from this file?', 'meta-box-builder' ) }
				</p>
				<Button variant="secondary" onClick={ handleOverride } text={ __( 'Yes, override from block.json', 'meta-box-builder' ) } />
			</DivRow>
		}

		<DivRow dependency="block_json_enable:true" label={ __( 'Supported variables', 'meta-box-builder' ) }>
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