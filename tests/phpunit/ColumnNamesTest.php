<?php
use MBB\Helpers\Data;
use PHPUnit\Framework\TestCase;

class ColumnNamesTest extends TestCase {
	public function testAssocMapUsesKeysNotSqlTypes(): void {
		$this->assertSame(
			[ 'transaction_id', 'amount' ],
			Data::column_names( [
				'transaction_id' => 'BIGINT',
				'amount'         => 'DECIMAL(10,2)',
			] )
		);
	}

	public function testListOfNames(): void {
		$this->assertSame(
			[ 'email', 'amount' ],
			Data::column_names( [ 'email', 'amount' ] )
		);
	}

	public function testListOfEditorItems(): void {
		$this->assertSame(
			[ 'email', 'amount' ],
			Data::column_names( [
				[ 'name' => 'email', 'type' => 'VARCHAR' ],
				[ 'name' => 'amount', 'type' => 'DECIMAL' ],
			] )
		);
	}
}
