<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

// Displaying list of key-value pairs:
$this->out( '<?php', 0 );
$this->out( '// Displaying list of key-value pairs:' );
$this->out( "\$pairs = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<h3>Specification</h3>', 0 );
$this->out( '<ul>', 0 );
$this->out( '<?php foreach ( $pairs as $pair ) : ?>' );
$this->out( $this->indent() . '<li><label><?= $pair[0] ?>:</label> <?= $pair[1] ?></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( '<h3>Specification</h3>', 0 );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 0 );
