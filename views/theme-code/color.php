<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
    
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
    $this->out( '<ul>', 0 );
    $this->out( '<?php foreach ( $values as $value ) : ?>', 0 );
    $this->out( '<li><?= $value ?></li>' );
    $this->out( '<?php endforeach ?>', 0 );
    $this->out( '</ul>', 0 );
    
	return;
}

// Getting the value:
$this->out( '<?php', 0 );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '?>', 0 );
$this->out( '<div style="background-color: <?= $value ?>">', 0 );
$this->out( '<h2>My section title</h2>' );
$this->out( '<p>My section content</p>' );
$this->out( '</div>', 0 );
$this->break();

// Displaying the selected color:
$this->out( '<?php // Displaying the selected color: ?>', 0 );
$this->out( "<p>This is the color: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>' );
