import { memo } from "@wordpress/element";
import FieldLabel from "./Elements/FieldLabel";

const Heading = ( { field, updateField } ) => (
	<>
		{
			field.name && (
				<h4>
					<FieldLabel field={ field } updateField={ updateField } />
				</h4>
			)
		}
		{ field.desc && <p className="description">{ field.desc }</p> }
	</>
);

export default memo( Heading, ( prev, next ) => prev.field.name === next.field.name && prev.field.desc === next.field.desc );