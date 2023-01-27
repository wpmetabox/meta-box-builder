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
	$this->out( '<h3>Uploaded files</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $files as $clone ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . '<ul>' );
	$this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $file ) : ?>' );
	$this->out( $this->indent( 4 ) . '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
	$this->out( $this->indent( 3 ) . '<?php endforeach ?>' );
	$this->out( $this->indent( 2 ) . '</ul>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0, 0 );
	return;
}

// Displaying uploaded files with links:
$this->out( '<?php', 0 );
$this->out( '// Displaying uploaded files with links:' );
$this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<h3>Uploaded files</h3>', 0 );
$this->out( '<ul>', 0 );
$this->out( '<?php foreach ( $files as $file ) : ?>' );
$this->out( '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( '<h3>Uploaded files</h3>', 0 );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
$this->break();

// Displaying only one file:
$this->out( '<?php', 0 );
$this->out( '// Displaying only one file:' );
$this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
$this->out( '$file = reset( $files );' );
$this->out( '?>', 0 );
$this->out( '<a class="button" href="<?= $file[\'url\'] ?>">Download file</a>', 0, 0 );
