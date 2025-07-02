import { useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Color from "./Color";
import FileInput from "./FileInput";
import Select from "./Select";

const Background = ( { field } ) => {
	const ref = useRef();

	const colorField = {};

	const imageField = {
		placeholder: __( 'Background Image', 'meta-box-builder' ),
	};

	const repeatField = {
		placeholder: __( '-- Repeat --', 'meta-box-builder' ),
	};

	const positionField = {
		placeholder: __( '-- Position --', 'meta-box-builder' ),
	};

	const attachField = {
		placeholder: __( '-- Attachment --', 'meta-box-builder' ),
	};

	const sizeField = {
		placeholder: __( '-- Size --', 'meta-box-builder' ),
	};

	return (
		<>
			<div className="rwmb-background-row">
				<Color field={ colorField } />
			</div>
			<div className="rwmb-background-row">
				<FileInput field={ imageField } />
			</div>
			<div className="rwmb-background-row">
				<Select field={ repeatField } />
				<Select field={ positionField } />
				<Select field={ attachField } />
				<Select field={ sizeField } />
			</div>
		</>
	);
};

export default Background;