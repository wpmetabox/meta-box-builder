<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );

	$returnValue = isset( $field ['timestamp'] ) ? '<?= date( \'F j, Y\', $value ) ?>' : '$value';
	$this->out( '<li>' . $returnValue . '</li>' );

	$this->out( '<?php endforeach ?>', false );
	$this->out( '</ul>', false );
	return;
}

// Converting timestamp to another format:
if ( isset( $field ['timestamp'] ) ) {
	// Displaying the value:
	$this->out( '<?php // Displaying the value: ?>', false );
	$this->out( "<p>Event date: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'format' => 'F j, Y' ] ) . ' ); ?></p>', false );
	echo $this->break();

	// Getting the value:
	$this->out( '<?php', false );
	$this->out( '// Getting the value:' );
	$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<p>Event date: <?= date( \'F j, Y\', $value ) ?></p>', false, false );

	return;
}

// Displaying the value:
$this->out( '<?php // Displaying the value: ?>', false );
$this->out( "<p>Entered: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false );
echo $this->break();

// Getting the value:
$this->out( '<?php', false );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p>Entered: <?= $value ?></p>', false, false );
