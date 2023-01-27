<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get Taxonomy in group' );
	$this->out( "\$terms = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $terms as $term ) :' );
	$this->out( $this->indent() . '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Project categories</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $terms as $term ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0, 0 );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected terms:
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Project categories</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $terms as $term ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0 );
	$this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', 0 );
	$this->out( '<h3>Project categories</h3>', 0 );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );

	return;
}

// Getting selected term object:
$this->out( '<?php', 0 );
$this->out( '// Getting selected term object:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<pre>', 0 );
$this->out( '<!-- Show all data from the selected term -->' );
$this->out( '<?php print_r( $term ); ?>' );
$this->out( '</pre>', 0 );
$this->break();

// Displaying selected term name:
$this->out( '<?php', 0 );
$this->out( '// Displaying selected term name:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p><?= $term->name; ?></p>', 0 );
$this->break();

// Displaying the selected term with link:
$this->out( '<?php', 0 );
$this->out( '// Displaying the selected term with link:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( "<p><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', 0, 0 );
