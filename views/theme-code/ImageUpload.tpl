<?php
// Displaying uploaded images.
$args = ['size' => 'thumbnail'];
$images = rwmb_meta( '{field_id}', $args, '{object_id}' ); ?>
<h3>Uploaded images</h3>
<ul>
    <?php foreach ( $images as $image ) : ?>
        <li><img src="<?= $image['url']; ?>"></li>
    <?php endforeach ?>
</ul>


<?php // Or simpler. ?>
<h3>Uploaded files</h3>
<?php
$args = ['size' => 'thumbnail'];
rwmb_the_value( '{field_id}', $args, '{object_id}' );
?>


<?php
// Display images with links to the full-size versions (for lightbox effects).
$args = ['size' => 'thumbnail'];
$images = rwmb_meta( '{field_id}', $args, '{object_id}' ); ?>
<h3>Uploaded images</h3>
<ul>
    <?php foreach ( $images as $image ) : ?>
        <li><a href="<?= $image['full_url'] ?>"><img src="<?= $image['url']; ?>"></a></li>
    <?php endforeach ?>
</ul>


<?php // Or simpler. ?>
<h3>Uploaded files</h3>
<?php
$args = ['size' => 'thumbnail', 'link' => true ];
rwmb_the_value( '{field_id}', $args, '{object_id}' );
?>