<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62
{
    public static $files = array (
        '1830d329ce66311bd18eefa9b7b43041' => __DIR__ . '/../..' . '/src/helpers.php',
    );

    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Riimu\\Kit\\PHPEncoder\\' => 21,
        ),
        'M' => 
        array (
            'MBB\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Riimu\\Kit\\PHPEncoder\\' => 
        array (
            0 => __DIR__ . '/..' . '/riimu/kit-phpencoder/src',
        ),
        'MBB\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'T' => 
        array (
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
