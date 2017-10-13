/* eslint no-unused-vars: 0 */  // --> OFF
const {
  makeVertex,
  saveNodes,
  order,
  connect
 } = require('../lib/util')

const label = (pre, suf) => `${pre}:${suf}`

function _combination(pre, suf, elements, parent = null) {
  let name = label(pre, suf)
  let targ = makeVertex(name, name, elements)
  if (parent) connect(parent, targ, elements)

  if (!suf) {
    let solution = makeVertex(pre, pre, elements)
    ,   edge     = connect(targ, solution, elements)
    solution.data.bg = 'powderblue'
    solution.data.textValign = 'center'
    edge.data.lineStyle = 'dotted'

    // console.log(pre)
    return
  }

  // with
  _combination(pre + suf[0], suf.slice(1), elements, targ)

  // without
  _combination(pre, suf.slice(1), elements, targ)
}

function combination(str) {
  const elements = []
  _combination('', str, elements)
  saveNodes(elements, __dirname, '..', 'src', 'data', 'combination.js')
}

combination('abcd')
