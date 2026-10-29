<?php
namespace MBB\Upgrade;

class Manager {
	public function __construct() {
		$this->upgrade();
	}

	public function upgrade() {
		/**
		 * Get current version to check.
		 * - Allow to set via query string `mbb_version`.
		 */
		$current_version = get_option( 'mbb_version', '1.0.0' );

		// Manual re-run for admin only + nonce
		if (
			is_admin()
			&& current_user_can( 'manage_options' )
			&& isset( $_GET['mbb_version'], $_GET['_wpnonce'] )
			&& wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ), 'mbb_force_upgrade' )
		) {
			$forced = sanitize_text_field( wp_unslash( $_GET['mbb_version'] ) );
			if ( preg_match( '/^\d+\.\d+(\.\d+)?$/', $forced ) ) {
				$current_version = $forced;
			}
		}

		if ( version_compare( $current_version, MBB_VER, '>' ) ) {
			$current_version = MBB_VER;
		}

		$versions = [ '3.0.0', '3.0.1', '4.0.4', '5.6.1' ];
		foreach ( $versions as $version ) {
			if ( version_compare( $current_version, $version, '>=' ) ) {
				continue;
			}
			$class = __NAMESPACE__ . '\Ver' . str_replace( '.', '', $version );
			if ( ! class_exists( $class ) ) {
				continue;
			}
			( new $class() )->migrate();
		}

		// Always update the DB version to the plugin version.
		if ( $current_version !== MBB_VER ) {
			update_option( 'mbb_version', MBB_VER );
		}
	}
}
