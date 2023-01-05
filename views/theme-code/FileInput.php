<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	echo $this->out( '<?php foreach ( $files as $file ) : ?>', false );
	echo $this->out( '<p><a href="<?= $file >">Download file</a></p>' );
	echo $this->out( '<?php endforeach ?>', false, false );
	return;
}

// Displaying file:
echo $this->out( '<?php // Displaying file: ?>', false );
echo $this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
echo $this->out( '<p><a href="<?= $value >">Download file</a></p>', false );
echo $this->break();

// Displaying uploaded image:
echo $this->out( '<?php // Displaying file: ?>', false );
echo $this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
echo $this->out( '<p><img src="<?= $value >"></p>', false );
