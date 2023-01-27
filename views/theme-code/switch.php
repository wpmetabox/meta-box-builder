<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( 'foreach ( $values as $value ) :' );
	$this->out( $this->indent() . 'if ( $value ) {' );
	$this->out( $this->indent( 2 ) . 'echo \'Checked\';' );
	$this->out( $this->indent( 3 ) . '} else {' );
	$this->out( $this->indent( 2 ) . 'echo \'Unchecked\';' );
	$this->out( $this->indent() . '}' );
	$this->out( 'endforeach' );
	$this->out( '?>', false, false );
	return;
}

// Conditional check:
$this->out( '<?php', false );
$this->out( '// Conditional check:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'if ( $value ) {' );
$this->out( $this->indent() . 'echo \'Checked\';' );
$this->out( '} else {' );
$this->out( $this->indent() . 'echo \'Unchecked\';' );
$this->out( '}' );
$this->out( '?>', false );
$this->break();

// Displaying "Yes/No":
$this->out( '<?php', false );
$this->out( '// Displaying "Yes/No":' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );

