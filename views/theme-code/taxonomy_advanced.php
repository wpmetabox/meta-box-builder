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
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Project categories</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $terms as $term ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false, false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected terms:
	$this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Project categories</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $terms as $term ) : ?>' );
	$this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );
	$this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', false );
	$this->out( '<h3>Project categories</h3>', false );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );

	return;
}

// Getting selected term object:
$this->out( '<?php', false );
$this->out( '// Getting selected term object:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<pre>', false );
$this->out( '<!-- Show all data from the selected term -->' );
$this->out( '<?php print_r( $term ); ?>' );
$this->out( '</pre>', false );
$this->break();

// Displaying selected term name:
$this->out( '<?php', false );
$this->out( '// Displaying selected term name:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p><?= $term->name; ?></p>', false );
$this->break();

// Displaying the selected term with link:
$this->out( '<?php', false );
$this->out( '// Displaying the selected term with link:' );
$this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>', false );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( "<p><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false, false );
