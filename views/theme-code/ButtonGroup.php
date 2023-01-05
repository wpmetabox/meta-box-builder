<?php
if ( isset( $field['multiple'] ) ) {
	// Displaying the list of multiple choices (values):
	$this->out( '<?php', false );
	$this->out( '// Displaying the list of multiple choices (values):' );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li><?= $value ?></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );
	echo $this->break();

	// Displaying the list of multiple choices (values and labels).
	$this->out( '<?php', false );
	$this->out( '// Displaying both value and label.' );
	$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( "\$options = \$field['options'];" );
	$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	echo $this->break();
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
	$this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( $this->indent() . '<li><?= $value ?></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );
	return;
}

// Getting selected value.
$this->out( '<?php', false );
$this->out( '// Getting selected value.' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', false );
echo $this->break();

// Displaying selected label.
$this->out( '<?php', false );
$this->out( '// Displaying selected label.' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
echo $this->break();

// Displaying both value and label.
$this->out( '<?php', false );
$this->out( '// Displaying both value and label.' );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( "\$value  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
echo $this->break();
$this->out( 'Value: <?= $value ?><br>', false );
$this->out( 'Label: <?= $options[ $value ] ?>', false );
echo $this->break();
