import { Button, Modal, RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const TranslationModal = ( { isOpen, onClose, onSave } ) => {
	const [ translations, setTranslations ] = useState( () => {
		const input = document.querySelector( 'input[name="settings[fields_translations]"]' );
		return input?.value ? JSON.parse( input.value ) : {};
	} );

	const fields = MbbApp.fields;

	const handleChange = ( fieldId, value ) => {
		setTranslations( prev => ( {
			...prev,
			[ fieldId ]: value
		} ) );
	};

	const handleSave = () => {
		onSave( translations );
		onClose();
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
							<th align="center">{ __( 'Ignore', 'meta-box-builder' ) }</th>
							<th align="center">{ __( 'Translate', 'meta-box-builder' ) }</th>
						</tr>
					</thead>
					<tbody>
						{
							fields.map( field => (
								<tr key={ field.id }>
									<td>{ field.name || field.id }</td>
									<td align="center">
										<RadioControl
											selected={ translations[ field.id ] }
											options={ [
												{ label: '', value: 'ignore' }
											] }
											onChange={ value => handleChange( field.id, value ) }
										/>
									</td>
									<td align="center">
										<RadioControl
											selected={ translations[ field.id ] }
											options={ [
												{ label: '', value: 'translate' }
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
				<Button isPrimary onClick={ handleSave }>{ __( 'Save', 'meta-box-builder' ) }</Button>
			</div>
		</Modal>
	);
};

export default TranslationModal;