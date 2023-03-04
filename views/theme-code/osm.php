<?php
if ( $is_group === true ) {
	// Displaying in group
	$args = $this->format_args([
		'width'      => '100%',
		'height'     => '480px',
		'js_options' => [
			'mapTypeId'   => 'HYBRID',
			'zoomControl' => false,
		],
	]);

	$this->out( '' );
	$this->out( '// Get Osm in group' );
	$this->out( "\$maps = \$group[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( '$args = ' . $args . ';' );
	$this->out( 'foreach ( $maps as $map ) :' );
	$this->out( 'echo RWMB_OSM_Field::render_map( $map, $args );' );
	$this->out( 'endforeach;' );

	return;
}

// Displaying maps
$args = $this->format_args([
	'width'        => '100%',
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

$this->out( '<?php' );
$this->out( '$args = ' . $args . ';' );
$this->out( "rwmb_the_value( '" . $this->get_encoded_value( $field['id'], '$args' ) . ' );' );
$this->out( '?>', 0, 3 );


$this->out( '<?php' );
$this->out( '// Getting the location details:' );
$this->out( "\$location = rwmb_get_value( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( 'echo $location[\'latitude\'];' );
$this->out( 'echo $location[\'longitude\'];' );
$this->out( 'echo $location[\'zoom\'];' );
$this->out( '?>', 0, 0 );
