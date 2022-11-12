<?php
    {args}
    $args = [
        'width'        => '640px',
        'height'       => '480px',
        'zoom'         => 14,
        'marker'       => true,
        'marker_icon'  => 'https://url_to_icon.png',
        'marker_title' => 'Click me',
        'info_window'  => '<h3>Title</h3><p>Content</p>.',
        'js_options'   => [
            'mapTypeId'   => 'HYBRID',
            'zoomControl' => false,
        ],    
    ];
    {/args}
    rwmb_the_value( '{field_id}', $args, '{object_id}' );
?>