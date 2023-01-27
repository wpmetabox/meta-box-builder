<?php
if ( $is_group === true ) {
	// Displaying in group
	$args = $this->format_args([
		'width'      => '640px',
		'height'     => '480px',
		'js_options' => [
			'mapTypeId'   => 'HYBRID',
			'zoomControl' => false,
		]
	]);	

	$this->break();
	$this->out( '// Get Osm in group' );
	$this->out( "\$maps = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( '$args = ' . $args . ';' );
	$this->out( 'foreach ( $maps as $map ) :' );
	$this->out( $this->indent() . 'echo RWMB_OSM_Field::render_map( $map, $args );' );
	$this->out( 'endforeach;' );
	
	return;
}

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

	$this->out( '<?php', 0 );
	$this->out( '$args = ' . $args . ';' );
	$this->out( "\$group_values = rwmb_meta( '" . $this->get_encoded_value( $field['id'], '$args', true ) . ' );' );
	$this->break();
	$this->out( 'foreach ( $group_values as $group_value ) :' );
	$this->out( $this->indent() . 'echo RWMB_OSM_Field::render_map( $group_value[\'map_id\'], $args );' );
	$this->out( 'endforeach;' );
	$this->out( '?>', 0 );

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

$this->out( '<?php', 0 );
$this->out( '$args = ' . $args . ';' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'], '$args', true ) . ' ); ?>' );
$this->out( '?>', 0 );
