<?php
// Getting selected post.
$post_id = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
$post = get_post( $post_id );
echo $post->post_title;
?>


<?php
// Displaying multiple selected posts.
$post_ids = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<h3>Related posts</h3>
<ul>
    <?php foreach ( $post_ids as $post_id ) : ?>
        <li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>
    <?php endforeach ?>
</ul>