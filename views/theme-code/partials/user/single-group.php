<?php
// Displaying in group
$this->out( '' );
$this->out( '// Get User in group' );
$this->out( "\$user_ids = \$group[ '" . $field['id'] . "' ] ?? '';" );
$this->out( 'foreach ( $user_ids as $user_id ) :' );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '<p><?= $user->display_name ?></a></p>' );
$this->out( 'endforeach;' );