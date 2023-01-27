<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( empty( $field['clone'] ) ) {
	// Getting the background properties:
	$this->out( '<?php', 0 );
	$this->out( '// Getting the background properties:', 0 );
	$this->out( "\$background = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( "echo \$background['color'];", 0 );
	$this->out( "echo \$background['image'];", 0 );
	$this->out( '?>', 0 );
	$this->break();

	// Outputting the CSS for the background:
	$this->out( '<?php // Outputting the CSS for the background: ?>', 0 );
	$this->out( "<div style=\"<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>">', 0 );
	$this->out( '<h2>My section title</h2>', 1 );
	$this->out( '<p>My section content</p>', 1 );
	$this->out( '</div>', 0, 0 );

	return;
}
// Displaying cloneable values:
