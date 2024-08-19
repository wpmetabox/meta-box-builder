<?php
use MBB\RestApi\ThemeCode\GroupVars;

$group_var = GroupVars::get_current_group_item_var();

// Getting selected post ID:
$this->out( "\$post_id = {$group_var}[ '" . $field['id'] . "' ] ?? '';" );
$this->out( '?>' );
$this->out( '<p>Selected post ID: <?= $post_id ?></p>', 0, 2 );
$this->out( '<?php' );
