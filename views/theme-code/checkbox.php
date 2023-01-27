<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( ! empty( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( 'foreach ( $values as $value ) {' );
		$this->out( 'if ( $value ) {', 1 );
			$this->out( 'echo \'Checked\';', 2 );
		$this->out( '} else {', 1 );
			$this->out( 'echo \'Unchecked\';', 2 );
		$this->out( '}', 1 );
	$this->out( '}' );
	$this->out( '?>', 0, 0 );
	return;
}

// Conditional check:
$this->out( '<?php' );
$this->out( '// Conditional check:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'if ( $value ) {' );
	$this->out( 'echo \'Checked\';', 1 );
$this->out( '} else {' );
	$this->out( 'echo \'Unchecked\';', 1 );
$this->out( '}' );
$this->out( '?>', 0, 3 );

// Displaying "Yes/No":
$this->out( '<?php' );
$this->out( '// Displaying "Yes/No":' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0, 0 );

