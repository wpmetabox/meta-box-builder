<?php
if ( $is_group === true ) {
	// Displaying in group
	$this->break();
	$this->out( '// Get User in group' );
	$this->out( "\$user_ids = \$group_value[ '" . $field['id'] . "' ] ?? '';" );
	$this->out( 'foreach ( $user_ids as $user_id ) :' );
	$this->out( '$user = get_userdata( $user_id );' );
	$this->out( '<p><?= $user->display_name ?></a></p>' );
	$this->out( 'endforeach;' );

	return;
}

if ( ! empty( $field['clone'] ) ) {
	if ( ! empty( $field['multiple'] ) ) {
		// Displaying cloneable values:
		$this->out( "<?php \$clones = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );

		$this->out( '<ul>' );
			$this->out( '<?php foreach ( $clones as $clone ) : ?>', 1 );
				$this->out( '<li>', 2 );
					$this->out( '<ul>', 3 );
						$this->out( '<?php foreach ( $clone as $user_id ) : ?>', 4 );
							$this->out( '<?php $user = get_userdata( $user_id ); ?>', 5 );
							$this->out( '<li><?= $user->display_name ?></li>', 5 );
						$this->out( '<?php endforeach ?>', 4 );
					$this->out( '</ul>', 3 );
				$this->out( '</li>', 2 );
			$this->out( '<?php endforeach ?>', 1 );
		$this->out( '</ul>', 0, 3 );

		// or simpler:
		$this->out( '<?php // or simpler: ?>' );
		$this->out( "<h3><?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?></h3>', 0, 0 );
		return;
	}

	// Displaying cloneable values:
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Speakers</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>', 1 );
			$this->out( '<?php $user = get_userdata( $user_id ); ?>', 2 );
			$this->out( '<li><?= $user->display_name ?></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( '<h3>Speakers</h3>' );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?>', 0, 0 );

	return;
}

if ( ! empty( $field['multiple'] ) ) {
	// Displaying multiple selected users:
	$this->out( "<?php \$user_ids = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>' );
	$this->out( '<h3>Speakers</h3>' );
	$this->out( '<ul>' );
		$this->out( '<?php foreach ( $user_ids as $user_id ) : ?>', 1 );
			$this->out( '<?php $user = get_userdata( $user_id ); ?>', 2 );
			$this->out( '<li><?= $user->display_name ?></li>', 2 );
		$this->out( '<?php endforeach ?>', 1 );
	$this->out( '</ul>', 0, 3 );

	// or simpler:
	$this->out( '<?php // or simpler: ?>' );
	$this->out( '<h3>Speakers</h3>' );
	$this->out( "<?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?>', 0, 0 );

	return;
}


// Getting selected user ID:
$this->out( '<?php' );
$this->out( '// Getting selected user ID:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '?>' );
$this->out( '<p>Selected user ID: <?= $user_id ?></p>', 0, 3 );

// Getting selected user object:
$this->out( '<?php' );
$this->out( '// Getting selected user object:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>' );
$this->out( '<pre>' );
	$this->out( '<!-- Show all data from the selected user -->', 1 );
	$this->out( '<?php print_r( $user ); ?>', 1 );
$this->out( '</pre>', 0, 3 );

// Displaying selected user info:
$this->out( '<?php' );
$this->out( '// Displaying selected user info:' );
$this->out( "\$user_id = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>' );
$this->out( '<p>Display name: <?= $user->display_name ?></p>' );
$this->out( '<p>Email: <?= $user->user_email ?></p>', 0, 3 );

// or simpler:
$this->out( '<?php // or simpler: ?>' );
$this->out( "<p>Display name: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [ 'link' => false ] ) . ' ); ?></p>' );
$this->out( "<p>Email: <?php rwmb_the_value( '" . $this->get_encoded_value( $field['id'], [
	'display_field' => 'user_email',
	'link'          => false,
] ) . ' ); ?></p>', 0, 0 );
