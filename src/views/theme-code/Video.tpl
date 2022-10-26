<?php $videos = rwmb_meta( '{field_id}' ) ?>
<ul>
    <?php foreach ( $videos as $video ) : ?>
        <li>
            <?php
            echo wp_video_shortcode( [
                'src'    => $video['src'],
                'width'  => $video['dimensions']['width'],
                'height' => $video['dimensions']['height'],
            ] );
            ?>
        </li>
    <?php endforeach ?>
</ul>