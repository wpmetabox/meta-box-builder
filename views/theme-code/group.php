<?php
$subfields = $field['fields'] ?? [];
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable group:
	if ( ! $in_group ) {
		$this->out( '<?php' );
	}
	$this->out( "\$groups = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( 'foreach ( $groups as $group ) {' );
	++$this->size_indent;
	foreach ( $subfields as $sub_field ) {
		$this->out( '' );
		$this->out( "// Field {$sub_field['id']}:" );
		echo $this->get_theme_code( $sub_field, true );
	}
	--$this->size_indent;
	$this->out( '' );
	$this->out( '}' );
	if ( ! $in_group ) {
		$this->out( '?>', 0, 0 );
	}
	return;
}

// Displaying the value:
if ( ! $in_group ) {
	$this->out( '<?php' );
}
$this->out( "\$group = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
foreach ( $subfields as $sub_field ) {
	$this->out( '' );
	$this->out( "// Field {$sub_field['id']}:" );
	echo $this->get_theme_code( $sub_field, true );
}
if ( ! $in_group ) {
	$this->out( '?>', 0, 0 );
}
