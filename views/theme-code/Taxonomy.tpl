<?php
// Getting selected term.
$term = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
?>
<p><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></p>


<?php
// Displaying multiple selected terms.
$terms = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' );
?>
<h3>Project categories</h3>
<ul>
    <?php foreach ( $terms as $term ) : ?>
        <li><a href="<?= get_term_link( $term ) ?>"><?= $term->name ?></a></li>
    <?php endforeach ?>
</ul>