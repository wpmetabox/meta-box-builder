<?php
$this->out( "\$user_id = \$group[ '" . $field['id'] . "' ] ?? 0;" );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>' );
$this->out( '<p>User: <?= $user->display_name ?></p>' );
$this->out( '<?php' );
