<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	echo $this->out( '<h3>Uploaded images</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $images as $clone ) : ?>' );
	echo $this->out( $this->indent() . '<li>' );
	echo $this->out( $this->indent( 2 ) . '<ul>' );
	echo $this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $image ) : ?>' );
	echo $this->out( $this->indent( 4 ) . '<li><img src="<?= $image[\'url\']; ?>"></li>' );
	echo $this->out( $this->indent( 3 ) . '<?php endforeach ?>' );
	echo $this->out( $this->indent( 2 ) . '</ul>' );
	echo $this->out( $this->indent() . '</li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false, false );
	return;
}

// Displaying uploaded images:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying uploaded images:' );
echo $this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3>Uploaded images</h3>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $images as $image ) : ?>' );
echo $this->out( $this->indent() . '<li><img src="<?= $image[\'url\']; ?>"></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( '<h3>Uploaded files</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' ) ?>', false );
echo $this->break();

// Display images with links to the full-size versions (for lightbox effects):
echo $this->out( '<?php', false );
echo $this->out( '// Display images with links to the full-size versions (for lightbox effects):' );
echo $this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3>Uploaded images</h3>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $images as $image ) : ?>' );
echo $this->out( $this->indent() . '<li><a href="<?= $image[\'full_url\'] ?>"><img src="<?= $image[\'url\']; ?>"></a></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( '<h3>Uploaded files</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'size' => 'thumbnail',
	'link' => true,
] ) . ' ) ?>', false );
echo $this->break();

// Displaying only one image:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying only one image:' );
echo $this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
echo $this->out( '$image = reset( $images );' );
echo $this->out( '?>', false );
echo $this->out( '<img src="<?= $image[\'url\']; ?>">', false, false );
