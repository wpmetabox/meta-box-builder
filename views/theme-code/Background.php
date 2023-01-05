<?php
if ( ! isset( $field['clone'] ) ) {
	// Getting the background properties:
	$this->out( '<?php', false );
	$this->out( '// Getting the background properties:' );
	$this->out( "\$background = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( "echo \$background['color'];" );
	$this->out( "echo \$background['image'];" );
	$this->out( '?>', false );
	echo $this->break();
    
	// GOutputting the CSS for the background:
	$this->out( '<?php // Outputting the CSS for the background: ?>', false );
	$this->out( "<div style=\"<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>">', false );
	$this->out( '<h2>My section title</h2>' );
	$this->out( '<p>My section content</p>' );
	$this->out( '</div>', false, false );

	return;
}
// Displaying cloneable values: