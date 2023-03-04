<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable group:
	$this->out( '<?php' );
	$this->out( "\$groups = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( 'foreach ( $groups as $group ) :' );
	if ( count( $field['fields'] ) > 0 ) {
		$this->size_indent = 1;
		foreach ( $field['fields'] as $subField ) {
			echo $this->get_theme_code( $subField, true );
		}
		$this->size_indent = 0;
	}
	$this->out( 'endforeach;' );
	$this->out( '?>', 0, 0 );
}

// Displaying the value:
$this->out( '<?php' );
$this->out( "\$group = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
if ( count( $field['fields'] ) > 0 ) {
	foreach ( $field['fields'] as $subField ) {
		echo $this->get_theme_code( $subField, true );
	}
}
$this->out( '?>', 0, 0 );
