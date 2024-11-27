import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const CloneFeatures = ( { defaultValue, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-multiple-choices">
			<label>
				<input type="hidden" name={ `${ name.replace( 'clone_features', 'sortable' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'clone_features', 'sortable' ) }` }
					defaultChecked={ defaultValue.sortable }
					value={ true }
				/>
				<Tooltip text={ __( 'Allow to drag-and-drop reorder clones', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span>{ __( 'Sortable', 'meta-box-builder' ) }</span>
				</Tooltip>
			</label>
			<label>
				<input type="hidden" name={ `${ name.replace( 'clone_features', 'clone_default' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'clone_features', 'clone_default' ) }` }
					defaultChecked={ defaultValue.clone_default }
					value={ true }
				/>
				<Tooltip text={ __( 'Set default values for new clones', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span>{ __( 'Set default value', 'meta-box-builder' ) }</span>
				</Tooltip>
			</label>
			<label>
				<input type="hidden" name={ `${ name.replace( 'clone_features', 'clone_empty_start' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'clone_features', 'clone_empty_start' ) }` }
					defaultChecked={ defaultValue.clone_empty_start }
					value={ true }
				/>
				<Tooltip text={ __( 'Start from no inputs except the "+ Add more" button', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span>{ __( 'Start from no inputs', 'meta-box-builder' ) }</span>
				</Tooltip>
			</label>
			<label>
				<input type="hidden" name={ `${ name.replace( 'clone_features', 'clone_as_multiple' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'clone_features', 'clone_as_multiple' ) }` }
					defaultChecked={ defaultValue.clone_as_multiple }
					value={ true }
				/>
				<Tooltip text={ __( 'Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span>{ __( 'Save in multiple rows', 'meta-box-builder' ) }</span>
				</Tooltip>
			</label>
		</div>
	</DivRow>
);

export default CloneFeatures;