<?php
namespace MBB\Relationships\Parsers;

use MBBParser\Parsers\Base;

class Field extends Base {
	public function parse() {
		$this->remove_empty_values();
	}
}
