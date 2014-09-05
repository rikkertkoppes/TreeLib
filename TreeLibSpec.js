describe('test', function() {
    //set up some named nodes
    var foobar = {
        name: 'foobar'
    };
    var foobaz = {
        name: 'foobaz'
    };
    var quxmoo = {
        name: 'quxmoo'
    };
    var quxfox = {
        name: 'quxfox'
    };
    var foo = {
        name: 'foo',
        children: [foobar, foobaz]
    };
    var qux = {
        name: 'qux',
        children: [quxmoo, quxfox]
    };
    var fooAlt = {
        name: 'foo',
        items: [foobar, foobaz]
    };
    var quxAlt = {
        name: 'qux',
        items: [quxmoo, quxfox]
    };
    var testTreeNoRoot = [foo, qux];
    var testTreeWithRoot = {
        name: 'root',
        children: testTreeNoRoot
    };
    var testTreeAltChildren = {
        name: 'root',
        items: [fooAlt,quxAlt]
    }

    it('should pass', function() {
        expect(true).toBe(true);
    });

    describe('walk', function() {
        it('should walk the tree without root', function() {
            var cb = jasmine.createSpy('cb');
            TreeLib.walk(testTreeNoRoot, cb);
            expect(cb.calls.length).toBe(6);
            expect(cb.calls[0].args).toEqual([foo, 0, [foo]]);
            expect(cb.calls[1].args).toEqual([foobar, 1, [foo, foobar]]);
            expect(cb.calls[2].args).toEqual([foobaz, 1, [foo, foobaz]]);
            expect(cb.calls[3].args).toEqual([qux, 0, [qux]]);
            expect(cb.calls[4].args).toEqual([quxmoo, 1, [qux, quxmoo]]);
            expect(cb.calls[5].args).toEqual([quxfox, 1, [qux, quxfox]]);
        });

        it('should walk the tree with root', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeWithRoot;
            TreeLib.walk(root, cb);
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([root, 0, [root]]);
            expect(cb.calls[1].args).toEqual([foo, 1, [root, foo]]);
            expect(cb.calls[2].args).toEqual([foobar, 2, [root, foo, foobar]]);
            expect(cb.calls[3].args).toEqual([foobaz, 2, [root, foo, foobaz]]);
            expect(cb.calls[4].args).toEqual([qux, 1, [root, qux]]);
            expect(cb.calls[5].args).toEqual([quxmoo, 2, [root, qux, quxmoo]]);
            expect(cb.calls[6].args).toEqual([quxfox, 2, [root, qux, quxfox]]);
        });

        it('should walk the tree with children param', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeAltChildren;
            TreeLib.walk(root, cb, 'items');
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([root, 0, [root]]);
            expect(cb.calls[1].args).toEqual([fooAlt, 1, [root, fooAlt]]);
            expect(cb.calls[2].args).toEqual([foobar, 2, [root, fooAlt, foobar]]);
            expect(cb.calls[3].args).toEqual([foobaz, 2, [root, fooAlt, foobaz]]);
            expect(cb.calls[4].args).toEqual([quxAlt, 1, [root, quxAlt]]);
            expect(cb.calls[5].args).toEqual([quxmoo, 2, [root, quxAlt, quxmoo]]);
            expect(cb.calls[6].args).toEqual([quxfox, 2, [root, quxAlt, quxfox]]);
        });

        it('should walk the tree with children function', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeAltChildren;
            TreeLib.walk(root, cb, function(item) {
                return item.items;
            });
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([root, 0, [root]]);
            expect(cb.calls[1].args).toEqual([fooAlt, 1, [root, fooAlt]]);
            expect(cb.calls[2].args).toEqual([foobar, 2, [root, fooAlt, foobar]]);
            expect(cb.calls[3].args).toEqual([foobaz, 2, [root, fooAlt, foobaz]]);
            expect(cb.calls[4].args).toEqual([quxAlt, 1, [root, quxAlt]]);
            expect(cb.calls[5].args).toEqual([quxmoo, 2, [root, quxAlt, quxmoo]]);
            expect(cb.calls[6].args).toEqual([quxfox, 2, [root, quxAlt, quxfox]]);
        });
    });

    describe('reversewalk', function() {
        it('should walk the tree backwards without root', function() {
            var cb = jasmine.createSpy('cb');
            TreeLib.reverseWalk(testTreeNoRoot, cb);
            expect(cb.calls.length).toBe(6);
            expect(cb.calls[0].args).toEqual([foobar, 1, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 1, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 0, undefined]);
            expect(cb.calls[3].args).toEqual([quxmoo, 1, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 1, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 0, undefined]);
        });

        it('should walk the tree backwards with root', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeWithRoot;
            TreeLib.reverseWalk(root, cb);
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 1, undefined]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 1, undefined]);
            expect(cb.calls[6].args).toEqual([root, 0, undefined]);
        });

        it('should walk the tree backwards with children param', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeAltChildren;
            TreeLib.reverseWalk(root, cb, 'items');
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, undefined]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, undefined]);
            expect(cb.calls[6].args).toEqual([root, 0, undefined]);
        });

        it('should walk the tree backwards with children function', function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeAltChildren;
            TreeLib.reverseWalk(root, cb, function(item) {
                return item.items;
            });
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, undefined]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, undefined]);
            expect(cb.calls[6].args).toEqual([root, 0, undefined]);
        });
    });

    describe('reversewalk counting', function() {
        it('should walk backwards while counting all items no root', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or 1 to count this (end) node
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : 1;
            });
            var res = TreeLib.reverseWalk(testTreeNoRoot, cb);
            expect(cb.calls.length).toBe(6);
            expect(cb.calls[0].args).toEqual([foobar, 1, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 1, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 0, [1, 1]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 1, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 1, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 0, [1, 1]]);
            expect(res).toEqual([2, 2]);
        });

        it('should walk backwards while counting all items with root', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or 1 to count this (end) node
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : 1;
            });
            var root = testTreeWithRoot;
            var res = TreeLib.reverseWalk(root, cb);
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 1, [1, 1]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 1, [1, 1]]);
            expect(cb.calls[6].args).toEqual([root, 0, [2, 2]]);
            expect(res).toEqual(4);
        });

        it('should walk backwards while counting all items with children param', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or 1 to count this (end) node
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : 1;
            });
            var root = testTreeAltChildren;
            var res = TreeLib.reverseWalk(root, cb, 'items');
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, [1, 1]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, [1, 1]]);
            expect(cb.calls[6].args).toEqual([root, 0, [2, 2]]);
            expect(res).toEqual(4);
        });

        it('should walk backwards while counting all items with children param', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or 1 to count this (end) node
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : 1;
            });
            var root = testTreeAltChildren;
            var res = TreeLib.reverseWalk(root, cb, function(item) {
                return item.items;
            });
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, [1, 1]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, [1, 1]]);
            expect(cb.calls[6].args).toEqual([root, 0, [2, 2]]);
            expect(res).toEqual(4);
        });
    });

    describe('reversewalk counting letters', function() {
        it('should walk backwards while counting all items no root', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or the number of letters
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : node.name.length;
            });
            var res = TreeLib.reverseWalk(testTreeNoRoot, cb);
            expect(cb.calls.length).toBe(6);
            expect(cb.calls[0].args).toEqual([foobar, 1, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 1, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 0, [6, 6]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 1, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 1, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 0, [6, 6]]);
            expect(res).toEqual([12, 12]);
        });

        it('should walk backwards while counting all items with root', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or the number of letters
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : node.name.length;
            });
            var root = testTreeWithRoot;
            var res = TreeLib.reverseWalk(root, cb);
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([foo, 1, [6, 6]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([qux, 1, [6, 6]]);
            expect(cb.calls[6].args).toEqual([root, 0, [12, 12]]);
            expect(res).toEqual(24);
        });

        it('should walk backwards while counting all items with children param', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or the number of letters
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : node.name.length;
            });
            var root = testTreeAltChildren;
            var res = TreeLib.reverseWalk(root, cb, 'items');
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, [6, 6]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, [6, 6]]);
            expect(cb.calls[6].args).toEqual([root, 0, [12, 12]]);
            expect(res).toEqual(24);
        });

        it('should walk backwards while counting all items with children function', function() {
            var cb = jasmine.createSpy('cb').andCallFake(function(node, depth, res) {
                //return the sum of the values in res, or the number of letters
                return res ? res.reduce(function(p, r) {
                    return p + r;
                }) : node.name.length;
            });
            var root = testTreeAltChildren;
            var res = TreeLib.reverseWalk(root, cb, function(item) {
                return item.items;
            });
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([foobar, 2, undefined]);
            expect(cb.calls[1].args).toEqual([foobaz, 2, undefined]);
            expect(cb.calls[2].args).toEqual([fooAlt, 1, [6, 6]]);
            expect(cb.calls[3].args).toEqual([quxmoo, 2, undefined]);
            expect(cb.calls[4].args).toEqual([quxfox, 2, undefined]);
            expect(cb.calls[5].args).toEqual([quxAlt, 1, [6, 6]]);
            expect(cb.calls[6].args).toEqual([root, 0, [12, 12]]);
            expect(res).toEqual(24);
        });
    });

    describe('flatten', function() {
        it('should flatten a tree without root', function() {
            var res = TreeLib.flatten(testTreeNoRoot);
            expect(res[0]).toEqual(foo);
            expect(res[1]).toEqual(foobar);
            expect(res[2]).toEqual(foobaz);
            expect(res[3]).toEqual(qux);
            expect(res[4]).toEqual(quxmoo);
            expect(res[5]).toEqual(quxfox);
        });
        it('should flatten a tree with root', function() {
            var res = TreeLib.flatten(testTreeWithRoot);
            expect(res[0]).toEqual(testTreeWithRoot);
            expect(res[1]).toEqual(foo);
            expect(res[2]).toEqual(foobar);
            expect(res[3]).toEqual(foobaz);
            expect(res[4]).toEqual(qux);
            expect(res[5]).toEqual(quxmoo);
            expect(res[6]).toEqual(quxfox);
        });
        it('should flatten a tree with children param', function() {
            var res = TreeLib.flatten(testTreeAltChildren, 'items');
            expect(res[0]).toEqual(testTreeAltChildren);
            expect(res[1]).toEqual(fooAlt);
            expect(res[2]).toEqual(foobar);
            expect(res[3]).toEqual(foobaz);
            expect(res[4]).toEqual(quxAlt);
            expect(res[5]).toEqual(quxmoo);
            expect(res[6]).toEqual(quxfox);
        });
        it('should flatten a tree with children function', function() {
            var res = TreeLib.flatten(testTreeAltChildren, function(item) {
                return item.items;
            });
            expect(res[0]).toEqual(testTreeAltChildren);
            expect(res[1]).toEqual(fooAlt);
            expect(res[2]).toEqual(foobar);
            expect(res[3]).toEqual(foobaz);
            expect(res[4]).toEqual(quxAlt);
            expect(res[5]).toEqual(quxmoo);
            expect(res[6]).toEqual(quxfox);
        });
    });

    describe('levels', function() {
        it('should get the levels of a tree without root', function() {
            var res = TreeLib.levels(testTreeNoRoot);
            expect(res[0]).toEqual([foo, qux]);
            expect(res[1]).toEqual([foobar, foobaz, quxmoo, quxfox]);
        });
        it('should get the levels of a tree with root', function() {
            var root = testTreeWithRoot;
            var res = TreeLib.levels(root);
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([foo, qux]);
            expect(res[2]).toEqual([foobar, foobaz, quxmoo, quxfox]);
        });
        it('should get the levels of a tree with children param', function() {
            var root = testTreeAltChildren;
            var res = TreeLib.levels(root, 'items');
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([fooAlt, quxAlt]);
            expect(res[2]).toEqual([foobar, foobaz, quxmoo, quxfox]);
        });
        it('should get the levels of a tree with children function', function() {
            var root = testTreeAltChildren;
            var res = TreeLib.levels(root, function(item) {
                return item.items;
            });
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([fooAlt, quxAlt]);
            expect(res[2]).toEqual([foobar, foobaz, quxmoo, quxfox]);
        });
    });

    describe('paths', function() {
        it('should get the paths of a tree without root', function() {
            var res = TreeLib.paths(testTreeNoRoot);
            expect(res[0]).toEqual([foo]);
            expect(res[1]).toEqual([foo, foobar]);
            expect(res[2]).toEqual([foo, foobaz]);
            expect(res[3]).toEqual([qux]);
            expect(res[4]).toEqual([qux, quxmoo]);
            expect(res[5]).toEqual([qux, quxfox]);
        });
        it('should get the paths of a tree with root', function() {
            var root = testTreeWithRoot;
            var res = TreeLib.paths(root);
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([root, foo]);
            expect(res[2]).toEqual([root, foo, foobar]);
            expect(res[3]).toEqual([root, foo, foobaz]);
            expect(res[4]).toEqual([root, qux]);
            expect(res[5]).toEqual([root, qux, quxmoo]);
            expect(res[6]).toEqual([root, qux, quxfox]);
        });
        it('should get the paths of a tree with children param', function() {
            var root = testTreeAltChildren;
            var res = TreeLib.paths(root, 'items');
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([root, fooAlt]);
            expect(res[2]).toEqual([root, fooAlt, foobar]);
            expect(res[3]).toEqual([root, fooAlt, foobaz]);
            expect(res[4]).toEqual([root, quxAlt]);
            expect(res[5]).toEqual([root, quxAlt, quxmoo]);
            expect(res[6]).toEqual([root, quxAlt, quxfox]);
        });
        it('should get the paths of a tree with children function', function() {
            var root = testTreeAltChildren;
            var res = TreeLib.paths(root, function(item) {
                return item.items;
            });
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([root, fooAlt]);
            expect(res[2]).toEqual([root, fooAlt, foobar]);
            expect(res[3]).toEqual([root, fooAlt, foobaz]);
            expect(res[4]).toEqual([root, quxAlt]);
            expect(res[5]).toEqual([root, quxAlt, quxmoo]);
            expect(res[6]).toEqual([root, quxAlt, quxfox]);
        });
    });

    describe('wrapper object', function() {
        it('should yield the same for walk', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            var list1 = [], list2 = [];
            tree.walk(function(node){list1.push(node)});
            TreeLib.walk(testTreeWithRoot,function(node){list2.push(node)});
            expect(list1).toEqual(list2);
        });
        it('should yield the same for walk', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            var list1 = [], list2 = [];
            tree.walk(function(node){list1.push(node)});
            TreeLib.walk(testTreeNoRoot,function(node){list2.push(node)});
            expect(list1).toEqual(list2);
        });
        it('should yield the same for reverseWalk', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            var list1 = [], list2 = [];
            tree.reverseWalk(function(node){list1.push(node)});
            TreeLib.reverseWalk(testTreeWithRoot,function(node){list2.push(node)});
            expect(list1).toEqual(list2);
        });
        it('should yield the same for reverseWalk', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            var list1 = [], list2 = [];
            tree.reverseWalk(function(node){list1.push(node)});
            TreeLib.reverseWalk(testTreeNoRoot,function(node){list2.push(node)});
            expect(list1).toEqual(list2);
        });
        it('should yield the same for flatten', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.flatten()).toEqual(TreeLib.flatten(testTreeWithRoot));
        });
        it('should yield the same for flatten', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.flatten()).toEqual(TreeLib.flatten(testTreeNoRoot));
        });
        it('should yield the same for paths', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.paths()).toEqual(TreeLib.paths(testTreeWithRoot));
        });
        it('should yield the same for paths', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.paths()).toEqual(TreeLib.paths(testTreeNoRoot));
        });
        it('should yield the same for levels', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.levels()).toEqual(TreeLib.levels(testTreeWithRoot));
        });
        it('should yield the same for levels', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.levels()).toEqual(TreeLib.levels(testTreeNoRoot));
        });

        function filterFN(node) {
            return node.name === 'quxmoo';
        }
        it('should yield the same for filter', function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.filter(filterFN)).toEqual(TreeLib.filter(testTreeWithRoot, filterFN));
        });
        it('should yield the same for filter', function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.filter(filterFN)).toEqual(TreeLib.filter(testTreeNoRoot, filterFN));
        });
    });

    describe('copy', function() {
        it('should be equal but not the same with root', function() {
            var copy = TreeLib.copy(testTreeWithRoot);
            expect(copy).toEqual(testTreeWithRoot);
            expect(copy).not.toBe(testTreeWithRoot);
        });
        it('should be equal but not the same', function() {
            var copy = TreeLib.copy(testTreeNoRoot);
            expect(copy).toEqual(testTreeNoRoot);
            expect(copy).not.toBe(testTreeNoRoot);
        });
    });

    describe('filter', function() {
        it('should filter nodes that do not match and do not have children with root', function() {
            var filtered = TreeLib.filter(testTreeWithRoot, function(node) {
                return node.name === 'quxmoo';
            });
            expect(filtered).toEqual({
                name: 'root',
                children: [{
                        name: 'qux',
                        children: [{
                                name: 'quxmoo'
                            }
                        ]
                    }
                ]
            });
        });

        it('should filter nodes that do not match and do not have children with children param', function() {
            var filtered = TreeLib.filter(testTreeAltChildren, function(node) {
                return node.name === 'quxmoo';
            }, 'items');
            expect(filtered).toEqual({
                name: 'root',
                items: [{
                        name: 'qux',
                        items: [{
                                name: 'quxmoo'
                            }
                        ]
                    }
                ]
            });
        });

        it('should filter nodes that do not match and do not have children with children function', function() {
            var filtered = TreeLib.filter(testTreeAltChildren, function(node) {
                return node.name === 'quxmoo';
            }, function(item) {
                return item.items;
            });
            expect(filtered).toEqual({
                name: 'root',
                items: [{
                        name: 'qux',
                        items: [{
                                name: 'quxmoo'
                            }
                        ]
                    }
                ]
            });
        });

        it('should filter nodes that do not match and do not have children', function() {
            var filtered = TreeLib.filter(testTreeNoRoot, function(node) {
                return node.name === 'quxmoo';
            });
            expect(filtered).toEqual([{
                    name: 'qux',
                    children: [{
                            name: 'quxmoo'
                        }
                    ]
                }
            ]);
        });
    });
});