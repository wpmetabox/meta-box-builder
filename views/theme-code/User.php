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
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Speakers</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	$this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	$this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );

	return;
}

if ( isset( $field['multiple'] ) ) {
	// Displaying multiple selected users:
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
	$this->out( '<h3>Speakers</h3>', false );
	$this->out( '<ul>', false );
	$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>' );
	$this->out( $this->indent() . '$user = get_userdata( $user_id );' );
	$this->out( $this->indent() . '<li><?= $user->display_name ?></a></li>' );
	$this->out( '<?php endforeach ?>' );
	$this->out( '</ul>', false );
	$this->break();

	// or simpler:
	$this->out( '<?php // or simpler: ?>', false );
	$this->out( '<h3>Speakers</h3>', false );
	$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></h3>', false, false );

	return;
}


// Getting selected post ID:
$this->out( '<?php', false );
$this->out( '// Getting selected post ID:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>', false );
$this->out( '<p>Selected user ID: <?= $user_id ?></p>', false );
$this->break();

// Getting selected user object:
$this->out( '<?php', false );
$this->out( '// Getting selected user object:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>', false );
$this->out( '<pre>', false );
$this->out( '<!-- Show all data from the selected user -->' );
$this->out( $this->indent() . '<?php print_r( $user ); ?>' );
$this->out( '</pre>', false );
$this->break();

// Displaying selected user info:
$this->out( '<?php', false );
$this->out( '// Displaying selected user info:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>', false );
$this->out( '<p>Display name: <?= $user->display_name ?></p>', false );
$this->out( '<p>Email: <?= $user->user_email ?></p>', false );
$this->break();

// or simpler:
$this->out( '<?php // or simpler: ?>', false );
$this->out( "<p>Display name: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></p>', false );
$this->out( "<p>Email: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'display_field' => 'user_email',
	'link'          => false,
] ) . ' ); ?></p>', false );
$this->break();
