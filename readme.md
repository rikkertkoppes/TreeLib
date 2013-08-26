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

###Reverse walking

Depth first reverse tree walking

    TreeLib.reverseWalk(tree,callback[,children]);

Walks the tree in reverse order, calling the callback for each node with three arguments:

- node: the current node in the tree, unaltered, so it still includes the children
- depth: the current depth of the node, starting at 0
- res: result of the (already executed) callbacks on the node's children, or undefined if it has none.

One can use the res argument to do a reduce on the tree

    function sum(prev,curr) {
        return prev + curr;
    }

    var total = TreeLib.reverseWalk(tree,function(node,depth,res) {
        //return the sum of the values in res, or some measure
        return res ? res.reduce(sum) : node.count;
    });



###Filtering

Filter the tree. When filtered, all nodes that do not match AND do not have matching decendants will be removed. This method works on a copy of the tree

    TreeLib.filter(tree,filter[,children])

The filter argument should be a function that takes a single argument: `node`, and returns a boolean. Depending on the result, the node will be filtered out if it has no matching decendants.

###Flattening

Flattens the tree into an array (depth first)

    TreeLib.flatten(tree[,children])

###Paths

Returns all the paths of the tree as an array (depth first)

    TreeLib.paths(tree[,children])

###Levels

Return the a flattened tree by depth

    TreeLib.levels(tree,[,children])

###Tree Objects

A tree can be wrapped in an object, which exposes the above functions as methods

    new TreeLib.Tree(tree[,children])

Exposes

- `Tree.walk(callback)`
- `Tree.reverseWalk(callback)`
- `Tree.filter(callback)`
- `Tree.flatten()`
- `Tree.paths()`
- `Tree.levels()`