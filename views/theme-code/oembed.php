<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Oembed in group' );
	$this->out( "\$values = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $values as $value ) :' );
	$this->out( $this->indent() . '<p><?= $value ?></p>' );
	$this->out( 'endforeach;' );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 0 );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( '<?php endforeach ?>', 0, 0 );

	return;
}

// Displaying the value:
$this->out( '<?php', 0 );
$this->out( '// Displaying the value:' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->break();
// Getting the value:
$this->out( '<?php', 0 );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', 0, 0 );
