<?php
// Displaying selected value.
$this->out( '// Displaying selected value:' );
$this->out( "echo \$group_value[ '" . $field['id'] . "' ] ?? '';" );