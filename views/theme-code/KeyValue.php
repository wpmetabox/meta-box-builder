<?php
// Displaying list of key-value pairs:
$this->out( '<?php', false );
$this->out( '// Displaying list of key-value pairs:' );
$this->out( "\$pairs = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3>Specification</h3>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $pairs as $pair ) : ?>' );
$this->out( $this->indent() . '<li><label><?= $pair[0] ?>:</label> <?= $pair[1] ?></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false );
echo $this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( '<h3>Specification</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false, false );
