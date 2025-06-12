import { Button, Modal, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Tooltip from './Tooltip';

const TranslationModal = ( { isOpen, onClose, settings, updateSettings } ) => {
	const translations = settings?.fields_translations || {};

	const fields = MbbApp.fields;

	const handleChange = ( fieldId, value ) => {
		updateSettings( 'fields_translations', {
			...translations,
			[ fieldId ]: value
		} );
	};

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
						{
							fields.map( field => field.id && ![ 'button', 'custom_html', 'divider', 'heading', 'tab' ].includes( field.type ) && (
								<tr key={ field.id }>
									<td>{ field.name || field.id }</td>
									<td>
										<RadioControl
											selected={ translations[ field.id ] }
											options={ [
												{ label: '', value: 'ignore' }
											] }
											onChange={ value => handleChange( field.id, value ) }
										/>
									</td>
									<td>
										<RadioControl
											selected={ translations[ field.id ] || 'translate' }
											options={ [
												{ label: '', value: 'translate' }
											] }
											onChange={ value => handleChange( field.id, value ) }
										/>
									</td>
									<td>
										<RadioControl
											selected={ translations[ field.id ] }
											options={ [
												{ label: '', value: 'copy' }
											] }
											onChange={ value => handleChange( field.id, value ) }
										/>
									</td>
								</tr>
							) )
						}
					</tbody>
				</table>
			</div>
			<div className="mbb-translation-modal__footer">
				<Button isPrimary onClick={ onClose }>{ __( 'Save', 'meta-box-builder' ) }</Button>
			</div>
		</Modal>
	);
};

export default TranslationModal;