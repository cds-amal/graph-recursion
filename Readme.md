# Recursion tree builder

Proof of concept to generate the call tree of some
simple recursive algorithms. Fibonacci, permute.

## Example graphs
### Permutation of string 'abc'
![Permutation of string "ABC"](./docs/permute-abc.png "Permute('abc')")

### Fibonacci 
![Fibonacci ()](./docs/fib-6.png "Fib(6)")


## Todos
* consolidate edge and vertex API.
* include a wrapper for algorithms to maintain state of parent - child relationship
* include some other prefix/suffix type recursive problems
* present choice to pick algorithm to expore
* present better to UI to save generated graph. right-click & save is lame.


## Dependencies
* node - current version of node
* webpack 2.0+
* [cytoscape](http://js.cytoscape.org/) - a graph tool


## License
[Apache License, Version 2.0](LICENSE)