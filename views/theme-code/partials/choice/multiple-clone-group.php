<?php
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( '?>' );

$this->out( '<ul>' );
	$this->out( '<?php foreach ( $group_value[ \'' . $field['id'] . '\' ] as $clone ) : ?>', 1 );
		$this->out( '<li>', 2 );

			$this->out( '<ul>', 3 );
				$this->out( '<?php foreach ( $clone as $value ) : ?>', 4 );
					$this->out( '<li>', 5 );
						$this->out( 'Value: <?= $value ?><br>', 6 );
						$this->out( 'Label: <?= $options[ $value ] ?>', 6 );
					$this->out( '</li>', 5 );
				$this->out( '<?php endforeach ?>', 4 );
			$this->out( '</ul>', 3 );

		$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 1, 1 );
$this->out( '<?php', 0, 1 );
