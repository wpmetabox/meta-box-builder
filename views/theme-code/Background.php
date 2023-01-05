<?php
if ( ! isset( $field['clone'] ) ) {
	// Getting the background properties:
	echo $this->out( '<?php', false );
	echo $this->out( '// Getting the background properties:' );
	echo $this->out( "\$background = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( "echo \$background['color'];" );
	echo $this->out( "echo \$background['image'];" );
	echo $this->out( '?>', false );
	echo $this->break();
    
	// GOutputting the CSS for the background:
	echo $this->out( '<?php // Outputting the CSS for the background: ?>', false );
	echo $this->out( "<div style=\"<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>">', false );
	echo $this->out( '<h2>My section title</h2>' );
	echo $this->out( '<p>My section content</p>' );
	echo $this->out( '</div>', false, false );

	return;
}
// Displaying cloneable values: