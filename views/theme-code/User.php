<?php $user_id = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<?php $user = get_userdata( $user_id ); ?>
<p>Display name: <?= $user->display_name ?></p>
<p>Email: <?= $user->user_email ?></p>