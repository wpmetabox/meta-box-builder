<?php
// Getting selected post ID:
$this->out( "\$post_id = \$group[ '" . $field['id'] . "' ] ?? '';" );
$this->out( '?>' );
$this->out( '<p>Selected post ID: <?= $post_id ?></p>', 0, 2 );
$this->out( '<?php' );
