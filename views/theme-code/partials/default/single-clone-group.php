<?php
$this->out( "\$values = \$group[ '" . $field['id'] . "' ] ?? [];" );
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
		$this->out( '<li><?= $value; ?></li>', 2 );
$this->out( '<?php endforeach; ?>', 1 );
$this->out( '</ul>' );
