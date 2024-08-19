<?php
use MBB\RestApi\ThemeCode\GroupVars;

$group_var = GroupVars::get_current_group_item_var();

$this->out( "\$term_id = {$group_var}[ '" . $field['id'] . "' ] ?? 0;" );
$this->out( '$term = get_term( $term_id );' );
$this->out( '?>' );
$this->out( '<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>' );
$this->out( '<?php' );
