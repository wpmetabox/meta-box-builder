<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Related posts</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	echo $this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected posts:
	echo $this->out( "<?php \$post_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Related posts</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $post_ids as $post_id ) : ?>' );
	echo $this->out( $this->indent() . '<li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );
	echo $this->break();

	// or simpler:
	echo $this->out( '<?php // or simpler: ?>', false );
	echo $this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );
	return;
}

// Getting selected post ID:
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected post ID:' );
echo $this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p>Selected post ID: <?= $post_id ?></p>', false );
echo $this->break();

// Getting selected post object:
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected post object:' );
echo $this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '$post = get_post( $post_id );' );
echo $this->out( '?>', false );
echo $this->out( '<pre>', false );
echo $this->out( '<!-- Show all data from the selected post -->' );
echo $this->out( $this->indent() . '<?php print_r( $post ); ?>' );
echo $this->out( '</pre>', false );
echo $this->break();

// Displaying selected post title:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying selected post title:' );
echo $this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3><?= get_the_title( $post_id ); ?></h3>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false );
echo $this->break();

// Displaying the selected post with link:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the selected post with link:' );
echo $this->out( "\$post_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></h3>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );