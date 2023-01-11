<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . '<span>Name: <?= $value[0] ?></span>' );
	$this->out( $this->indent( 2 ) . '<span>Email: <?= $value[1] ?></span>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false, false );

	return;
}

// Displaying field inputs' values:
$this->out( '<?php // Displaying field inputs\' values: ?>', false );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
$this->out( '<span>Name: <?= $value[0] ?></span>', false );
$this->out( '<span>Email: <?= $value[1] ?></span>', false );
$this->break();

// Displaying field values in a table:
$this->out( '<?php // Displaying field values in a table: ?>', false );
$this->out( '<h3>Values</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false, false );
