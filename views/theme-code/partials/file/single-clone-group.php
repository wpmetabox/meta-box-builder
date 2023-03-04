<?php
// Displaying in group
$this->out( '' );
$this->out( '// Get file in group' );
$this->out( "\$clones = \$group[ '" . $field['id'] . "' ] ?? '';" );
$this->out( 'foreach ( $clones as $file_ids ) :' );
	$this->out( 'foreach ( $file_ids as $file_id ) :', 1 );
		$this->out( '$file = RWMB_File_Field::file_info( $file_id );', 2 );
		$this->out( '?>' );
			$this->out( '<p><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a><p>', 2 );
		$this->out( '<?php' );
	$this->out( 'endforeach;', 1 );
$this->out( 'endforeach;', 0, 2 );
