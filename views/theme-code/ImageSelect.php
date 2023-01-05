<?php
// Displaying the selected value.
$value = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<p>Selected: <?= $value ?></p>


<?php
// Displaying the list of multiple choices.
$values = rwmb_meta( '{field_id}', [ '{args}' ], '{object_id}' ); ?>
<ul>
    <?php foreach ( $values as $value ) : ?>
        <li><?= $value ?></li>
    <?php endforeach ?>
</ul>

<?php
if ( isset( $field['clone'] ) ) {
	// Displaying cloneable values:
    echo $this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ); ?>', false );
    echo $this->out( '<ul>', false );
    echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
    echo $this->out( $this->indent() . '<li><?= $value ?></li>' );
    echo $this->out( '<?php endforeach ?>' );
    echo $this->out( '</ul>', false, false );
	return;
}

// Displaying the selected value:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the selected value:' );
echo $this->out( "\$value = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<p>Selected: <?= $value ?></p>', false );
echo $this->break();

// Displaying the list of multiple choices:
echo $this->out( '<?php', false );
echo $this->out( '// Displaying the list of multiple choices:' );
echo $this->out( "\$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' );' );
echo $this->out( '?>', false );
echo $this->out( '<ul>', false );
echo $this->out( '<?php foreach ( $values as $value ) : ?>' );
echo $this->out( $this->indent() . '<li><?= $value ?></li>' );
echo $this->out( '<?php endforeach ?>' );
echo $this->out( '</ul>', false, false );