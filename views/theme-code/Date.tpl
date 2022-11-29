<?php 
$args = ['format' => 'F j, Y'];
$value = rwmb_meta( '{field_id}', $args, '{object_id}' );
echo $value;

// or output the date directly.
rwmb_the_value( '{field_id}', $args, '{object_id}' );
?>