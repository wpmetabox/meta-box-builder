<?php
$this->out( "\$clones = \$group[ '" . $field['id'] . "' ] ?? [];" );
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $clones as $clone ) : ?>', 1 );
		$this->out( '<li>', 2 );
			$this->out( '<ul>', 3 );
				$this->out( '<?php foreach ( $clone as $term_id ) : ?>', 4 );
					$this->out( '<?php $term = get_term( $term_id ); ?>', 5 );
					$this->out( '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>', 5 );
				$this->out( '<?php endforeach ?>', 4 );
			$this->out( '</ul>', 3 );
		$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>' );
$this->out( '<?php' );
