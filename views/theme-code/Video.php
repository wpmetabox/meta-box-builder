<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( '<?php', false );
	echo $this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
	echo $this->out( '?>', false );
	echo $this->out( '<h3>Uploaded videos</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $videos as $video ) : ?>' );
	echo $this->out( $this->indent() . '<li><video src="<?= $video[\'src\']; ?>"></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );

	return;
}

// Displaying videos with HTML5 player:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying videos with HTML5 player:' );
echo $this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<h3>Uploaded videos</h3>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $videos as $video ) : ?>' );
echo $this->out( $this->indent() . '<li><video src="<?= $video[\'src\']; ?>"></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false );
echo $this->break();

// Displaying only one video:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying only one video:' );
echo $this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
echo $this->out( '$video = reset( $videos ); ' );
echo $this->out( '?>', false );
echo $this->out( '<video src="<?= $video[\'src\'] ?>">', false );

// Displaying videos in a player with a playlist:
echo $this->out( '<?php // Displaying videos in a player with a playlist: ?>', false );
echo $this->out( '<h3>Videos</h3>', false );
echo $this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' ); ?>', false );

// Displaying list of videos with video player for each video:
$video_args = $this->format_variable([
	'src'    => $video['src'],
	'width'  => $video['dimensions']['width'],
	'height' => $video['dimensions']['height'],
]);
echo $this->out( '<?php', false );
echo $this->out( '// Displaying list of videos with video player for each video:' );
echo $this->out( "\$videos = rwmb_meta( '" . $this->get_encoded_value( $field['id'], [ 'limit' => 1 ] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $videos as $video ) : ?>' );
echo $this->out( $this->indent() . '<?php' );
echo $this->out( $this->indent( 2 ) . 'echo wp_video_shortcode( ' . $video_args . ' );' );
echo $this->out( $this->indent() . '?>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false, false );
