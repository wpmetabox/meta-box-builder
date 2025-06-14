import { Button, Modal, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Tooltip from '../../../controls/Tooltip';
import useSettings from '../../../hooks/useSettings';
import { buildFieldsTree } from '../../../list-functions';

const TranslationModal = ( { isOpen, onClose } ) => {
	const fields = buildFieldsTree().filter( field => field.id && ![ 'button', 'custom_html', 'divider', 'heading', 'tab' ].includes( field.type ) );

	return isOpen && (
		<Modal
			title={ __( 'Select a translation mode for each field', 'meta-box-builder' ) }
			onRequestClose={ onClose }
			className="mbb-translation-modal"
			size="large"
		>
			<div className="mbb-translation-modal__content">
				<table className="mbb-translation-modal__table">
					<thead>
						<tr>
							<th>{ __( 'Field', 'meta-box-builder' ) }</th>
							<th align="center">
								{ __( 'Ignore', 'meta-box-builder' ) }
								<Tooltip content={ __( 'The field value will NOT be copied to the new translation', 'meta-box-builder' ) } />
							</th>
							<th align="center">
								{ __( 'Translate', 'meta-box-builder' ) }
								<Tooltip content={ __( 'The field value will be copied to the new translation, then you can edit it', 'meta-box-builder' ) } />
							</th>
							<th align="center">
								{ __( 'Synchronize', 'meta-box-builder' ) }
								<Tooltip content={ __( 'The field value will be synced to ALL translations whenever you make changes to ANY translation', 'meta-box-builder' ) } />
							</th>
						</tr>
					</thead>
					<tbody>
						{ fields.map( field => <Field key={ field.id } field={ field } /> ) }
					</tbody>
				</table>
			</div>
			<div className="mbb-translation-modal__footer">
				<Button isPrimary onClick={ onClose }>{ __( 'Save', 'meta-box-builder' ) }</Button>
			</div>
		</Modal>
	);
};

const Field = ( { field } ) => {
	const { getSetting, updateSetting } = useSettings();
	const mode = getSetting( `fields_translations.${ field.id }`, 'ignore' );
	const handleChange = value => updateSetting( `fields_translations.${ field.id }`, value );

	return (
		<tr key={ field.id }>
			<td>{ field.name || field.id }</td>
			<td>
				<RadioControl
					selected={ mode }
					options={ [
						{ label: '', value: 'ignore' }
					] }
					onChange={ handleChange }
				/>
			</td>
			<td>
				<RadioControl
					selected={ mode }
					options={ [
						{ label: '', value: 'translate' }
					] }
					onChange={ handleChange }
				/>
			</td>
			<td>
				<RadioControl
					selected={ mode }
					options={ [
						{ label: '', value: 'copy' }
					] }
					onChange={ handleChange }
				/>
			</td>
		</tr>
	);
};

export default TranslationModal;