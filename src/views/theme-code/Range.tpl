<?php $values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ) ?>
<?php foreach ( $values as $value ) : ?>
    <p><?= $value ?></p>
<?php endforeach ?>