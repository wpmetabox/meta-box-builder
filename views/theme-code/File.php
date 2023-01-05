<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	$this->out( '<h3>Uploaded files</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $files as $clone ) : ?>' );
	$this->out( $this->indent() . '<li>' );
	$this->out( $this->indent( 2 ) . '<ul>' );
	$this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $file ) : ?>' );
	$this->out( $this->indent( 4 ) . '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
	$this->out( $this->indent( 3 ) . '<?php endforeach ?>' );
	$this->out( $this->indent( 2 ) . '</ul>' );
	$this->out( $this->indent() . '</li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false, false );
	return;
}

// Displaying uploaded files with links:
$this->out( '<?php', false );
$this->out( '// Displaying uploaded files with links:' );
$this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3>Uploaded files</h3>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $files as $file ) : ?>' );
$this->out( '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false );
echo $this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( '<h3>Uploaded files</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
echo $this->break();

// Displaying only one file:
$this->out( '<?php', false );
$this->out( '// Displaying only one file:' );
$this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
$this->out( '$file = reset( $files );' );
$this->out( '?>', false );
$this->out( '<a class="button" href="<?= $file[\'url\'] ?>">Download file</a>', false, false );