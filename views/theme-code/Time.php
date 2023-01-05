<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( '<p><?= $value ?></p>' );
	echo $this->out( '<?php endforeach ?>', false, false );

	return;
}

// Displaying the value:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the value:' );
echo $this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->break();
// Getting the value:
echo $this->out( '<?php', false );
echo $this->out( '// Getting the value:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( 'echo $value;' );
echo $this->out( '?>', false, false );
