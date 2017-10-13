/* eslint no-unused-vars: 0 */  // --> OFF
const {
  makeVertex,
  saveNodes,
  order,
  connect
 } = require('../lib/util')

const fibLabel = n => `Fib(${n})`
const fibId = n => `${n}-${order.next()}`


function fib(n, parent, elements) {
  let targ
  if (n < 2){
    let lastFib = makeVertex(fibId(n), fibLabel(n), elements)
    connect(parent, lastFib, elements)

    let solution = makeVertex(fibId(n), '' + n, elements)
    ,   edge     = connect(lastFib, solution, elements)

    solution.data.bg = 'powderblue'
    solution.data.textValign = 'center'
    edge.data.lineStyle = 'dotted'

    return n
  }

  targ = makeVertex(fibId(n), fibLabel(n), elements)
  if (parent) connect(parent, targ, elements)

  return fib(n - 1, targ, elements) + fib(n - 2, targ, elements)
}

let N = 4
,   elements = []
,   f = fib(N, null, elements)
saveNodes(elements, __dirname, '..', 'src', 'data', 'fibonacci.js')

