<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( "\$sidebar_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
	$this->out( 'foreach ( $sidebar_ids as $sidebar_id ) :' );
	$this->out( $this->indent() . 'if ( is_active_sidebar( $sidebar_id ) ) {' );
	$this->out( $this->indent( 2 ) . 'dynamic_sidebar( $sidebar_id );' );
	$this->out( $this->indent() . '}' );
	$this->out( 'endforeach;' );
	$this->out( '?>', false, false );

	return;
}

// Display widgets for the selected sidebar:
$this->out( '<?php // Display widgets for the selected sidebar: ?>', false );
$this->out( '<div class="sidebar">', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
$this->out( '</div>', false );
$this->break();

// Checking if the selected sidebar has widgets and displaying it:
$this->out( '<?php', false );
$this->out( '// Checking if the selected sidebar has widgets and displaying it:' );
$this->out( "\$sidebar_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
$this->out( 'if ( is_active_sidebar( $sidebar_id ) ) {' );
$this->out( $this->indent() . 'dynamic_sidebar( $sidebar_id );' );
$this->out( '}' );
$this->out( '?>', false, false );
