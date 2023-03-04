<?php
// Displaying uploaded files with links:
$this->out( '?>' );
$this->out( '<h3>Uploaded files</h3>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $group[ \'' . $field['id'] . '\' ] as $file ) : ?>', 1 );
		$this->out( '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 1 );
$this->out( '<?php' );