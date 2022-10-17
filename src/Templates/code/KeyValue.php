<?php
echo sprintf('<?php $pairs = rwmb_meta( \'[field_id]\' ); ?>
<ul>
    <?php foreach ( $pairs as $pair ) : ?>
        <li><label><?= $pair[0] ?>:</label> <?= $pair[1] ?></li>
    <?php endforeach ?>
</ul>');