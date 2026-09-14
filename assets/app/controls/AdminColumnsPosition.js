import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useAllFields from "../hooks/useAllFields";
import useSettings from "../hooks/useSettings";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AdminColumnsPosition = ( { name, defaultValue, updateField, ...rest } ) => {
	const { getObjectType, getPostTypes, getPrefix } = useSettings();
	const objectType = getObjectType();
	const postTypes = getPostTypes();
	const coreColumns = objectTypeFields( objectType, postTypes );
	const coreColumnIds = coreColumns.map( ( [ id ] ) => id );

	const defaultColumns = {
		term: 'name',
		user: 'username',
	};
	const defaultColumn = defaultColumns[ objectType ] || 'title';

	let fields = useAllFields().map( field => [ field.id, `${ field.name } (${ field.id })` ] );
	fields = [ ...coreColumns, ...fields ];

	const handleChangeType = e => updateField( `${ name }.type`, e.target.value );
	const handleChangeColumn = ( inputRef, value ) => updateField( `${ name }.column`, value );
	const handleSelectColumn = ( inputRef, value ) => {
		const column = coreColumnIds.includes( value ) ? value : `${ getPrefix() || '' }${ value }`;
		inputRef.current.value = column;
		updateField( `${ name }.column`, column );
	};

	useEffect( () => {
		let shouldUpdate = false;
		let type;
		let column;
		if ( typeof defaultValue === 'string' ) {
			const parts = defaultValue.split( ' ' );
			type = parts[ 0 ] || 'after';
			column = parts[ 1 ] || defaultColumn;
			shouldUpdate = true;
		} else {
			if ( ! defaultValue.type ) {
				type = 'after';
				shouldUpdate = true;
			}
			if ( ! defaultValue.column ) {
				column = defaultColumn;
				shouldUpdate = true;
			}
		}

		if ( shouldUpdate ) {
			if ( type ) {
				updateField( `${ name }.type`, type );
			}
			if ( column ) {
				updateField( `${ name }.column`, column );
			}
		}
	}, [ JSON.stringify( defaultValue ) ] );

	return (
		<DivRow { ...rest }>
			<select defaultValue={ defaultValue?.type } onChange={ handleChangeType }>
				<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
				<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
				<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
			</select>
			<FieldInserter
				defaultValue={ defaultValue?.column }
				items={ fields }
				isID={ true }
				exclude={ coreColumnIds }
				onChange={ handleChangeColumn }
				onSelect={ handleSelectColumn }
			/>
		</DivRow>
	);
};

const objectTypeFields = ( objectType, postTypes ) => {
	if ( objectType === 'term' ) {
		return [
			[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
			[ 'name', __( 'Name', 'meta-box-builder' ) ],
			[ 'description', __( 'Description', 'meta-box-builder' ) ],
			[ 'slug', __( 'Slug', 'meta-box-builder' ) ],
			[ 'count', __( 'Count', 'meta-box-builder' ) ],
		];
	}

	if ( objectType === 'user' ) {
		return [
			[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
			[ 'username', __( 'Username', 'meta-box-builder' ) ],
			[ 'name', __( 'Name', 'meta-box-builder' ) ],
			[ 'email', __( 'Email', 'meta-box-builder' ) ],
			[ 'role', __( 'Role', 'meta-box-builder' ) ],
			[ 'posts', __( 'Posts', 'meta-box-builder' ) ],
		];
	}

	let fields = [
		[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
		[ 'title', __( 'Title', 'meta-box-builder' ) ],
		[ 'author', __( 'Author', 'meta-box-builder' ) ],
		[ 'categories', __( 'Categories', 'meta-box-builder' ) ],
		[ 'tags', __( 'Tags', 'meta-box-builder' ) ],
		[ 'comments', __( 'Comments', 'meta-box-builder' ) ],
		[ 'date', __( 'Date', 'meta-box-builder' ) ],
	];

	const types = Array.isArray( postTypes ) ? postTypes : [ postTypes ];

	// WooCommerce Order columns
	if ( types.includes( 'shop_order' ) ) {
		fields.push(
			[ 'order_number', __( 'Order: Order', 'meta-box-builder' ) ],
			[ 'order_date', __( 'Order: Date', 'meta-box-builder' ) ],
			[ 'order_status', __( 'Order: Status', 'meta-box-builder' ) ],
			[ 'billing_address', __( 'Order: Billing address', 'meta-box-builder' ) ],
			[ 'shipping_address', __( 'Order: Shipping address', 'meta-box-builder' ) ],
			[ 'order_total', __( 'Order: Total', 'meta-box-builder' ) ],
			[ 'wc_actions', __( 'Order: Actions', 'meta-box-builder' ) ],
		);
	}

	// WooCommerce Subscription columns
	if ( types.includes( 'shop_subscription' ) ) {
		fields.push(
			[ 'status', __( 'Subscription: Status', 'meta-box-builder' ) ],
			[ 'order_title', __( 'Subscription: Subscription', 'meta-box-builder' ) ],
			[ 'order_items', __( 'Subscription: Items', 'meta-box-builder' ) ],
			[ 'recurring_total', __( 'Subscription: Total', 'meta-box-builder' ) ],
			[ 'start_date', __( 'Subscription: Start date', 'meta-box-builder' ) ],
			[ 'end_date', __( 'Subscription: End date', 'meta-box-builder' ) ],
			[ 'trial_end_date', __( 'Subscription: Trial end date', 'meta-box-builder' ) ],
			[ 'next_payment_date', __( 'Subscription: Next payment', 'meta-box-builder' ) ],
			[ 'last_payment_date', __( 'Subscription: Last order date', 'meta-box-builder' ) ],
			[ 'orders', __( 'Subscription: Related orders', 'meta-box-builder' ) ],
		);
	}

	return fields;
};

export default AdminColumnsPosition;
