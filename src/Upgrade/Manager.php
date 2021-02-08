<?php
namespace MBB\Upgrade;

class Manager {
	public function __construct() {
		$this->upgrade();
	}

	public function upgrade() {
		$current_version = rwmb_request()->get( 'mbb_version', get_option( 'mbb_version', '1.0.0' ) );

		$vesions = ['3.0.0', '3.0.1', '4.0.4'];
		foreach ( $vesions as $version ) {
			if ( version_compare( $current_version, $version, '>=' ) ) {
				continue;
			}
			$class = __NAMESPACE__ . '\Ver' . str_replace( '.', '', $version );
			$ver = new $class;
			$ver->migrate();
		}

		if ( $current_version !== MBB_VER ) {
			update_option( 'mbb_version', MBB_VER );
		}
	}
}
