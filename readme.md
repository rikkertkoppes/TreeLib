TreeLib
=======

A bunch of function to handle trees in javascript.

A tree is defined as an object containing an array of the same objects, or an array of those (which is a collection or a tree with no single root). The property containing the children is assumed to be 'children' by default, but can be arbitrarily chosen.

Hence, this is a tree (with a root node 'foo'):

    {
        name: 'foo',
        children: [{
            name: 'foobar'
        },{
            name: 'foobaz'
        }]
    }

and this too (no root node):

    [{
        name: 'foo',
        children: [{
            name: 'foobar'
        },{
            name: 'foobaz'
        }]
    },{
        name: 'qux',
        children: [{
            name: 'quxmoo'
        },{
            name: 'quxfox'
        }]
    }]

Usage
-----

- AMD: `require(['TreeLib'],function(TreeLib) {});`
- Globally: `window.TreeLib`
- Nodejs: `require('TreeLib');`

###Walking

Depth first tree walking

    TreeLib.walk(tree,callback[,children]);

Walks the tree, calling callback for each node with three arguments:

- node: the current node in the tree, unaltered, so it still includes the children
- depth: the current depth of the node, starting at 0
- path: an array containing the path of the node, which is the path from the root node to the current node.

The `children` argument is optional and should be a string indicating the property used for the children array. This defaults to 'children'.

###Flattening

Flattens the tree into an array (depth first)

    TreeLib.flatten(tree[,children])

###Paths

Returns all the paths of the tree as an array (depth first)

    TreeLib.paths(tree[,children])

###Tree Objects

A tree can be wrapped in an object, which exposes the above functions as methods

    new TreeLib.Tree(tree[,children])

Exposes

- `Tree.walk(callback)`
- `Tree.flatten()`
- `Tree.paths()`