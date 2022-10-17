<?php
echo sprintf('<?php $image = rwmb_meta( \'[field_id]\', [\'size\' => \'thumbnail\'] ); ?>
<a href="<?= $image[\'full_url\'] ?>"><img src="<?= $image[\'url\']; ?>"></a>'
);