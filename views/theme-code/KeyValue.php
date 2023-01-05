<?php
// Displaying list of key-value pairs:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying list of key-value pairs:' );
echo $this->out( "\$pairs = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3>Specification</h3>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $pairs as $pair ) : ?>' );
echo $this->out( $this->indent() . '<li><label><?= $pair[0] ?>:</label> <?= $pair[1] ?></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( '<h3>Specification</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false, false );
