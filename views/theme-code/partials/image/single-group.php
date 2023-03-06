<?php
$this->out( "\$image_id = \$group[ '" . $field['id'] . "' ] ?? 0;" );
$this->out( '$image = RWMB_Image_Field::file_info( $image_id, [ \'size\' => \'thumbnail\' ] );' );
$this->out( '?>' );
$this->out( '<h3>Logo</h3>' );
$this->out( '<img src="<?= $image[\'url\']; ?>">' );
$this->out( '<?php' );
