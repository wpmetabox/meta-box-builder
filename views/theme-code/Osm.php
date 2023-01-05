<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable maps:
	$args = $this->format_args([
		'width'      => '640px',
		'height'     => '480px',
		'js_options' => [
			'mapTypeId'   => 'HYBRID',
			'zoomControl' => false,
		]
	]);	

	echo $this->out( '<?php', false );
	echo $this->out( '$args = ' . $args . ';' );
	echo $this->out( "\$group_values = rwmb_meta( '" . $this->get_encoded_value( $field['id'], '$args', true ) . ' );' );
	echo $this->break();
	echo $this->out( 'foreach ( $group_values as $group_value ) :' );
	echo $this->out( $this->indent() . 'echo RWMB_Map_Field::render_map( $group_value[\'map_id\'], $args );' );
	echo $this->out( 'endforeach;' );
	echo $this->out( '?>', false );

	return;
}

// Displaying maps
$args = $this->format_args([
	'width'        => '640px',
	'height'       => '480px',
	'zoom'         => 14,
	'marker'       => true,
	'marker_icon'  => 'https://url_to_icon.png',
	'marker_title' => 'Click me',
	'info_window'  => '<h3>Title</h3><p>Content</p>.',
	'js_options'   => [
		'mapTypeId'   => 'HYBRID',
		'zoomControl' => false,
	],
]);

echo $this->out( '<?php', false );
echo $this->out( '$args = ' . $args . ';' );
echo $this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'], '$args', true ) . ' ); ?>' );
echo $this->out( '?>', false );
