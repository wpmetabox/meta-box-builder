<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<p><?= do_shortcode( wpautop( $value ) ); ?></p>' );
	$this->out( '<?php endforeach ?>', false, false );

	return;
}

// Displaying the content:
$this->out( '<?php // Displaying the content: ?>', false );
$this->out( '<h2>Content</h2>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );?>', false );
echo $this->break();

// CONTENT FORMATTING
$this->out( '<?php', false );
$this->out( '// CONTENT FORMATTING:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo do_shortcode( wpautop( $value ) );' );
$this->out( '?>', false, false );
