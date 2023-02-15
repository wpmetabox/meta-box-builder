<?php
// Displaying cloneable values:
$this->out( "\$terms = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
$this->out( '?>' );
$this->out( '<h3>Project categories</h3>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $terms as $term ) : ?>', 1 );
		$this->out( '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 2 );
$this->out( '<?php' );
