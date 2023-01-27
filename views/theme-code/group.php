<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable group:
	$this->out( '<?php', false );
	$this->out( "\$group_values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( 'foreach ( $group_values as $group_value ) :' );
	if ( count( $field['fields'] ) > 0 ) {
		$this->size_indent = 1;
		foreach ( $field['fields'] as $subField ) {			
			echo $this->get_theme_code( $subField, false, true );	
		}
		$this->size_indent = 0;
	}
	$this->out( 'endforeach;' );
	$this->out( '?>', false, false );	
}

// Displaying the value:
$this->out( '<?php', false );
$this->out( "\$group_value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
if ( count( $field['fields'] ) > 0 ) {
	foreach ( $field['fields'] as $subField ) {
		echo $this->get_theme_code( $subField, false, true );	
	}
}
$this->out( '?>', false, false );
