<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( ! empty( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', 0 );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( 'foreach ( $values as $value ) {', 0 );
	$this->out( 'if ( $value ) {', 1 );
	$this->out( 'echo \'Checked\';', 2 );
	$this->out( '} else {', 1 );
	$this->out( 'echo \'Unchecked\';', 2 );
	$this->out( '}', 1 );
	$this->out( '}', 0 );
	$this->out( '?>', 0, 0 );
	return;
}

// Conditional check:
$this->out( '<?php', 0 );
$this->out( '// Conditional check:', 0 );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( 'if ( $value ) {', 0 );
$this->out( 'echo \'Checked\';', 1 );
$this->out( '} else {', 0 );
$this->out( 'echo \'Unchecked\';', 1 );
$this->out( '}', 0 );
$this->out( '?>', 0, 2 );

// Displaying "Yes/No":
$this->out( '<?php', 0 );
$this->out( '// Displaying "Yes/No":', 0 );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( '?>', 0, 0 );

