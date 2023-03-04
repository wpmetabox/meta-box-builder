<?php
$this->out( '// Displaying the clone value:' );
$this->out( 'foreach ( $group[ \'' . $field['id'] . '\' ] as $value ) {' );
	$this->out( 'echo $value;', 1 );
$this->out( '}', 0, 1 );
