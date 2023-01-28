<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out('// Get Image in group');
	$this->out( "\$image_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $image_ids as $image_id ) :' );
	$this->out( "\$image = RWMB_Image_Field::file_info( \$image_id, ['size' => 'thumbnail'] );" );
	$this->out( "echo '<img src=\"' . \$image['url'] . '\">';" );
	$this->out( 'endforeach;' );

	return;
}

$file = empty( $field['clone'] ) ? 'multiple' : 'multiple-clone';
require __DIR__ . "/partials/image/$file.php";
