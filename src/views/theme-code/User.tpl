<?php $user_id = rwmb_meta( '{field_id}' ); ?>
<?php $user = get_userdata( $user_id ); ?>
<pre>
    <!-- Show all data from the selected user -->
    <?php print_r( $user ); ?>
</pre>