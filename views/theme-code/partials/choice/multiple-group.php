<?php
// Displaying selected values.
$this->out( '// Displaying selected values:' );
$this->out( '?>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $group_value[ \'' . $field['id'] . '\' ] as $value ) : ?>', 1 );
			$this->out( '<li><?= $value ?></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 1 );
$this->out( '<?php' );