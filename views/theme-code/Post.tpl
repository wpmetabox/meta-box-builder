<?php $post_ids = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<ul>
    <?php foreach ( $post_ids as $post_id ) : ?>
        <li><a href="<?= get_permalink( $post_id ) ?>"><?= get_the_title( $post_id ); ?></a></li>
    <?php endforeach ?>
</ul>