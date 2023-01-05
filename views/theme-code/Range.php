<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( '<?php endforeach ?>', false, false );

	return;
}

// Displaying the value:
$this->out( '<?php', false );
$this->out( '// Displaying the value:' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
echo $this->break();

// Getting the value:
$this->out( '<?php', false );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', false );
echo $this->break();

// Formatting the value:
$this->out( '<?php', false );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo number_format( $value );' );
$this->out( '?>', false, false );