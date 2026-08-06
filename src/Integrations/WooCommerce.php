<?php
namespace MBB\Integrations;

use Automattic\WooCommerce\Utilities\OrderUtil;

class WooCommerce {
	public function __construct() {
		if ( ! self::is_active() ) {
			return;
		}

		add_filter( 'mbb_app_data', [ $this, 'add_app_data' ] );
	}

	public static function is_active(): bool {
		// Check WooCommerce and HPOS must be enabled
		// If HPOS disabled, we select over WC post-types
		if( class_exists( 'WooCommerce' ) && class_exists( '\Automattic\WooCommerce\Utilities\OrderUtil' ) ) {
			return OrderUtil::custom_orders_table_usage_is_enabled();
		}

		return false;
	}
 
	public function add_app_data( array $data ): array {
		$order_types = [
			[ 'slug' => 'shop_order', 'name' => __( 'Order', 'meta-box-builder' ) ],
		];
 
		// Only add it to the list when the plugin is actually active.
		if ( class_exists( 'WC_Subscriptions' ) ) {
			$order_types[] = [ 'slug' => 'shop_subscription', 'name' => __( 'Subscription', 'meta-box-builder' ) ];
		}

		$data['wcOrders'] = $order_types;

		$data['extensions']             = is_array( $data['extensions'] ?? null ) ? $data['extensions'] : [];
		$data['extensions']['wcOrders'] = ! empty( $order_types );

		return $data;
	}
}
