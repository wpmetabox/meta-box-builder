<?php
// Displaying uploaded files with links.
<?php $files = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<h3>Uploaded files</h3>
<ul>
    <?php foreach ( $files as $file ) : ?>
        <li><a href="<?= $file['url']; ?>"><?= $file['name']; ?></a></li>
    <?php endforeach ?>
</ul>


<?php
// Displaying list of uploaded files.
rwmb_the_value( '{field_id}', [ '{args}' ], '{object_id}' );
?>