<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( "\$sidebar_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	echo $this->out( 'foreach ( $sidebar_ids as $sidebar_id ) :' );
	echo $this->out( $this->indent() . 'if ( is_active_sidebar( $sidebar_id ) ) {' );
	echo $this->out( $this->indent( 2 ) . 'dynamic_sidebar( $sidebar_id );' );
	echo $this->out( $this->indent() . '}' );
	echo $this->out( 'endforeach;' );
	echo $this->out( '?>', false, false );

	return;
}

// Display widgets for the selected sidebar:
echo $this->out( '<?php // Display widgets for the selected sidebar: ?>', false );
echo $this->out( '<div class="sidebar">', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
echo $this->out( '</div>', false );
echo $this->break();

// Checking if the selected sidebar has widgets and displaying it:
echo $this->out( '<?php', false );
echo $this->out( '// Checking if the selected sidebar has widgets and displaying it:' );
echo $this->out( "\$sidebar_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
echo $this->out( 'if ( is_active_sidebar( $sidebar_id ) ) {' );
echo $this->out( $this->indent() . 'dynamic_sidebar( $sidebar_id );' );
echo $this->out( '}' );
echo $this->out( '?>', false, false );
