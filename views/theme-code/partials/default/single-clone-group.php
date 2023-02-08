<?php
$this->break();
$this->out('// Display value clone');
$this->out( 'foreach ( $group_value[ \'' . $field['id'] . '\' ] as $value ) :' );
$this->out('?>');
	$this->out( '<p><?= $value ?></p>', 1 );
$this->out('<?php');
$this->out( 'endforeach;', 0,1 );
$this->break();
