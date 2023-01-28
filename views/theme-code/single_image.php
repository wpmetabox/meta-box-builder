<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Image in group' );
	$this->out( "\$image_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $image_ids as $image_id ) :' );
	$this->out( $this->indent() . "\$image = RWMB_Image_Field::file_info( \$image_id, ['size' => 'thumbnail'] );" );
	$this->out( $this->indent() . "echo '<img src=\"' . \$image['url'] . '\">';" );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$images = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' ); ?>' );
	$this->out( '<h3>Uploaded images</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $images as $image ) : ?>', 1 );
			$this->out( '<li><img src="<?= $image[\'url\']; ?>"></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 0 );
	return;
}

// Displaying uploaded image:
$this->out( "<?php \$image = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' ); ?>' );
$this->out( '<h3>Logo</h3>' );
$this->out( '<img src="<?= $image[\'url\']; ?>">', 0, 3 );

// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( '<h3>Logo</h3>' );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'size' => 'thumbnail' ] ) . ' ) ?>', 0, 0 );
