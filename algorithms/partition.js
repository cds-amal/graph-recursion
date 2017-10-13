/* eslint no-unused-vars: 0 */  // --> OFF
const {
  makeVertex,
  saveNodes,
  order,
  connect
 } = require('../lib/util')

 const makeLabel = (N, target) => `Part(${N}, ${target})`
 const makeId = () => `${order.next()}`

function partition(N, target = N, set = [], parent = null, elements = []) {
  let targ = makeVertex(makeId(), makeLabel(N, target), elements)
  if (parent) connect(parent, targ, elements)
  if (!N) {
    let solution = makeVertex(makeId(), set.join(','), elements)
    ,   edge     = connect(targ, solution, elements)

    solution.data.bg = 'powderblue'
    edge.data.lineStyle = 'dotted'
    // console.log(set)
    return
  }

  for (let i = Math.min(N, target); i > 0; i--) {
      partition(N - i, i, set.concat(i), targ, elements)
  }
}

const elements = []
,     N = 9
partition(N, N, [], null, elements)
saveNodes(elements, __dirname, '..', 'src', 'data', 'partition.js')
