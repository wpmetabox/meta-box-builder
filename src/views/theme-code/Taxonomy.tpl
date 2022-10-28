<?php $term = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<pre>
    <!-- Show all data from the selected term -->
    <?php print_r( $term ); ?>
</pre>