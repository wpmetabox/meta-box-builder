<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out('// Get file in group');
	$this->out( "\$file_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $file_ids as $file_id ) :' );
	$this->out( "\$file = RWMB_File_Field::file_info( \$file_id );" );
	$this->out( '<p><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a><p>' );
	$this->out( 'endforeach;' );

	return;
}

$file = empty( $field['clone'] ) ? 'multiple' : 'multiple-clone';
require __DIR__ . "/partials/file/$file.php";
