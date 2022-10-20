<?php
echo sprintf('<?php $values = rwmb_meta( \'[field_id]\' ) ?>
<pre>
    <!-- Show all data from the inputs\' values -->
    <?php print_r( $values ); ?>
</pre>'
);