<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );

	$returnValue = isset( $field ['timestamp'] ) ? '<?= date( \'F j, Y\', $value ) ?>' : '$value';
	echo $this->out( '<li>' . $returnValue . '</li>' );

	echo $this->out( '<?php endforeach ?>', false );
	echo $this->out( '</ul>', false );
	return;
}

// Converting timestamp to another format:
if ( isset( $field ['timestamp'] ) ) {
	// Displaying the value:
	echo $this->out( '<?php // Displaying the value: ?>', false );
	echo $this->out( "<p>Event date: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'format' => 'F j, Y' ] ) . ' ); ?></p>', false );
	echo $this->break();

	// Getting the value:
	echo $this->out( '<?php', false );
	echo $this->out( '// Getting the value:' );
	echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<p>Event date: <?= date( \'F j, Y\', $value ) ?></p>', false, false );

	return;
}

// Displaying the value:
echo $this->out( '<?php // Displaying the value: ?>', false );
echo $this->out( "<p>Entered: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false );
echo $this->break();

// Getting the value:
echo $this->out( '<?php', false );
echo $this->out( '// Getting the value:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p>Entered: <?= $value ?></p>', false, false );
