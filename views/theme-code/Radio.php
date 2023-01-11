<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
    
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( '<?php', false );
    $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
    $this->out( "\$options = \$field['options'];" );
    $this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
    $this->out( '?>', false );

    $this->out( '<ul>', false );
    $this->out( '<?php foreach ( $values as $value ) : ?>' );
    $this->out( $this->indent() . '<li>' );
    $this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
    $this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
    $this->out( $this->indent() . '</li>' );
    $this->out( '<?php endforeach ?>' );
    $this->out( '</ul>', false );

    $this->out( '?>', false, false );
	return;
}

// Displaying the selected value:
$this->out( '<?php', false );
$this->out( '// Displaying the selected value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p>Selected: <?= $value ?></p>', false );
$this->break();

// Displaying the selected label:
$this->out( '<?php // Displaying the selected label: ?>', false );
$this->out( "<p>My choice: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false );

// Displaying both value and label:
$this->out( '<?php', false );
$this->out( '// Displaying both values and labels:' );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( "\$value  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->break();
$this->out( 'Value: <?= $value ?><br>', false );
$this->out( 'Label: <?= $options[ $value ] ?>', false, false );
