<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out('// Get Image in group');
	$this->out( "\$image_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $image_ids as $image_id ) :' );
	$this->out( $this->indent()."\$image = RWMB_Image_Field::file_info( \$image_id, ['size' => 'thumbnail'] );" );
	$this->out( $this->indent()."echo '<img src=\"' . \$image['url'] . '\">';" );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
    $this->out( '<ul>', 0 );
    $this->out( '<?php foreach ( $values as $value ) : ?>' );
    $this->out( $this->indent() . '<li><?= $value ?></li>' );
    $this->out( '<?php endforeach ?>' );
    $this->out( '</ul>', 0, 0 );
	return;
}

// Displaying the selected value:
$this->out( '<?php', 0 );
$this->out( '// Displaying the selected value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p>Selected: <?= $value ?></p>', 0 );
$this->break();

// Displaying the list of multiple choices:
$this->out( '<?php', 0 );
$this->out( '// Displaying the list of multiple choices:' );
$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<ul>', 0 );
$this->out( '<?php foreach ( $values as $value ) : ?>' );
$this->out( $this->indent() . '<li><?= $value ?></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', 0, 0 );