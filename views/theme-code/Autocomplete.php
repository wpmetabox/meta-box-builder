<?php
if ( ! isset( $field['clone'] ) ) {
	// Displaying selected values:
	echo $this->out( '<?php', false );
	echo $this->out( '// Displaying selected values:' );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( '<li><?= $value ?></li>' );
	echo $this->out( '<?php endforeach ?>', false );
	echo $this->out( '</ul>', false );
	echo $this->break();

	// Displaying selected labels:
	echo $this->out( '<?php // Displaying selected labels: ?>', false );
	echo $this->out( '<p>Choices:</p>', false );
	echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->break();

	// Displaying both values and labels:
	echo $this->out( '<?php', false );
	echo $this->out( '// Displaying both values and labels:' );
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

// Displaying cloneable values:
echo $this->out( '<?php', false );
echo $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( "\$options = \$field['options'];" );
echo $this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );

echo $this->out( '<ul>', false );
echo $this->out( $this->indent() . '<?php foreach ( $values as $clone ) : ?>', false );
echo $this->out( $this->indent() . '<li>' );
echo $this->out( $this->indent( 2 ) . '<ul>' );

echo $this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $value ) : ?>' );
echo $this->out( $this->indent( 4 ) . '<li>' );
echo $this->out( $this->indent( 5 ) . 'Value: <?= $value ?><br>' );
echo $this->out( $this->indent( 5 ) . 'Label: <?= $options[ $value ] ?>' );
echo $this->out( $this->indent( 4 ) . '</li>' );
echo $this->out( $this->indent( 3 ) . '<?php endforeach ?>' );

echo $this->out( $this->indent( 2 ) . '</ul>' );
echo $this->out( $this->indent() . '</li>' );
echo $this->out( $this->indent() . '<?php endforeach ?>', false );
echo $this->out( '</ul>', false, false );