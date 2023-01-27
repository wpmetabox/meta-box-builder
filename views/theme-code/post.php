<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Post in group' );
	$this->out( "\$post_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $post_ids as $post_id ) :' );
	$this->out( $this->indent() . '<p><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Related posts</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0 );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected posts:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Related posts</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0 );
	$this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', 0 );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
	return;
}

// Getting selected post ID:
$this->out( '<?php', 0 );
$this->out( '// Getting selected post ID:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p>Selected post ID: <?= $post_id ?></p>', 0 );
$this->break();

// Getting selected post object:
$this->out( '<?php', 0 );
$this->out( '// Getting selected post object:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$post = get_post( $post_id );' );
$this->out( '?>', 0 );
$this->out( '<pre>', 0 );
$this->out( '<!-- Show all data from the selected post -->' );
$this->out( $this->indent() . '<?php print_r( $post ); ?>' );
$this->out( '</pre>', 0 );
$this->break();

// Displaying selected post title:
$this->out( '<?php', 0 );
$this->out( '// Displaying selected post title:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<h3><?= get_the_title( $post_id ); ?></h3>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0 );
$this->break();

// Displaying the selected post with link:
$this->out( '<?php', 0 );
$this->out( '// Displaying the selected post with link:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<h3><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></h3>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
