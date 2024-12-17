<?php
namespace MBB;

use RWMB_Loader;
use MBB\Helpers\Data;

class Assets {
	public static function enqueue(): void {
		self::enqueue_meta_box_assets();
		self::enqueue_extensions_assets();
	}

	private static function enqueue_meta_box_assets(): void {
		wp_enqueue_style( 'rwmb', RWMB_CSS_URL . 'style.css', [], RWMB_VER );
		if ( is_rtl() ) {
			wp_enqueue_style( 'rwmb-rtl', RWMB_CSS_URL . 'style-rtl.css', [], RWMB_VER );
		}

		wp_enqueue_style( 'rwmb-input', RWMB_CSS_URL . 'input.css', [], RWMB_VER );
		wp_enqueue_style( 'rwmb-input-list', RWMB_CSS_URL . 'input-list.css', [], RWMB_VER );
	}

	private static function enqueue_extensions_assets(): void {
		self::enqueue_extension_css( 'meta-box-text-limiter', 'text-limiter.css' );
		self::enqueue_extension_css( 'meta-box-tooltip', 'css/tooltip.css' );
	}

	private static function enqueue_extension_css( string $extension, string $relative_path ): void {
		if ( ! Data::is_extension_active( $extension ) ) {
			return;
		}
		$base = self::get_extensions_base();

		$path = $base[0] . ltrim( $relative_path, '/' );
		$url = $base[1] . ltrim( $relative_path, '/' );

		if ( file_exists( $path ) ) {
			wp_enqueue_style( $extension, $url, [], filemtime( $path ) );
		}
	}

	private static function get_extensions_base(): array {
		$path = dirname( MBB_DIR );
		return RWMB_Loader::get_path( $path );
	}
}
