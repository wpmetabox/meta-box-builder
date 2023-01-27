<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out('// Get file in group');
	$this->out( "\$file_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $file_ids as $file_id ) :' );
	$this->out( $this->indent()."\$file = RWMB_File_Field::file_info( \$file_id );" );
	$this->out( $this->indent() . '<p><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a><p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '<?php foreach ( $files as $file ) : ?>', 0 );
	$this->out( '<p><a href="<?= $file >">Download file</a></p>' );
	$this->out( '<?php endforeach ?>', 0, 0 );
	return;
}

// Displaying file:
$this->out( '<?php // Displaying file: ?>', 0 );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '<p><a href="<?= $value >">Download file</a></p>', 0 );
$this->break();

// Displaying uploaded image:
$this->out( '<?php // Displaying file: ?>', 0 );
$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
$this->out( '<p><img src="<?= $value >"></p>', 0 );
