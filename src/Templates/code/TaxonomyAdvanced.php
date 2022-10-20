<?php
echo sprintf('<?php $terms = rwmb_meta( \'[field_id]\' ); ?>
<ul>
    <?php foreach ( $terms as $term ) : ?>
        <li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>
    <?php endforeach ?>
</ul>'
);