<?php
// Displaying the selected value.
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<p>Selected: <?= $value ?></p>


<?php // Displaying the selected label. ?>
<p>My choice: <?php rwmb_the_value( '{field_id}', [ '{args}' ], '{object_id}' ) ?></p>


<?php
// Displaying both value and label.
$field   = rwmb_get_field_settings( '{field_id}', [ '{args}' ], '{object_id}' );
$options = $field['options'];
$value   = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
Value: <?= $value ?><br>
Label: <?= $options[ $value ] ?>