<?php
// Displaying the selected value.
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<p>Selected: <?= $value ?></p>


<?php
// Displaying the list of multiple choices.
$values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li><?= $value ?></li>
    <?php endforeach ?>
</ul>