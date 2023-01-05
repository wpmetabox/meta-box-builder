<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    echo $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
    echo $this->out( '<ul>', false );
    echo $this->out( '<?php foreach ( $values as $value ) : ?>', false );
    echo $this->out( '<li><?= $value ?></li>' );
    echo $this->out( '<?php endforeach ?>', false );
    echo $this->out( '</ul>', false );
    
	return;
}

// Getting the value:
echo $this->out( '<?php', false );
echo $this->out( '// Getting the value:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
echo $this->out( '?>', false );
echo $this->out( '<div style="background-color: <?= $value ?>">', false );
echo $this->out( '<h2>My section title</h2>' );
echo $this->out( '<p>My section content</p>' );
echo $this->out( '</div>', false );
echo $this->break();

// Displaying the selected color:
echo $this->out( '<?php // Displaying the selected color: ?>', false );
echo $this->out( "<p>This is the color: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>' );
