<?php
if ( $in_group ) {
	if ( ! empty( $field['clone'] ) ) {
		$this->out( "\$values = \$group[ '" . $field['id'] . "' ] ?? [];" );
		$this->out( '?>' );
		$this->out( '<ul>' );
			$this->out( '<?php foreach ( $values as $url ) : ?>', 1 );
				$this->out( '<li><?= RWMB_OEmbed_Field::get_embed( $url ); ?></li>', 2 );
			$this->out( '<?php endforeach; ?>', 1 );
		$this->out( '</ul>' );
		$this->out( '<?php' );

		return;
	}

	$this->out( "\$url = \$group[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( '?>' );
	$this->out( '<h3>Youtube video</h3>' );
	$this->out( '<?= RWMB_OEmbed_Field::get_embed( $url ); ?>' );
	$this->out( '<?php' );

	return;
}

if ( ! empty( $field['clone'] ) ) {
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
