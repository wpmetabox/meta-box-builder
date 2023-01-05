<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	$this->out( '<?php foreach ( $files as $file ) : ?>', false );
	$this->out( '<p><a href="<?= $file >">Download file</a></p>' );
	$this->out( '<?php endforeach ?>', false, false );
	return;
}

// Displaying file:
$this->out( '<?php // Displaying file: ?>', false );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '<p><a href="<?= $value >">Download file</a></p>', false );
echo $this->break();

// Displaying uploaded image:
$this->out( '<?php // Displaying file: ?>', false );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
$this->out( '<p><img src="<?= $value >"></p>', false );
