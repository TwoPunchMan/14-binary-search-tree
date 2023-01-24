# 14-binary-search-tree
The Odin Project - Binary Search Tree - CS Theory

Functionality:

* `buildTree(array)` takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree
* `insert(value)` and `delete(value)` accepts a value to insert/delete
* `find(value)` function which accepts a value and returns the node with the given value
* `levelOrder()` should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. The method should return an array of values if no function is given. (Breadth-First-Search)
* `inorder(), preorder(), postorder()` Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
* `height()` accepts a node and returns its height
* `depth()` accepts a node and returns its depth
* `isBalanced()` checks if the tree is balanced
* `rebalance()` rebalances an unbalanced tree
