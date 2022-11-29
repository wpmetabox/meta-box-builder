<?php
// Displaying selected values.
$values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li><?= $value ?></li>
    <?php endforeach ?>
</ul>


<?php
// Displaying both values and labels.
$field   = rwmb_get_field_settings( '{field_id}', [ '{args}' ], '{object_id}' );
$options = $field['options'];
$values  = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li>
            Value: <?= $value ?><br>
            Label: <?= $options[ $value ] ?>
        </li>
    <?php endforeach ?>
</ul>