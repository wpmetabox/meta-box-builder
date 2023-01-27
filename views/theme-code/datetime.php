<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', 0 );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 0 );

	$returnValue = isset( $field ['timestamp'] ) ? '<?= date( \'F j, Y\', $value ) ?>' : '$value';
	$this->out( '<li>' . $returnValue . '</li>' );

	$this->out( '<?php endforeach ?>', 0 );
	$this->out( '</ul>', 0 );
	return;
}

// Converting timestamp to another format:
if ( isset( $field ['timestamp'] ) ) {
	// Displaying the value:
	$this->out( '<?php // Displaying the value: ?>', 0 );
	$this->out( "<p>Event date: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'format' => 'F j, Y' ] ) . ' ); ?></p>', 0 );
	$this->break();

	// Getting the value:
	$this->out( '<?php', 0 );
	$this->out( '// Getting the value:' );
	$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', 0 );
	$this->out( '<p>Event date: <?= date( \'F j, Y\', $value ) ?></p>', 0, 0 );

	return;
}

// Displaying the value:
$this->out( '<?php // Displaying the value: ?>', 0 );
$this->out( "<p>Entered: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', 0 );
$this->break();

// Getting the value:
$this->out( '<?php', 0 );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p>Entered: <?= $value ?></p>', 0, 0 );
