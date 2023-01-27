<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
    
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    $this->out( '<?php', 0 );
    $this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
    $this->out( "\$options = \$field['options'];" );
    $this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
    $this->out( '?>', 0 );

    $this->out( '<ul>', 0 );
    $this->out( $this->indent() . '<?php foreach ( $values as $clone ) : ?>', 0 );
    $this->out( $this->indent() . '<li>' );
    $this->out( $this->indent( 2 ) . '<ul>' );

    $this->out( $this->indent( 3 ) . '<?php foreach ( $clone as $value ) : ?>' );
    $this->out( $this->indent( 4 ) . '<li>' );
    $this->out( $this->indent( 5 ) . 'Value: <?= $value ?><br>' );
    $this->out( $this->indent( 5 ) . 'Label: <?= $options[ $value ] ?>' );
    $this->out( $this->indent( 4 ) . '</li>' );
    $this->out( $this->indent( 3 ) . '<?php endforeach ?>' );

    $this->out( $this->indent( 2 ) . '</ul>' );
    $this->out( $this->indent() . '</li>' );
    $this->out( $this->indent() . '<?php endforeach ?>', 0 );
    $this->out( '</ul>', 0, 0 );

	return;
}

// Displaying selected values.
$this->out( '<?php', 0 );
$this->out( '// Displaying selected values:' );
$this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
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
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
$this->break();

// Displaying both values and labels.
$this->out( '<?php', 0 );
$this->out( '// Displaying both values and labels:' );
$this->out( "\$field   = rwmb_get_field_settings( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( "\$options = \$field['options'];" );
$this->out( "\$values  = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );

$this->out( '<ul>', 0 );
$this->out( '<?php foreach ( $values as $value ) : ?>' );
$this->out( $this->indent() . '<li>' );
$this->out( $this->indent( 2 ) . 'Value: <?= $value ?><br>' );
$this->out( $this->indent( 2 ) . 'Label: <?= $options[ $value ] ?>' );
$this->out( $this->indent() . '</li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', 0 );

$this->out( '?>', 0, 0 );