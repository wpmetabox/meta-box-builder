<?php
if ( ! isset( $field['clone'] ) ) {
	// Displaying selected values:
	$this->out( '<?php', false );
	$this->out( '// Displaying selected values:' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<li><?= $value ?></li>' );
	$this->out( '<?php endforeach ?>', false );
	$this->out( '</ul>', false );
	echo $this->break();

	// Displaying selected labels:
	$this->out( '<?php // Displaying selected labels: ?>', false );
	$this->out( '<p>Choices:</p>', false );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->break();

	// Displaying both values and labels:
	$this->out( '<?php', false );
	$this->out( '// Displaying both values and labels:' );
	$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( "\$options = \$field['options'];" );
	$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );

	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
	$this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );

	$this->out( '?>', false, false );
	return;

}

// Displaying cloneable values:
$this->out( '<?php', false );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );

$this->out( '<ul>', false );
$this->out( $this->indent() . '<?php foreach ( $values as $clone ) : ?>', false );
$this->out( $this->indent() . '<li>' );
$this->out( $this->indent( 2 ) . '<ul>' );

$this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $value ) : ?>' );
$this->out( $this->indent( 4 ) . '<li>' );
$this->out( $this->indent( 5 ) . 'Value: <?= $value ?><br>' );
$this->out( $this->indent( 5 ) . 'Label: <?= $options[ $value ] ?>' );
$this->out( $this->indent( 4 ) . '</li>' );
$this->out( $this->indent( 3 ) . '<?php endforeach ?>' );

$this->out( $this->indent( 2 ) . '</ul>' );
$this->out( $this->indent() . '</li>' );
$this->out( $this->indent() . '<?php endforeach ?>', false );
$this->out( '</ul>', false, false );