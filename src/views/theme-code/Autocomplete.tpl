<?php $values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li><?= $value ?></li>
    <?php endforeach ?>
</ul>