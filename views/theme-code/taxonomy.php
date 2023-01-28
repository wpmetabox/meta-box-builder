<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Taxonomy in group' );
	$this->out( "\$terms = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $terms as $term ) :' );
	$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( ! empty( $field['multiple'] ) ) {
	// Displaying multiple selected terms:
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Project categories</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $terms as $term ) : ?>', 1 );
			$this->out( '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( '<h3>Project categories</h3>' );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0, 0 );
	return;
}

// Getting selected term object:
$this->out( '<?php' );
$this->out( '// Getting selected term object:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<pre>' );
	$this->out( '<!-- Show all data from the selected term -->', 1 );
	$this->out( '<?php print_r( $term ); ?>', 1 );
$this->out( '</pre>', 0, 3 );

// Displaying selected term name:
$this->out( '<?php' );
$this->out( '// Displaying selected term name:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<p><?= $term->name; ?></p>', 0, 3 );


// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( "<p><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></p>', 0, 3 );


// Displaying the selected term with link:
$this->out( '<?php' );
$this->out( '// Displaying the selected term with link:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>', 0, 3 );

// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( "<p><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', 0, 0 );
