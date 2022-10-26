<?php
    $images = rwmb_meta( '{field_id}', [ 'size' => 'thumbnail', 'limit' => 10 ] ) ?: [ ];
    foreach ( $images as $image ) { 
?>
        <a href="<?= $image['full_url'] ?>"><img src="<?= $image['url'] ?>" alt=""></a>
<?php        
    }
?>