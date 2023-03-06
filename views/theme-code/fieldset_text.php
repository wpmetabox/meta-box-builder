<?php
if ( $in_group ) {
	// Displaying in group
	if ( ! empty( $field['clone'] ) ) {
		$this->out( '// Displaying field inputs\' values:' );
		$this->out( "\$clones = \$group[ '" . $field['id'] . "' ] ?? '';" );
		$this->out( '?>' );

		$this->out( '<?php foreach ( $clones as $clone ) : ?>' );
			$this->out( "<p>Name: <?= \$clone['name'] ?></p>", 1 );
			$this->out( "<p>Address: <?= \$clone['address'] ?></p>", 1 );
			$this->out( "<p>Email: <?= \$clone['email'] ?></p>", 1 );
		$this->out( 'endforeach', 1, 1 );
		$this->out( '<?php' );
		return;
	}

	$this->out( '// Displaying field inputs\' values:' );
	$this->out( "\$clone = \$group[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( '?>' );
	$this->out( "<p>Name: <?= \$clone['name'] ?></p>" );
	$this->out( "<p>Address: <?= \$clone['address'] ?></p>" );
	$this->out( "<p>Email: <?= \$clone['email'] ?></p>", 1, 1 );
	$this->out( '<?php' );
	return;
}

if ( ! empty( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php' );
	$this->out( '// Displaying field inputs\' values:' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>' );

	$this->out( '<?php foreach ( $values as $value ) : ?>' );
		$this->out( "<p>Name: <?= \$value['name'] ?></p>", 1 );
		$this->out( "<p>Address: <?= \$value['address'] ?></p>", 1 );
		$this->out( "<p>Email: <?= \$value['email'] ?></p>", 1 );
	$this->out( '<?php endforeach ?>', 0, 0 );
	return;
}

// Displaying field inputs' values:
$this->out( '<?php' );
$this->out( '// Displaying field inputs\' values:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( "<p>Name: <?= \$value['name'] ?></p>" );
$this->out( "<p>Address: <?= \$value['address'] ?></p>" );
$this->out( "<p>Email: <?= \$value['email'] ?></p>", 0, 0 );
