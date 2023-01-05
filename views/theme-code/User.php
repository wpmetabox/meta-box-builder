<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	echo $this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Speakers</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	echo $this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	echo $this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected users:
	echo $this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	echo $this->out( '<h3>Speakers</h3>', false );
	echo $this->out( '<ul>', false );
	echo $this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	echo $this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	echo $this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	echo $this->out( '<?php endforeach ?>' );
	echo $this->out( '</ul>', false );
	echo $this->break();

	// or simpler:
	echo $this->out( '<?php // or simpler: ?>', false );
	echo $this->out( '<h3>Speakers</h3>', false );
	echo $this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></h3>', false, false );

	return;
}


// Getting selected post ID:
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected post ID:' );
echo $this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p>Selected user ID: <?= $user_id ?></p>', false );
echo $this->break();

// Getting selected user object:
echo $this->out( '<?php', false );
echo $this->out( '// Getting selected user object:' );
echo $this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '$user = get_userdata( $user_id );' );
echo $this->out( '?>', false );
echo $this->out( '<pre>', false );
echo $this->out( '<!-- Show all data from the selected user -->' );
echo $this->out( $this->indent() . '<?php print_r( $user ); ?>' );
echo $this->out( '</pre>', false );
echo $this->break();

// Displaying selected user info:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying selected user info:' );
echo $this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '$user = get_userdata( $user_id );' );
echo $this->out( '?>', false );
echo $this->out( '<p>Display name: <?= $user->display_name ?></p>', false );
echo $this->out( '<p>Email: <?= $user->user_email ?></p>', false );
echo $this->break();

// or simpler:
echo $this->out( '<?php // or simpler: ?>', false );
echo $this->out( "<p>Display name: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></p>', false );
echo $this->out( "<p>Email: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'display_field' => 'user_email',
	'link'          => false,
] ) . ' ); ?></p>', false );
echo $this->break();
