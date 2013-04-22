describe('test',function() {
    //set up some named nodes
    var foobar = {name:'foobar'};
    var foobaz = {name:'foobaz'};
    var quxmoo = {name:'quxmoo'};
    var quxfox = {name:'quxfox'};
    var foo = {name: 'foo',children: [foobar,foobaz]};
    var qux = {name: 'qux',children: [quxmoo,quxfox]};
    var testTreeNoRoot = [foo,qux];
    var testTreeWithRoot = {name: 'root',children: testTreeNoRoot};

    it('should pass',function() {
        expect(true).toBe(true);
    });

    describe('walk',function() {
        it('should walk the tree without root',function() {
            var cb = jasmine.createSpy('cb');
            TreeLib.walk(testTreeNoRoot,cb);
            expect(cb.calls.length).toBe(6);
            expect(cb.calls[0].args).toEqual([foo,0,[foo]]);
            expect(cb.calls[1].args).toEqual([foobar,1,[foo,foobar]]);
            expect(cb.calls[2].args).toEqual([foobaz,1,[foo,foobaz]]);
            expect(cb.calls[3].args).toEqual([qux,0,[qux]]);
            expect(cb.calls[4].args).toEqual([quxmoo,1,[qux,quxmoo]]);
            expect(cb.calls[5].args).toEqual([quxfox,1,[qux,quxfox]]);
        });

        it('should walk the tree with root',function() {
            var cb = jasmine.createSpy('cb');
            var root = testTreeWithRoot;
            TreeLib.walk(root,cb);
            expect(cb.calls.length).toBe(7);
            expect(cb.calls[0].args).toEqual([root,0,[root]]);
            expect(cb.calls[1].args).toEqual([foo,1,[root,foo]]);
            expect(cb.calls[2].args).toEqual([foobar,2,[root,foo,foobar]]);
            expect(cb.calls[3].args).toEqual([foobaz,2,[root,foo,foobaz]]);
            expect(cb.calls[4].args).toEqual([qux,1,[root,qux]]);
            expect(cb.calls[5].args).toEqual([quxmoo,2,[root,qux,quxmoo]]);
            expect(cb.calls[6].args).toEqual([quxfox,2,[root,qux,quxfox]]);
        });
    });

    describe('flatten',function() {
        it('should flatten a tree without root',function() {
            var res = TreeLib.flatten(testTreeNoRoot);
            expect(res[0]).toEqual(foo);
            expect(res[1]).toEqual(foobar);
            expect(res[2]).toEqual(foobaz);
            expect(res[3]).toEqual(qux);
            expect(res[4]).toEqual(quxmoo);
            expect(res[5]).toEqual(quxfox);
        });
        it('should flatten a tree with root',function() {
            var res = TreeLib.flatten(testTreeWithRoot);
            expect(res[0]).toEqual(testTreeWithRoot);
            expect(res[1]).toEqual(foo);
            expect(res[2]).toEqual(foobar);
            expect(res[3]).toEqual(foobaz);
            expect(res[4]).toEqual(qux);
            expect(res[5]).toEqual(quxmoo);
            expect(res[6]).toEqual(quxfox);
        });
    });

    describe('paths',function() {
        it('should get the paths of a tree without root',function() {
            var res = TreeLib.paths(testTreeNoRoot);
            expect(res[0]).toEqual([foo]);
            expect(res[1]).toEqual([foo,foobar]);
            expect(res[2]).toEqual([foo,foobaz]);
            expect(res[3]).toEqual([qux]);
            expect(res[4]).toEqual([qux,quxmoo]);
            expect(res[5]).toEqual([qux,quxfox]);
        });
        it('should get the paths of a tree with root',function() {
            var root = testTreeWithRoot;
            var res = TreeLib.paths(root);
            expect(res[0]).toEqual([root]);
            expect(res[1]).toEqual([root,foo]);
            expect(res[2]).toEqual([root,foo,foobar]);
            expect(res[3]).toEqual([root,foo,foobaz]);
            expect(res[4]).toEqual([root,qux]);
            expect(res[5]).toEqual([root,qux,quxmoo]);
            expect(res[6]).toEqual([root,qux,quxfox]);
        });
    });

    describe('wrapper object',function() {
        it('should yield the same for flatten',function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.flatten()).toEqual(TreeLib.flatten(testTreeWithRoot));
        });
        it('should yield the same for flatten',function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.flatten()).toEqual(TreeLib.flatten(testTreeNoRoot));
        });
        it('should yield the same for paths',function() {
            var tree = new TreeLib.Tree(testTreeWithRoot);
            expect(tree.paths()).toEqual(TreeLib.paths(testTreeWithRoot));
        });
        it('should yield the same for paths',function() {
            var tree = new TreeLib.Tree(testTreeNoRoot);
            expect(tree.paths()).toEqual(TreeLib.paths(testTreeNoRoot));
        });
    });
});