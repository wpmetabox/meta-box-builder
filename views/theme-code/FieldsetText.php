<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( '// Displaying field inputs\' values:' );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );

	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( "<p>Name: <?= \$value['name'] ?></p>" );
	echo $this->out( "<p>Address: <?= \$value['address'] ?></p>" );
	echo $this->out( "<p>Email: <?= \$value['email'] ?></p>" );
	echo $this->out( '<?php endforeach ?>', false, false );
	return;
}

// Displaying field inputs' values:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying field inputs\' values:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( "<p>Name: <?= \$value['name'] ?></p>", false );
echo $this->out( "<p>Address: <?= \$value['address'] ?></p>", false );
echo $this->out( "<p>Email: <?= \$value['email'] ?></p>", false, false );
