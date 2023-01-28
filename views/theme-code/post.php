<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Post in group' );
	$this->out( "\$post_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $post_ids as $post_id ) :' );
	$this->out( '<p><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></p>' );
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
						$this->out( '<?php foreach ( $clone as $post_id ) : ?>', 4 );
							$this->out( '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>', 5 );
						$this->out( '<?php endforeach ?>', 4 );
					$this->out( '</ul>', 3 );
				$this->out( '</li>', 2 );
			$this->out( '<?php endforeach ?>', 1 );
		$this->out( '</ul>', 0, 3 );

		// or simpler:
		$this->out( '<?php // or simpler: ?>' );
		$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
		return;
	}

	// Displaying cloneable values:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Related posts</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>', 1 );
			$this->out( '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
	return;
}

if ( ! empty( $field['multiple'] ) ) {
	// Displaying multiple selected posts:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Related posts</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>', 1 );
			$this->out( '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
	return;
}

// Getting selected post ID:
$this->out( '<?php' );
$this->out( '// Getting selected post ID:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<p>Selected post ID: <?= $post_id ?></p>', 0, 3 );

// Getting selected post object:
$this->out( '<?php' );
$this->out( '// Getting selected post object:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$post     = get_post( $post_id );' );
$this->out( '?>' );
$this->out( '<!-- Show all data from the selected post -->' );
$this->out( '<pre>' );
	$this->out( '<?php print_r( $post ); ?>', 1 );
$this->out( '</pre>', 0, 3 );

// Displaying selected post title:
$this->out( '<?php' );
$this->out( '// Displaying selected post title:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<h3><?= get_the_title( $post_id ); ?></h3>', 0, 3 );

// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 3 );

// Displaying the selected post with link:
$this->out( '<?php' );
$this->out( '// Displaying the selected post with link:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<h3><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></h3>', 0, 3 );

// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
