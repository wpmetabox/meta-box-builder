<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	echo $this->out( '<h3>Uploaded files</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $files as $clone ) : ?>' );
	echo $this->out( $this->indent() . '<li>' );
	echo $this->out( $this->indent( 2 ) . '<ul>' );
	echo $this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $file ) : ?>' );
	echo $this->out( $this->indent( 4 ) . '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
	echo $this->out( $this->indent( 3 ) . '<?php endforeach ?>' );
	echo $this->out( $this->indent( 2 ) . '</ul>' );
	echo $this->out( $this->indent() . '</li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false, false );
	return;
}

// Displaying uploaded files with links:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying uploaded files with links:' );
echo $this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3>Uploaded files</h3>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $files as $file ) : ?>' );
echo $this->out( '<li><a href="<?= $file[\'url\']; ?>"><?= $file[\'name\']; ?></a></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( '<h3>Uploaded files</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
echo $this->break();

// Displaying only one file:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying only one file:' );
echo $this->out( "\$files = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
echo $this->out( '$file = reset( $files );' );
echo $this->out( '?>', false );
echo $this->out( '<a class="button" href="<?= $file[\'url\'] ?>">Download file</a>', false, false );
