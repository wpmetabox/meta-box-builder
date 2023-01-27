<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying the list of multiple choices (values):
	$this->out( '<?php', 0 );
	$this->out( '// Displaying the list of multiple choices (values):', 0 );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
	$this->out( '<li><?= $value ?></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 2 );
	$this->break();

	// Displaying the list of multiple choices (values and labels).
	$this->out( '<?php', 0 );
	$this->out( '// Displaying both value and label.', 0 );
	$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( "\$options = \$field['options'];", 0 );
	$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
	$this->out( '<li>', 2 );
	$this->out( 'Value: <?= $value ?><br>', 3 );
	$this->out( 'Label: <?= $options[ $value ] ?>', 3 );
	$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 0 );
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', 0 );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
	$this->out( '<li><?= $value ?></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 0 );
	return;
}

// Getting selected value.
$this->out( '<?php', 0 );
$this->out( '// Getting selected value.', 0 );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( 'echo $value;', 0 );
$this->out( '?>', 0, 2 );

// Displaying selected label.
$this->out( '<?php', 0 );
$this->out( '// Displaying selected label.', 0 );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( '?>', 0, 2 );

// Displaying both value and label.
$this->out( '<?php', 0 );
$this->out( '// Displaying both value and label.', 0 );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( "\$options = \$field['options'];", 0 );
$this->out( "\$value  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( '?>', 0 );
$this->out( 'Value: <?= $value ?><br>', 0 );
$this->out( 'Label: <?= $options[ $value ] ?>', 0, 0 );
