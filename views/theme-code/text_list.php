<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . '<span>Name: <?= $value[0] ?></span>' );
	$this->out( $this->indent( 2 ) . '<span>Email: <?= $value[1] ?></span>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0, 0 );

	return;
}

// Displaying field inputs' values:
$this->out( '<?php // Displaying field inputs\' values: ?>', 0 );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0 );
$this->out( '<span>Name: <?= $value[0] ?></span>', 0 );
$this->out( '<span>Email: <?= $value[1] ?></span>', 0 );
$this->break();

// Displaying field values in a table:
$this->out( '<?php // Displaying field values in a table: ?>', 0 );
$this->out( '<h3>Values</h3>', 0 );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0, 0 );
