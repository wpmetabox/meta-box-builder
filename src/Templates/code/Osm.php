<?php
echo sprintf('<?php
$args = [
    \'width\'        => \'640px\',
    \'height\'       => \'480px\',
    \'zoom\'         => 14,
    \'marker\'       => true,
    \'marker_icon\'  => \'https://url_to_icon.png\',
    \'marker_title\' => \'Click me\',
    \'info_window\'  => \'<h3>Title</h3><p>Content</p>.\',
    \'js_options\' => [
        \'doubleClickZoom\' => false,
    ],    
];
rwmb_the_value( \'[field_id]\', $args );
?>');