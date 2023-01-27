<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get User in group' );
	$this->out( "\$user_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $user_ids as $user_id ) :' );
	$this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	$this->out( $this->indent() . '<p><?= $user->display_name ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Speakers</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	$this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	$this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0 );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected users:
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', 0 );
	$this->out( '<h3>Speakers</h3>', 0 );
	$this->out( '<ul>', 0 );
	$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	$this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	$this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', 0 );
	$this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', 0 );
	$this->out( '<h3>Speakers</h3>', 0 );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></h3>', 0, 0 );

	return;
}


// Getting selected post ID:
$this->out( '<?php', 0 );
$this->out( '// Getting selected post ID:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', 0 );
$this->out( '<p>Selected user ID: <?= $user_id ?></p>', 0 );
$this->break();

// Getting selected user object:
$this->out( '<?php', 0 );
$this->out( '// Getting selected user object:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>', 0 );
$this->out( '<pre>', 0 );
$this->out( '<!-- Show all data from the selected user -->' );
$this->out( $this->indent() . '<?php print_r( $user ); ?>' );
$this->out( '</pre>', 0 );
$this->break();

// Displaying selected user info:
$this->out( '<?php', 0 );
$this->out( '// Displaying selected user info:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>', 0 );
$this->out( '<p>Display name: <?= $user->display_name ?></p>', 0 );
$this->out( '<p>Email: <?= $user->user_email ?></p>', 0 );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', 0 );
$this->out( "<p>Display name: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></p>', 0 );
$this->out( "<p>Email: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'display_field' => 'user_email',
	'link'          => false,
] ) . ' ); ?></p>', 0 );
$this->break();
