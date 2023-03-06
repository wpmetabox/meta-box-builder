<?php
if ( $in_group ) {
	// Displaying in group
	if ( isset( $field['clone'] ) ) {
		// Displaying cloneable values:
		$this->out( "\$values = \$group[ '" . $field['id'] . "' ] ?? '';" );
		$this->out( 'foreach ( $values as $value ) :' );
			$this->out( 'echo do_shortcode( wpautop( $value ) );', 1 );
		$this->out( 'endforeach;', 0, 0 );

		return;
	}

	$this->out( '' );
	$this->out( '// Get Wysiwyg in group' );
	$this->out( "\$value = \$group[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'echo do_shortcode( wpautop( $value ) );' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>' );
	$this->out( '<?php foreach ( $values as $value ) : ?>' );
		$this->out( '<?= do_shortcode( wpautop( $value ) ) ?>', 1 );
	$this->out( '<?php endforeach ?>', 0, 0 );

	return;
}

// Getting the value:
$this->out( '<?php' );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', 0, 3 );

// Displaying the value:
$this->out( '<?php // Displaying the value: ?>' );
$this->out( '<h2>Content</h2>' );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 3 );

// Parse shortcodes and add paragraphs:
$this->out( '<?php' );
$this->out( '// Parse shortcodes and add paragraphs:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo do_shortcode( wpautop( $value ) );' );
$this->out( '?>', 0, 0 );
