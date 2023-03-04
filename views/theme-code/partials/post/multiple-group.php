<?php
$this->out( "\$post_ids = \$group[ '" . $field['id'] . "' ] ?? [];" );
$this->out( '?>' );
$this->out( '<h3>Related posts</h3>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>', 1 );
		$this->out( '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>' );
$this->out( '<?php' );
