<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	
	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( '<?php', false );
	$this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	$this->out( '?>', false );
	$this->out( '<h3>Uploaded videos</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $videos as $video ) : ?>' );
	$this->out( $this->indent() . '<li><video src="<?= $video[\'src\']; ?>"></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );

	return;
}

// Displaying videos with HTML5 player:
$this->out( '<?php', false );
$this->out( '// Displaying videos with HTML5 player:' );
$this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<h3>Uploaded videos</h3>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $videos as $video ) : ?>' );
$this->out( $this->indent() . '<li><video src="<?= $video[\'src\']; ?>"></li>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false );
$this->break();

// Displaying only one video:
$this->out( '<?php', false );
$this->out( '// Displaying only one video:' );
$this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
$this->out( '$video = reset( $videos ); ' );
$this->out( '?>', false );
$this->out( '<video src="<?= $video[\'src\'] ?>">', false );

// Displaying videos in a player with a playlist:
$this->out( '<?php // Displaying videos in a player with a playlist: ?>', false );
$this->out( '<h3>Videos</h3>', false );
$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' ); ?>', false );

// Displaying list of videos with video player for each video:
$video_args = $this->format_variable([
	'src'    => $video['src'],
	'width'  => $video['dimensions']['width'],
	'height' => $video['dimensions']['height'],
]);
$this->out( '<?php', false );
$this->out( '// Displaying list of videos with video player for each video:' );
$this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
$this->out( '?>', false );
$this->out( '<ul>', false );
$this->out( '<?php foreach ( $videos as $video ) : ?>' );
$this->out( $this->indent() . '<?php' );
$this->out( $this->indent( 2 ) . 'echo wp_video_shortcode( ' . $video_args . ' );' );
$this->out( $this->indent() . '?>' );
$this->out( '<?php endforeach ?>' );
$this->out( '</ul>', false, false );
