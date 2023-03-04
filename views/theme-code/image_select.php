<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( '' );
	$this->out('// Get Image in group');
	$this->out( "\$image_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $image_ids as $image_id ) :' );
	$this->out( "\$image = RWMB_Image_Field::file_info( \$image_id, ['size' => 'thumbnail'] );" );
	$this->out( "echo '<img src=\"' . \$image['url'] . '\">';" );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $clone as $value ) : ?>', 1 );
			$this->out( '<li><?= $value ?></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 0 );
	return;
}

// Displaying selected value.
$this->out( '<?php' );
$this->out( '// Displaying selected value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', 0, 3 );

// Displaying the list of multiple choices:
$this->out( '<?php' );
$this->out( '// Displaying the list of multiple choices:' );
$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<ul>' );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
		$this->out( '<li><?= $value ?></li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 0 );
