<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Wysiwyg in group' );	
	$this->out( "\$value = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'echo do_shortcode( wpautop( $value ) );' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 0 );
	$this->out( '<p><?= do_shortcode( wpautop( $value ) ); ?></p>' );
	$this->out( '<?php endforeach ?>', 0, 0 );

	return;
}

// Displaying the content:
$this->out( '<?php // Displaying the content: ?>', 0 );
$this->out( '<h2>Content</h2>', 0 );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );?>', 0 );
$this->break();

// CONTENT FORMATTING
$this->out( '<?php', 0 );
$this->out( '// CONTENT FORMATTING:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo do_shortcode( wpautop( $value ) );' );
$this->out( '?>', 0, 0 );
