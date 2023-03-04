<?php
// Displaying in group
$this->out( '' );
$this->out( '// Get file in group' );
$this->out( "\$file_ids = \$group[ '" . $field['id'] . "' ] ?? '';" );
$this->out( 'foreach ( $file_ids as $file_id ) :' );
$this->out( '$file = RWMB_File_Field::file_info( $file_id );' );
$this->out( '?>' );
$this->out( '<p><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a><p>' );
$this->out( '<?php' );
$this->out( 'endforeach;' );
