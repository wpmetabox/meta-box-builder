<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out('// Get Image in group');
	$this->out( "\$image_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $image_ids as $image_id ) :' );
	$this->out( $this->indent()."\$image = RWMB_Image_Field::file_info( \$image_id, ['size' => 'thumbnail'] );" );
	$this->out( $this->indent()."echo '<img src=\"' . \$image['url'] . '\">';" );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	$this->out( '<h3>Uploaded images</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $images as $clone ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . '<ul>' );
	$this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $image ) : ?>' );
	$this->out( $this->indent( 4 ) . '<li><img src="<?= $image[\'url\']; ?>"></li>' );
	$this->out( $this->indent( 3 ) . '<?php endforeach ?>' );
	$this->out( $this->indent( 2 ) . '</ul>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false, false );
	return;
}

// Displaying uploaded images:
$this->out( '<?php', false );
$this->out( '// Displaying uploaded images:' );
$this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3>Uploaded images</h3>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $images as $image ) : ?>' );
$this->out( $this->indent() . '<li><img src="<?= $image[\'url\']; ?>"></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( '<h3>Uploaded files</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' ) ?>', false );
$this->break();

// Display images with links to the full-size versions (for lightbox effects):
$this->out( '<?php', false );
$this->out( '// Display images with links to the full-size versions (for lightbox effects):' );
$this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3>Uploaded images</h3>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $images as $image ) : ?>' );
$this->out( $this->indent() . '<li><a href="<?= $image[\'full_url\'] ?>"><img src="<?= $image[\'url\']; ?>"></a></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( '<h3>Uploaded files</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'size' => 'thumbnail',
	'link' => true,
] ) . ' ) ?>', false );
$this->break();

// Displaying only one image:
$this->out( '<?php', false );
$this->out( '// Displaying only one image:' );
$this->out( "\$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
$this->out( '$image = reset( $images );' );
$this->out( '?>', false );
$this->out( '<img src="<?= $image[\'url\']; ?>">', false, false );
