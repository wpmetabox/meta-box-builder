<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Related posts</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected posts:
	$this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Related posts</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );
	echo $this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', false );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );
	return;
}

// Getting selected post ID:
$this->out( '<?php', false );
$this->out( '// Getting selected post ID:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p>Selected post ID: <?= $post_id ?></p>', false );
echo $this->break();

// Getting selected post object:
$this->out( '<?php', false );
$this->out( '// Getting selected post object:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$post = get_post( $post_id );' );
$this->out( '?>', false );
$this->out( '<pre>', false );
$this->out( '<!-- Show all data from the selected post -->' );
$this->out( $this->indent() . '<?php print_r( $post ); ?>' );
$this->out( '</pre>', false );
echo $this->break();

// Displaying selected post title:
$this->out( '<?php', false );
$this->out( '// Displaying selected post title:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3><?= get_the_title( $post_id ); ?></h3>', false );
echo $this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false );
echo $this->break();

// Displaying the selected post with link:
$this->out( '<?php', false );
$this->out( '// Displaying the selected post with link:' );
$this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></h3>', false );
echo $this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );