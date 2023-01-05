<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( 'foreach ( $values as $value ) :' );
	echo $this->out( $this->indent() . 'if ( $value ) {' );
	echo $this->out( $this->indent( 2 ) . 'echo \'Checked\';' );
	echo $this->out( $this->indent( 3 ) . '} else {' );
	echo $this->out( $this->indent( 2 ) . 'echo \'Unchecked\';' );
	echo $this->out( $this->indent() . '}' );
	echo $this->out( 'endforeach' );
	echo $this->out( '?>', false, false );
	return;
}

// Conditional check:
echo $this->out( '<?php', false );
echo $this->out( '// Conditional check:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( 'if ( $value ) {' );
echo $this->out( $this->indent() . 'echo \'Checked\';' );
echo $this->out( '} else {' );
echo $this->out( $this->indent() . 'echo \'Unchecked\';' );
echo $this->out( '}' );
echo $this->out( '?>', false );
echo $this->break();

// Displaying "Yes/No":
echo $this->out( '<?php', false );
echo $this->out( '// Displaying "Yes/No":' );
echo $this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );

