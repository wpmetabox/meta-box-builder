<?php
// Getting selected value.
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
echo $value;
?>


<?php
// Displaying selected label.
rwmb_the_value( '{field_id}', [ '{args}' ], '{object_id}' );
?>


<?php
// Displaying both value and label.
$field   = rwmb_get_field_settings( '{field_id}', [ '{args}' ], '{object_id}' );
$options = $field['options'];
$value   = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
Value: <?= $value ?><br>
Label: <?= $options[ $value ] ?>


<?php
// Displaying the list of multiple choices (values and labels).
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