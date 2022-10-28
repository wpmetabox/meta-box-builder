<?php
    {args}
    $args = [
        'size' => 'thumbnail',
        'limit' => 10    
    ];
    {/args}
    $images = rwmb_meta( '{field_id}', $args, '{object_id}' ) ?: [ ];
    foreach ( $images as $image ) { 
?>
        <a href="<?= $image['full_url'] ?>"><img src="<?= $image['url'] ?>" alt=""></a>
<?php        
    }
?>