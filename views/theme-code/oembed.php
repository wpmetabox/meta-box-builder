<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Oembed in group' );
	$this->out( "\$values = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $values as $value ) :' );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	require __DIR__ . '/partials/default/single-clone.php';
	return;
}

// Displaying the value:
$this->out( '<?php' );
$this->out( '// Displaying the embedded media:' );
$this->out( '<h3>Youtube video</h3>' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0, 3 );

// Getting the value:
$this->out( '<?php' );
$this->out( '// Getting the URL:' );
$this->out( "\$url = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $url;' );
$this->out( '?>', 0, 0 );
