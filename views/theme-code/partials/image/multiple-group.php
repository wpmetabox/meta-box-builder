<?php
// Displaying uploaded images:
$this->out( '// Displaying uploaded images:' );
$this->out( "\$images = \$group[ '" . $field['id'] . "' ] ?? '';" );
$this->out( '?>' );
$this->out( '<h3>Uploaded images</h3>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $images as $image ) : ?>', 1 );
		$this->out( '<li><img src="<?= $image[\'url\']; ?>"></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 2 );
$this->out( '<?php' );
