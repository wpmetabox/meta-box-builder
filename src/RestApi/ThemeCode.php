<?php
namespace MBB\RestApi;

use WP_REST_Server;
use WP_REST_Request;
use RWMB_Helpers_String;

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
		$settings = !empty( $request->get_param('settings') ) ? json_decode( $request->get_param('settings'), true ) : [];
		
		$fields = !empty( $request->get_param('fields') ) ? json_decode( $request->get_param('fields'), true ) : [];
		if( empty( $fields ) || empty( $settings ) ){
			return '';
		}

		//Path for Template code
		$path_folder_code = plugin_dir_path( dirname( __FILE__ ) ).'views/theme-code';
		$search = [ '{field_id}', '{field_type}' ];

		$params = $this->get_params_setting( $settings );
		foreach( $fields as $key => $field ){
			$fieldType = str_replace( '_', '', RWMB_Helpers_String::title_case( $field['type'] ) );
			$fieldId = $field[ 'id' ];
			$replace = [ $fieldId, $fieldType ];

			// Not exists file template code
			if( ! file_exists( "$path_folder_code/$fieldType.tpl" ) ) {
				// Code for Post
				if( empty( $params['params'] ) ) {
					$fields[ $key ]['theme_code'] = "<?php rwmb_the_value( '$fieldId' ) ?>";
					continue;
				}

				$themeCode = file_get_contents("$path_folder_code/Default.tpl");
				$settingParams = implode(', ', $params['params']);
				$object_id = $params['object_id'];
				if( empty( $object_id ) ) {
					$fields[ $key ]['theme_code'] = str_replace( array_merge( $search, [ '\'{params}\'', ', \'{object_id}\'' ]), array_merge( $replace, [ $settingParams, '' ] ), $themeCode );
					continue;
				}

				$fields[ $key ]['theme_code'] = str_replace( array_merge( $search, [ '\'{params}\'', ', \'{object_id}\'' ]), array_merge( $replace, [ $settingParams, ", '$object_id'" ] ), $themeCode );
				continue;
			}			

			//Check and Get Template code
			$objectType = $params['object_type'];
			$themeCode = file_exists( "$path_folder_code/$fieldType-$objectType.tpl" ) ? file_get_contents("$path_folder_code/$fieldType-$objectType.tpl") : file_get_contents("$path_folder_code/$fieldType.tpl");
			
			$fields[ $key ]['theme_code'] = str_replace( $search, $replace, $themeCode );
		}

		return $fields;
	}	
	
	private function get_params_setting( $settings ){		
		switch($settings['object_type']){
			case "setting":
				$params = [
					'params' => [
						'\'object_type\' => \'setting\''
					],
					'object_id' => $settings['settings_pages'][0]
				];
				break;
			case "term":
				$params = [
					'params' => [
						'\'object_type\' => \'term\''
					],
					'object_id' => $settings['taxonomies'][0]
				];				
				break;
			case "comment":
				$params = [
					'params' => [
						'\'object_type\' => \'comment\''
					],
					'object_id' => ''
				];
				break;
			default:
				$params = ['params' => [], 'object_id' => ''];
				break;
		}

		return array_merge($params, ['object_type' => $settings['object_type']]);
	}
}