<?php
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $group[ \'' . $field['id'] . '\' ] as $value ) : ?>', 1 );
		$this->out( '<li><?= $value ?></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 1 );
$this->out( '<?php' );
