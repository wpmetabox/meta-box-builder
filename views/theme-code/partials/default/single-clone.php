<?php
$this->out( "<?php \$values = rwmb_meta( '" . $this->get_encoded_value( $field['id'] ) . ' ) ?>' );
$this->out( '<?php foreach ( $values as $value ) : ?>' );
	$this->out( '<p><?= $value ?></p>', 1 );
$this->out( '<?php endforeach ?>', 0, 0 );
