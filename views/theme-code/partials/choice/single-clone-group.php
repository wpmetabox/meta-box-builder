<?php
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( '?>' );

$this->out( '<ul>' );
	$this->out( '<?php foreach ( $group_value[ \'' . $field['id'] . '\' ] as $value ) : ?>', 1 );
		$this->out( '<li>', 2 );
			$this->out( 'Value: <?= $value ?><br>', 3 );
			$this->out( 'Label: <?= $options[ $value ] ?>', 3 );
		$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 1 );
$this->out( '<?php' );