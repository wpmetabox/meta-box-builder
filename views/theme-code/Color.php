<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
    $this->out( '<ul>', false );
    $this->out( '<?php foreach ( $values as $value ) : ?>', false );
    $this->out( '<li><?= $value ?></li>' );
    $this->out( '<?php endforeach ?>', false );
    $this->out( '</ul>', false );
    
	return;
}

// Getting the value:
$this->out( '<?php', false );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
$this->out( '?>', false );
$this->out( '<div style="background-color: <?= $value ?>">', false );
$this->out( '<h2>My section title</h2>' );
$this->out( '<p>My section content</p>' );
$this->out( '</div>', false );
echo $this->break();

// Displaying the selected color:
$this->out( '<?php // Displaying the selected color: ?>', false );
$this->out( "<p>This is the color: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>' );
