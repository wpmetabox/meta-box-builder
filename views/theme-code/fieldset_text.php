<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', 0 );
	$this->out( '// Displaying field inputs\' values:' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', 0 );

	$this->out( '<?php foreach ( $values as $value ) : ?>', 0 );
	$this->out( "<p>Name: <?= \$value['name'] ?></p>" );
	$this->out( "<p>Address: <?= \$value['address'] ?></p>" );
	$this->out( "<p>Email: <?= \$value['email'] ?></p>" );
	$this->out( '<?php endforeach ?>', 0, 0 );
	return;
}

// Displaying field inputs' values:
$this->out( '<?php', 0 );
$this->out( '// Displaying field inputs\' values:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( "<p>Name: <?= \$value['name'] ?></p>", 0 );
$this->out( "<p>Address: <?= \$value['address'] ?></p>", 0 );
$this->out( "<p>Email: <?= \$value['email'] ?></p>", 0, 0 );
