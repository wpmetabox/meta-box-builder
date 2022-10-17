<?php
echo sprintf('<?php
    $images = rwmb_meta( \'[field_id]\', [ \'size\' => \'thumbnail\', \'limit\' => 10] ) ?: [];
    foreach ( $images as $image ) {
        echo "<a href=\'{$image[\'full_url\']}\'><img src=\'{$image[\'url\']}\'></a>";
    }
?>');
?>