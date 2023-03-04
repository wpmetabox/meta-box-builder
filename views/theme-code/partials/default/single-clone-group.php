<?php
$this->out( '' );
$this->out('// Display value clone');
$this->out( 'foreach ( $group[ \'' . $field['id'] . '\' ] as $value ) :' );
$this->out('?>');
	$this->out( '<p><?= $value ?></p>', 1 );
$this->out('<?php');
$this->out( 'endforeach;', 0,1 );
$this->out( '' );
