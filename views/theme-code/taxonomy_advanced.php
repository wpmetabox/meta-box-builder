<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Taxonomy in group' );
	$this->out( "\$terms = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $terms as $term ) :' );
	$this->out( $this->indent() . '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}


if ( ! empty( $field['clone'] ) ) {
	if ( ! empty( $field['multiple'] ) ) {
		// Displaying cloneable values:
		$this->out( "<?php \$clones = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );

		$this->out( '<ul>' );
			$this->out( '<?php foreach ( $clones as $clone ) : ?>', 1 );
				$this->out( '<li>', 2 );
					$this->out( '<ul>', 3 );
						$this->out( '<?php foreach ( $clone as $term ) : ?>', 4 );
							$this->out( '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>', 5 );
						$this->out( '<?php endforeach ?>', 4 );
					$this->out( '</ul>', 3 );
				$this->out( '</li>', 2 );
			$this->out( '<?php endforeach ?>', 1 );
		$this->out( '</ul>', 0, 3 );

		// or simpler:
		$this->out( '<?php // or simpler: ?>' );
		$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 0 );
		return;
	}

	// Displaying cloneable values:
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Project categories</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $terms as $term ) : ?>', 1 );
			$this->out( '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( '<h3>Project categories</h3>' );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 0 );
	return;
}

require __DIR__ . '/taxonomy.php';
