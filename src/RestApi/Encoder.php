<?php
namespace MBB\RestApi;

use RWMB_Helpers_String;
use Riimu\Kit\PHPEncoder\PHPEncoder;

class Encoder {

	private $text_domain;
	private $fields;
	private $encoded_string;

	public function __construct( $settings ) {
		$this->text_domain   = $settings['text_domain'] ?? 'meta-box-builder';
		$this->fields = $settings['fields'] ?? [];

		unset( $settings['text_domain'], $settings['fields'] );
		$this->settings = $settings;
	}

	public function get_encoded_string() {
		return $this->fields;
	}

	public function encode() {
		//Path for Template code
		$path_folder_code = plugin_dir_path( dirname( dirname( __FILE__ ) ) ).'views/theme-code';

		$this->field_object_id = $this->settings['object_id'] ?? '';		
		$objectType = $this->settings['object_type'] ?? '';
	
		foreach( $this->fields as $key => $field ){
			$this->field_args = empty( $this->settings['args'] ) ? [ ] : implode( ', ', $this->settings['args'] );			
			$fieldType = str_replace( '_', '', RWMB_Helpers_String::title_case( $field['type'] ) );			
			$this->field_type = $fieldType;
			$this->field_id = $field[ 'id' ];

			// Not exists file template code
			if( ! file_exists( "$path_folder_code/$fieldType.tpl" ) ) {		
				$this->encoded_string = empty( $this->field_args ) ? file_get_contents("$path_folder_code/Default.tpl") : '';
			}else{
				//Check and Get Template code			
				$this->encoded_string = file_exists( "$path_folder_code/$fieldType-$objectType.tpl" ) ? file_get_contents("$path_folder_code/$fieldType-$objectType.tpl") : file_get_contents("$path_folder_code/$fieldType.tpl");
			}

			$this->replace_placeholders();			
			$this->fields[ $key ]['theme_code'] = $this->encoded_string;
		}
	}

	private function replace_placeholders() {
		// Translate.
		$this->encoded_string = preg_replace( "!'{translate}(.*){/translate}'!", "__( '$1', '" . $this->text_domain . "' )", $this->encoded_string );

		// Raw code.
		$this->encoded_string = preg_replace( "!'{raw}(.*){/raw}'!", '$1', $this->encoded_string );

		// Field ID.
		$this->encoded_string = str_replace( '{field_id}', $this->field_id, $this->encoded_string );

		// Field Type.
		$this->encoded_string = str_replace( '{field_type}', $this->field_type, $this->encoded_string );		

		// Field Object ID.
		if( !empty( $this->field_object_id ) ) {
			$this->encoded_string = str_replace( ', \'{object_id}\'', ', \'' . $this->field_object_id . '\'', $this->encoded_string );				
		}else{
			$this->encoded_string = str_replace( ', \'{object_id}\'', '', $this->encoded_string );				
		}

		// Field Args.
		// Have args Default
		preg_match( "'{args}(.*){/args}'si", $this->encoded_string, $matches );
		if( empty( $matches ) || count( $matches ) === 0 ) {
			if( !empty( $this->field_args ) ) {
				$this->encoded_string = str_replace( '\'{args}\'', $this->field_args, $this->encoded_string );	
			}else{
				$this->encoded_string = str_replace( [ ', [ \'{args}\' ]', '\'{args}\'' ], '', $this->encoded_string );
			}
			return $this;
		}

		//Parser String to array
		$args = eval('return '. $matches[1] . ';');
		$this->field_args = !empty( $this->field_args ) ? eval('return ['. $this->field_args . '];') : [ ];

		$args = array_merge( $this->field_args, $args );

		$encoder = new PHPEncoder;
		$args = $encoder->encode( $args, [
			'array.base'    => 4,
			'array.align'   => true,
			'string.escape' => false,
		] );
		
		$this->encoded_string = str_replace( $matches[0], '$args = ' . $args . ';', $this->encoded_string );

		return $this;
	}
}
