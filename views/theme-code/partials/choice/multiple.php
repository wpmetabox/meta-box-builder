<?php
// Displaying selected values.
$this->out( '<?php' );
$this->out( '// Displaying selected values:' );
$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
		$this->out( '<li><?= $value ?></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 3 );

// Displaying selected labels:
$this->out( '<?php // Displaying selected labels: ?>' );
$this->out( '<p>Choices:</p>' );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 3 );

// Displaying both values and labels.
$this->out( '<?php' );
$this->out( '// Displaying both values and labels:' );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );

$this->out( '<ul>' );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
		$this->out( '<li>', 2 );
			$this->out( 'Value: <?= $value ?><br>', 3 );
			$this->out( 'Label: <?= $options[ $value ] ?>', 3 );
		$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>' );

$this->out( '?>', 0, 0 );
