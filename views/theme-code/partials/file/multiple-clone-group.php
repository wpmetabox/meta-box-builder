<?php
$this->out( '?>' );
	$this->out( '<h3>Uploaded files</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $group_value[ \'' . $field['id'] . '\' ] as $clone ) : ?>', 1 );
			$this->out( '<li>', 2 );
				$this->out( '<ul>', 3 );
					$this->out( '<?php foreach ( $clone as $file ) : ?>', 4 );
						$this->out( '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>', 5 );
					$this->out( '<?php endforeach ?>', 4 );
				$this->out( '</ul>', 3 );
			$this->out( '</li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 1 );
$this->out( '<?php' );