<?php
// Getting background values.
$background = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
echo $background['color'];
echo $background['image'];
?>


<?php // Outputing background style. ?>
<div style="<?php rwmb_the_value( '{field_id}', [ '{args}' ], '{object_id}' ) ?>">
    <h2>My section title</h2>
    <p>My section content</p>
</div>