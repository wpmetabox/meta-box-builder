<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( '<p><?= $value ?></p>' );
	echo $this->out( '<?php endforeach ?>', false, false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying the list of multiple choices (values):
	echo $this->out( '<?php // Displaying the list of multiple choices (values): ?>', false );
	echo $this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( '<p><?= $value ?></p>' );
	echo $this->out( '<?php endforeach ?>', false );
	$this->break();

	// Displaying the list of multiple choices (values and labels):
	echo $this->out( '<?php', false );
	echo $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( "\$options = \$field['options'];" );
	echo $this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );

	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
	echo $this->out( $this->indent() . '<li>' );
	echo $this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
	echo $this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
	echo $this->out( $this->indent() . '</li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );

	echo $this->out( '?>', false, false );

	return;
}

// Displaying the selected value:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the value:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
echo $this->out( '?>', false );
echo $this->out( '<p>Selected: <?= $value ?></p>', false );
echo $this->break();

// Displaying the selected label:
echo $this->out( '<?php // Displaying the value: ?>', false );
echo $this->out( "<p>My choice: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false );
echo $this->break();

// Displaying both value and label:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying both values and labels:' );
echo $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( "\$options = \$field['options'];" );
echo $this->out( "\$value  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->break();
echo $this->out( 'Value: <?= $value ?><br>', false );
echo $this->out( 'Label: <?= $options[ $value ] ?>', false, false );
