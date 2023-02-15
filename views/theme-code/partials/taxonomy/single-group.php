<?php
$this->break();
$this->out( '// Get Taxonomy in group' );
$this->out( "\$terms = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
$this->out( 'foreach ( $terms as $term ) :' );
$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>' );
$this->out( 'endforeach;' );