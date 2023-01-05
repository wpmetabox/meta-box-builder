<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
	echo $this->out( '<p><?= do_shortcode( wpautop( $value ) ); ?></p>' );
	echo $this->out( '<?php endforeach ?>', false, false );

	return;
}

// Displaying the content:
echo $this->out( '<?php // Displaying the content: ?>', false );
echo $this->out( '<h2>Content</h2>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );?>', false );
echo $this->break();

// CONTENT FORMATTING
echo $this->out( '<?php', false );
echo $this->out( '// CONTENT FORMATTING:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( 'echo do_shortcode( wpautop( $value ) );' );
echo $this->out( '?>', false, false );
