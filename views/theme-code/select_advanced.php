<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( '<?php endforeach ?>', false, false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying the list of multiple choices (values):
	$this->out( '<?php // Displaying the list of multiple choices (values): ?>', false );
	$this->out( "<?php \$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( '<?php endforeach ?>', false );
	$this->break();

	// Displaying the list of multiple choices (values and labels):
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
$this->out( '// Displaying the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', false );
$this->out( '?>', false );
$this->out( '<p>Selected: <?= $value ?></p>', false );
$this->break();

// Displaying the selected label:
$this->out( '<?php // Displaying the value: ?>', false );
$this->out( "<p>My choice: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></p>', false );
$this->break();

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
