<?php
$this->out( "\$clones = \$group[ '" . $field['id'] . "' ] ?? [];" );
$this->out( '?>' );

$this->out( '<ul>' );
	$this->out( '<?php foreach ( $clones as $clone ) : ?>', 1 );
		$this->out( '<li>', 2 );
			$this->out( '<ul>', 3 );
				$this->out( '<?php foreach ( $clone as $post_id ) : ?>', 4 );
					$this->out( '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>', 5 );
				$this->out( '<?php endforeach ?>', 4 );
			$this->out( '</ul>', 3 );
		$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>' );
$this->out( '<?php' );
