<?php
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $group[ \'' . $field['id'] . '\' ] as $value ) : ?>', 1 );
		$this->out( '<li><a href="<?= $value ?>">Download file</a></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>' );
$this->out( '<?php' );
