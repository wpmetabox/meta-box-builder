<?php
use MBB\RestApi\ThemeCode\GroupVars;

$group_var = GroupVars::get_current_group_item_var();

$this->out( "\$user_id = {$group_var}[ '" . $field['id'] . "' ] ?? 0;" );
$this->out( '$user = get_userdata( $user_id );' );
$this->out( '?>' );
$this->out( '<p>User: <?= $user->display_name ?></p>' );
$this->out( '<?php' );
