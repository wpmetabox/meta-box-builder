<?php
namespace MBB\Integrations;

class WooCommerce {
	public function __construct() {
		if ( ! self::is_active() ) {
			return;
		}

		add_filter( 'mbb_app_data', [ $this, 'add_app_data' ] );
	}

	public static function is_active(): bool {
		return class_exists( 'WooCommerce' );
	}
 
	public function add_app_data( array $data ): array {
		$data['wcOrders'] = $this->get_order_types();
		return $data;
	}
 
	private function get_order_types(): array { 
		$order_types = [
			[ 'slug' => 'shop_order', 'name' => __( 'Order', 'meta-box-builder' ) ],
		];
 
		// Only add it to the list when the plugin is actually active.
		if ( class_exists( 'WC_Subscriptions' ) ) {
			$order_types[] = [ 'slug' => 'shop_subscription', 'name' => __( 'Subscription', 'meta-box-builder' ) ];
		}
 
		return $order_types;
	}
}
