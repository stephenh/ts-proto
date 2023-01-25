import { assert } from 'console';
import { Child, Simple, Visitor } from './simple';

class StringTreeBuilder implements Visitor {
    simpleTree = "";
    level = 0;
    buildTree(obj: Simple): string {
        this.simpleTree = "";
        obj.visit(this);
        return this.simpleTree;
    }

    visitSimple(obj: Simple): void {
        this.simpleTree = this.simpleTree + obj.name + "\r\n";
        for (const child of obj.child) {
            child.visit(this);
        }
    }
    visitChild(obj: Child): void {
        this.level = this.level + 1;
        let padding = " ".repeat(this.level * 2);
        assert(padding.length == this.level * 2);
        this.simpleTree = this.simpleTree + padding + obj.name + "\r\n";
        for (const child of obj.child) {
            child.visit(this);
        }
        this.level = this.level - 1;
    }
}

describe('simple-visitorPattern', () => {
    it('can create a Visitor class', () => {
        let parent = Simple.create();
        parent.name = "Granny";
        let child = Child.create();
        child.name = "Oldest child";
        parent.child.push(child);
        let grandChild = Child.create();
        grandChild.name = "Grand child";
        child.child.push(grandChild);
        child = Child.create();
        child.name = "Second child";
        parent.child.push(child);
        grandChild = Child.create();
        grandChild.name = "Second grandchild";
        child.child.push(grandChild);
        let treeBuilder = new StringTreeBuilder();
        let tree = treeBuilder.buildTree(parent);
        let expectedTree = "Granny\r\n  Oldest child\r\n    Grand child\r\n  Second child\r\n    Second grandchild\r\n";
        expect(tree).toEqual(expectedTree);
    });
});
