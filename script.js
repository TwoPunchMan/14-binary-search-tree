const Tree = require('./Tree');
const Node = require('./Node');

// basic script to run for testing tree functionality

const generateRandomArray = function(arrayLength=7, maxNumber=100) {
    let randomArray = [];
    for (let i = 0; i < arrayLength; i++) {
        randomArray.push(Math.floor(Math.random() * maxNumber));
    }

    return randomArray;
}

let treeNumbers = generateRandomArray(15);
let tree = new Tree(treeNumbers);

tree.buildTree(treeNumbers);                // 1. Create BST
console.log(tree.isBalanced());             // 2. Confirm is tree balanced
console.log(tree.levelOrder());             // 3. print level, pre, in, post orders
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());

tree.insert(200);                           // 4. unbalance tree by adding numbers > 100
tree.insert(101);
tree.insert(300);
console.log(tree.isBalanced());             // 5. confirm tree is unbalanced
tree.rebalance();                           // 6. rebalance tree
console.log(tree.isBalanced());             // 7. confirm tree is balanced

console.log(tree.levelOrder());             // 8. print level, pre, in, post orders
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
