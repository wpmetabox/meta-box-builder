<?php
// Displaying field inputs' values.
$values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<p>Name: <?= $value[0] ?></p>
<p>Email: <?= $value[1] ?></p>


<?php
// Displaying cloneable values.
$values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li>
            <span>Name: <?= $value[0] ?></span>
            <span>Email: <?= $value[1] ?></span>
        </li>
    <?php endforeach ?>
</ul>