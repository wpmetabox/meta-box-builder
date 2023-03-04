<?php
// Displaying cloneable values:
$this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '<?php foreach ( $files as $file ) : ?>' );
    $this->out( '<p><a href="<?= $file ?>">Download file</a></p>', 1 );
$this->out( '<?php endforeach ?>', 0, 0 );