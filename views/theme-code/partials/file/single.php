<?php
// Displaying file:
$this->out( '<?php // Displaying file: ?>' );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '<p><a href="<?= $value ?>">Download file</a></p>', 0, 3 );

// Displaying uploaded image:
$this->out( '<?php // Displaying uploaded image: ?>' );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '<p><img src="<?= $value ?>"></p>', 0, 0 );
