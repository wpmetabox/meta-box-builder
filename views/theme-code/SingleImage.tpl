<?php 
$args  = ['size' => 'thumbnail'];
$image = rwmb_meta( '{field_id}', $args, '{object_id}' );
?>
<a href="<?= $image['full_url'] ?>"><img src="<?= $image['url']; ?>"></a>