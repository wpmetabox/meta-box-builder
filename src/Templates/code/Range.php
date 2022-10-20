<?php
echo sprintf('<?php $values = rwmb_meta( \'[field_id]\' ) ?>
<?php foreach ( $values as $value ) : ?>
    <p><?= $value ?></p>
<?php endforeach ?>');