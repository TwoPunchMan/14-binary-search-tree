const Node = require('./Node');

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class Tree {
    constructor(arr) {
        let sortedArray = [...new Set([...arr])].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(arr) {                    // recursive tree building
        let startIndex = 0;
        let endIndex = arr.length - 1;

        if (startIndex > endIndex) {
            return null;
        }

        let mid = Math.floor((startIndex + endIndex) / 2);
        let node = new Node(arr[mid]);
        let leftArr = arr.slice(0, mid);
        let rightArr = arr.slice(mid + 1);

        node.left = this.buildTree(leftArr);
        node.right = this.buildTree(rightArr);

        return node;
    }

    insert(value, node=this.root) {                   // recursive insertion
        if (node == null) {
            return new Node(value);
        }

        if (value < node.data) {                // go left
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {         // go right
            node.right = this.insert(value, node.right);
        }

        return node;                    // Time complexity: O (log n)
    }

    delete(value, node=this.root) {
        if (node == null) {             // basecase
            return node;
        }
        // traverse thru the tree recursion
        if (value < node.data) {            // go left
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {     // go right
            node.right = this.delete(value, node.right);
        } else {                        // found node for deletion
            // 0 or 1 child
            if (node.left == null) {
                return node.right;
            } else if (node.right == null) {
                return node.left;
            // 2 children
            } else {
                node.right = this.getSuccessorNode(node.right, node);
                return node;
            }
        }
    }

    getSuccessorNode(node, nodeForDelete) {     // helper for delete function
        if (node.left) {                        // find leftmost node of right subtree
            node.left = this.getSuccessorNode(node.left, nodeForDelete);
        } else {                                // found it and replace deleted node with successor value
            nodeForDelete.data = node.data;
            return node.right;
        }
    }

    find(value, node=this.root) {
        if (node == null || node.data == value) {   // found node or node DNE / basecase
            return node;
        }

        if (value < node.data) {            // traverse left or right until done
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(someCallback) {                  // Queue iteration implementation
        if (this.root == null) {        // if no tree
            return [];
        }

        let nodeQueue = [this.root];            // First-In-First-Out : FIFO
        let nodeValuesBFSList = [];             // Breadth-First-Search. Level by level
                                                // across left-to-right
        while (nodeQueue.length != 0) {         // not straight down
            let currentNode = nodeQueue.shift();

            if (currentNode.left != null) {     // left
                nodeQueue.push(currentNode.left);
            }
            if (currentNode.right != null) {    // right
                nodeQueue.push(currentNode.right);
            }

            if (someCallback) {
                someCallback(currentNode);
            } else {
                nodeValuesBFSList.push(currentNode.data);
            }
        }

        return nodeValuesBFSList;
    }

    preorder(someCallback, node=this.root, nodeValuesList=[]) {
        if (node == null) return;

        if (someCallback) {
            someCallback(node)
        } else {
            nodeValuesList.push(node.data);
        }

        this.preorder(someCallback, node.left, nodeValuesList);
        this.preorder(someCallback, node.right, nodeValuesList);

        return nodeValuesList;
    }

    inorder(someCallback, node=this.root, nodeValuesList=[]) {
        if (node == null) return;

        this.inorder(someCallback, node.left, nodeValuesList);
        if (someCallback) {
            someCallback(node)
        } else {
            nodeValuesList.push(node.data);
        }
        this.inorder(someCallback, node.right, nodeValuesList);

        return nodeValuesList;
    }

    postorder(someCallback, node=this.root, nodeValuesList=[]) {
        if (node == null) return;

        this.postorder(someCallback, node.left, nodeValuesList);
        this.postorder(someCallback, node.right, nodeValuesList);

        if (someCallback) {
            someCallback(node)
        } else {
            nodeValuesList.push(node.data);
        }

        return nodeValuesList;
    }

    height(node=this.root) {                    // from down to up
        if (node == null) {
            return -1;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node=this.root, nodeValue, depth=0) { // from up to down
        if (node == null) {                     // node not found
            return -1;
        } else if (node.data == nodeValue) {
            return depth;
        }

        if (nodeValue > node.data) {
            return this.depth(node.right, nodeValue, depth + 1);
        } else {
            return this.depth(node.left, nodeValue, depth + 1);
        }
    }

    isBalanced(node=this.root) {
        if (node == null) {
            return true;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        let absDiff = Math.abs(leftHeight - rightHeight);

        if (absDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)) {
            return true;
        }

        return false;
    }

    rebalance() {
        let newArray = this.levelOrder();
        this.root = this.buildTree(newArray);
    }
}

module.exports = Tree;
