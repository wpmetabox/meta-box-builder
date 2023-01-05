<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( '// Displaying field inputs\' values:' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );

	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( "<p>Name: <?= \$value['name'] ?></p>" );
	$this->out( "<p>Address: <?= \$value['address'] ?></p>" );
	$this->out( "<p>Email: <?= \$value['email'] ?></p>" );
	$this->out( '<?php endforeach ?>', false, false );
	return;
}

// Displaying field inputs' values:
$this->out( '<?php', false );
$this->out( '// Displaying field inputs\' values:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( "<p>Name: <?= \$value['name'] ?></p>", false );
$this->out( "<p>Address: <?= \$value['address'] ?></p>", false );
$this->out( "<p>Email: <?= \$value['email'] ?></p>", false, false );
