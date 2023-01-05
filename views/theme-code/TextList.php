<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
	echo $this->out( $this->indent() . '<li>' );
	echo $this->out( $this->indent( 2 ) . '<span>Name: <?= $value[0] ?></span>' );
	echo $this->out( $this->indent( 2 ) . '<span>Email: <?= $value[1] ?></span>' );
	echo $this->out( $this->indent() . '</li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false, false );

	return;
}

// Displaying field inputs' values:
echo $this->out( '<?php // Displaying field inputs\' values: ?>', false );
echo $this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
echo $this->out( '<span>Name: <?= $value[0] ?></span>', false );
echo $this->out( '<span>Email: <?= $value[1] ?></span>', false );
echo $this->break();

// Displaying field values in a table:
echo $this->out( '<?php // Displaying field values in a table: ?>', false );
echo $this->out( '<h3>Values</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false, false );
