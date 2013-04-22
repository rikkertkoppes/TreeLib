var TreeLib = (function() {

    /**
     * depth first tree walker
     * @param  {object||array}   tree     the tree to walk, can be an object or
     * an array, in which case there is no root node
     * @param  {Function(node,depth,path)} callback gets the tree node, depth and path as arguments
     * @param  {String}   children (optional) attribute containing children, defaults to 'children'
     */
    function walk(tree,callback,children) {
        function _walk(tree,depth,path) {
            if (!(tree instanceof Array)) {
                //callback on the node
                path.push(tree);
                callback(tree,depth,path);
                depth+=1;
                //set subtree to empty array if not exists
                tree = tree[children||'children']||[];
            }
            //recurse the subtree
            tree.forEach(function(child) {
                _walk(child,depth,path.slice());
            });
        }

        _walk(tree,0,[]);
    }

    /**
     * depth first flatten tree, children are maintained
     * @param  {object|array} tree     tree to flatten, or array of trees
     * @param  {String} children (optional) attribute containing the children, defaults to 'children'
     * @return {Array}          array of nodes
     */
    function flatten(tree,children) {
        var res = [];
        walk(tree,function(node) {
            res.push(node);
        },children);
        return res;
    }

    function paths(tree,children) {
        var res = [];
        walk(tree,function(node,depth,path) {
            res.push(path);
        },children);
        return res;
    }

    /**
     * Object wrapper for the tree, exposing the TreeLib functions as methods
     * @param {object||array} tree     tree
     * @param {String} children (optional) attribute containing the children, defaults to 'children'
     */
    function Tree(tree,children) {
        this.tree = tree;
        this.childrenProp = children||'children';
    }

    Tree.prototype.walk = function(callback) {
        walk(this.tree,callback,this.childrenProp);
        return this;
    };

    Tree.prototype.flatten = function() {
        return flatten(this.tree,this.childrenProp);
    };

    Tree.prototype.paths = function() {
        return paths(this.tree,this.childrenProp);
    };

    return {
        walk: walk,
        flatten: flatten,
        paths: paths,
        Tree: Tree
    };
}());