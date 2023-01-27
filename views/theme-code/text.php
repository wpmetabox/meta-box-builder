<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>', false );
	$this->out( '<?php foreach ( $values as $value ) : ?>', false );
	$this->out( '<p><?= $value ?></p>' );
	$this->out( '<?php endforeach ?>', false, false );

	return;
}

// Displaying the value:
$this->out( '<?php', false );
$this->out( '// Displaying the value:' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->break();

// Getting the value:
$this->out( '<?php', false );
$this->out( '// Getting the value:' );
$this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $value;' );
$this->out( '?>', false, false );