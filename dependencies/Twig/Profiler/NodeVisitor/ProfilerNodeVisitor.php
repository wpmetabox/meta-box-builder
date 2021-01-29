<?php

/*
 * This file is part of Twig.
 *
 * (c) Fabien Potencier
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace MetaBox\Dependencies\Twig\Profiler\NodeVisitor;

use MetaBox\Dependencies\Twig\Environment;
use MetaBox\Dependencies\Twig\Node\BlockNode;
use MetaBox\Dependencies\Twig\Node\BodyNode;
use MetaBox\Dependencies\Twig\Node\MacroNode;
use MetaBox\Dependencies\Twig\Node\ModuleNode;
use MetaBox\Dependencies\Twig\Node\Node;
use MetaBox\Dependencies\Twig\NodeVisitor\NodeVisitorInterface;
use MetaBox\Dependencies\Twig\Profiler\Node\EnterProfileNode;
use MetaBox\Dependencies\Twig\Profiler\Node\LeaveProfileNode;
use MetaBox\Dependencies\Twig\Profiler\Profile;

/**
 * @author Fabien Potencier <fabien@symfony.com>
 */
final class ProfilerNodeVisitor implements NodeVisitorInterface
{
    private $extensionName;

    public function __construct(string $extensionName)
    {
        $this->extensionName = $extensionName;
    }

    public function enterNode(Node $node, Environment $env): Node
    {
        return $node;
    }

    public function leaveNode(Node $node, Environment $env): ?Node
    {
        if ($node instanceof ModuleNode) {
            $varName = $this->getVarName();
            $node->setNode('display_start', new Node([new EnterProfileNode($this->extensionName, Profile::TEMPLATE, $node->getTemplateName(), $varName), $node->getNode('display_start')]));
            $node->setNode('display_end', new Node([new LeaveProfileNode($varName), $node->getNode('display_end')]));
        } elseif ($node instanceof BlockNode) {
            $varName = $this->getVarName();
            $node->setNode('body', new BodyNode([
                new EnterProfileNode($this->extensionName, Profile::BLOCK, $node->getAttribute('name'), $varName),
                $node->getNode('body'),
                new LeaveProfileNode($varName),
            ]));
        } elseif ($node instanceof MacroNode) {
            $varName = $this->getVarName();
            $node->setNode('body', new BodyNode([
                new EnterProfileNode($this->extensionName, Profile::MACRO, $node->getAttribute('name'), $varName),
                $node->getNode('body'),
                new LeaveProfileNode($varName),
            ]));
        }

        return $node;
    }

    private function getVarName(): string
    {
        return sprintf('__internal_%s', hash('sha256', $this->extensionName));
    }

    public function getPriority(): int
    {
        return 0;
    }
}
