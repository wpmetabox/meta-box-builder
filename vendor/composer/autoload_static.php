<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Riimu\\Kit\\PHPEncoder\\' => 21,
        ),
        'M' => 
        array (
            'MetaBox\\Support\\' => 16,
            'MetaBox\\Dependencies\\' => 21,
            'MBB\\SettingsPage\\' => 17,
            'MBB\\Relationships\\' => 18,
            'MBB\\' => 4,
            'MBBParser\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Riimu\\Kit\\PHPEncoder\\' => 
        array (
            0 => __DIR__ . '/..' . '/riimu/kit-phpencoder/src',
        ),
        'MetaBox\\Support\\' => 
        array (
            0 => __DIR__ . '/..' . '/meta-box/support',
        ),
        'MetaBox\\Dependencies\\' => 
        array (
            0 => __DIR__ . '/../..' . '/dependencies',
        ),
        'MBB\\SettingsPage\\' => 
        array (
            0 => __DIR__ . '/../..' . '/modules/settings-page/src',
        ),
        'MBB\\Relationships\\' => 
        array (
            0 => __DIR__ . '/../..' . '/modules/relationships/src',
        ),
        'MBB\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'MBBParser\\' => 
        array (
            0 => __DIR__ . '/..' . '/meta-box/mbb-parser/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb514f273ab9a36d3fea19808c7c51d62::$classMap;

        }, null, ClassLoader::class);
    }
}
