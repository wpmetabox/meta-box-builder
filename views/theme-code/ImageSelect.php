<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
    $this->out( '<ul>', false );
    $this->out( '<?php foreach ( $values as $value ) : ?>' );
    $this->out( $this->indent() . '<li><?= $value ?></li>' );
    $this->out( '<?php endforeach ?>' );
    $this->out( '</ul>', false, false );
	return;
}

// Displaying the selected value:
$this->out( '<?php', false );
$this->out( '// Displaying the selected value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p>Selected: <?= $value ?></p>', false );
echo $this->break();

// Displaying the list of multiple choices:
$this->out( '<?php', false );
$this->out( '// Displaying the list of multiple choices:' );
$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $values as $value ) : ?>' );
$this->out( $this->indent() . '<li><?= $value ?></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false, false );