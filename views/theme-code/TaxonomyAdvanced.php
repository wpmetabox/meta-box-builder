<?php
// Getting selected term.
$term = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
?>
<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>


<?php
// Displaying multiple selected terms.
$terms = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<h3>Project categories</h3>
<ul>
	<?php foreach ( $terms as $term ) : ?>
		<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>
	<?php endforeach ?>
</ul>

<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Project categories</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $terms as $term ) : ?>' );
	echo $this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false, false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected terms:
	echo $this->out( "<?php \$terms = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Project categories</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $terms as $term ) : ?>' );
	echo $this->out( $this->indent() . '<li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );
	echo $this->break();

	// or simpler:
	echo $this->out( '<?php // or simpler: ?>', false );
	echo $this->out( '<h3>Project categories</h3>', false );
	echo $this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', false, false );
    
	return;
}

// Getting selected term object:
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected term object:' );
echo $this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<pre>', false );
echo $this->out( '<!-- Show all data from the selected term -->' );
echo $this->out( '<?php print_r( $term ); ?>' );
echo $this->out( '</pre>', false );
echo $this->break();

// Displaying selected term name:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying selected term name:' );
echo $this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p><?= $term->name; ?></p>', false );
echo $this->break();

// Displaying the selected term with link:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the selected term with link:' );
echo $this->out( "\$term = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( "<p><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false, false );
