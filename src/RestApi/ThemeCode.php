<?php
namespace MBB\RestApi;

use WP_REST_Server;
use WP_REST_Request;

class ThemeCode {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		register_rest_route( 'mbb', 'theme-code-generate', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'generate' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	public function generate( WP_REST_Request $request ) {
		// Check params field
		$field = !empty( $request->get_param('field') ) ? json_decode( $request->get_param('field'), true ) : '';
		$field_type = $request->get_param('type');
		if( empty( $field ) || empty( $field_type ) ){
			return '';
		}
		//Check and Get Template code
		$path_folder_code = plugin_dir_path( dirname( __FILE__ ) ).'Templates/code';
		if( ! file_exists( "$path_folder_code/$field_type.php" ) ) {
			$params = ( array ) $request->get_param('params');
			// Code for Post
			if( empty( $params ) ) {
				return "<?php rwmb_the_value( '" . $field[ 'id' ] . "' ) ?>";
			}

			$object_id = $request->get_param('object_id');
			return empty( $object_id ) ? 
				"<?php \n\t \$value = rwmb_meta( '" . $field[ 'id' ] . "', [" . implode(', ', $params) . "]); \n\t echo \$value; \n ?>" : 
				"<?php \n\t \$value = rwmb_meta( '" . $field[ 'id' ] . "', [" . implode(', ', $params) . "], '$object_id'); \n\t echo \$value; \n ?>";
		}

		$object_type = $request->get_param('object_type');
		$return_code = '';
		ob_start();

		!empty( $object_id ) && file_exists( "$path_folder_code/$field_type-$object_type.php" ) ? 
			include("$path_folder_code/$field_type-$object_type.php") : 
			include("$path_folder_code/$field_type.php");
		$return_code = ob_get_contents();

		ob_end_clean();		
		
		// Replace placeholders
		$search = [ '[field__id]', '[field_id]', '[field_type]' ];
		$replace = [ $field[ '_id' ], $field[ 'id' ], $field_type ];
		return str_replace( $search, $replace, $return_code );
	}	
}