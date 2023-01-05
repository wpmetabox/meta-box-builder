<?php
if ( isset( $field['multiple'] ) ) {
	// Displaying the list of multiple choices (values):
	echo $this->out( '<?php', false );
	echo $this->out( '// Displaying the list of multiple choices (values):' );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
	echo $this->out( $this->indent() . '<li><?= $value ?></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );
	echo $this->break();

	// Displaying the list of multiple choices (values and labels).
	echo $this->out( '<?php', false );
	echo $this->out( '// Displaying both value and label.' );
	echo $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( "\$options = \$field['options'];" );
	echo $this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->break();
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
	echo $this->out( $this->indent() . '<li>' );
	echo $this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
	echo $this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
	echo $this->out( $this->indent() . '</li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
	echo $this->out( $this->indent() . '<li><?= $value ?></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );
	return;
}

// Getting selected value.
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected value.' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( 'echo $value;' );
echo $this->out( '?>', false );
echo $this->break();

// Displaying selected label.
echo $this->out( '<?php', false );
echo $this->out( '// Displaying selected label.' );
echo $this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->break();

// Displaying both value and label.
echo $this->out( '<?php', false );
echo $this->out( '// Displaying both value and label.' );
echo $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( "\$options = \$field['options'];" );
echo $this->out( "\$value  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->break();
echo $this->out( 'Value: <?= $value ?><br>', false );
echo $this->out( 'Label: <?= $options[ $value ] ?>', false );
echo $this->break();
