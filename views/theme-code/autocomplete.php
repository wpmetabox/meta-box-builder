<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( ! isset( $field['clone'] ) ) {
	// Displaying selected values:
	$this->out( '<?php', 0 );
	$this->out( '// Displaying selected values:', 0 );
	$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '?>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 0 );
	$this->out( '<li><?= $value ?></li>' );
	$this->out( '<?php endforeach ?>', 0 );
	$this->out( '</ul>', 0 );
	$this->break();

	// Displaying selected labels:
	$this->out( '<?php // Displaying selected labels: ?>', 0 );
	$this->out( '<p>Choices:</p>', 0 );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', 0 );
	$this->break();

	// Displaying both values and labels:
	$this->out( '<?php', 0 );
	$this->out( '// Displaying both values and labels:', 0 );
	$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( "\$options = \$field['options'];", 0 );
	$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
	$this->out( '?>', false );

	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $values as $value ) : ?>', 1 );
	$this->out( '<li>', 2 );
	$this->out( 'Value: <?= $value ?><br>', 3 );
	$this->out( 'Label: <?= $options[ $value ] ?>', 3 );
	$this->out( '</li>', 2 );
	$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 0 );
	return;
}

// Displaying cloneable values:
$this->out( '<?php', 0 );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( "\$options = \$field['options'];", 0 );
$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );', 0 );
$this->out( '?>', 0 );

$this->out( '<ul>', 0 );
$this->out( '<?php foreach ( $values as $clone ) : ?>', 1 );
$this->out( '<li>', 2 );
$this->out( '<ul>', 3 );

$this->out( '<?php foreach ( $clone as $value ) : ?>', 4 );
$this->out( '<li>', 5 );
$this->out( 'Value: <?= $value ?><br>', 6 );
$this->out( 'Label: <?= $options[ $value ] ?>', 6 );
$this->out( '</li>', 5 );
$this->out( '<?php endforeach ?>', 4 );

$this->out( '</ul>', 3 );
$this->out( '</li>', 2 );
$this->out( '<?php endforeach ?>', 1 );
$this->out( '</ul>', 0, 0 );
