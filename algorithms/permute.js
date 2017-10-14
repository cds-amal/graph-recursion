/* eslint no-unused-vars: 0 */  // --> OFF

const {
  makeVertex,
  saveNodes,
  order,
  connect
 } = require('../lib/util')

 const label = (pre, suf) => `${pre}:${suf}`

function _permute(pre, suf, result, elements, parent) {
  let name = label(pre, suf)
  let targ = makeVertex(name, name, elements)
  if (parent) connect(parent, targ, elements)

  if (!suf) {
    let solution = makeVertex(pre, pre, elements)
    ,   edge     = connect(targ, solution, elements)
    solution.data.bg = 'powderblue'
    solution.data.textValign = 'center'
    edge.data.lineStyle = 'dotted'
    result.push(pre)
    return
  }

  // this is where we examine our choices.
  // in this case, for each letter in the
  // suffix, we want to append it to the prefix.
  //
  for (let i = 0; i < suf.length; i++) {

    // Make the choice with the current letter and
    // remove the letter from the suffix so we
    // chip away and approach the base condition 
    // of an empty suffix.
    //
    _permute(
      pre + suf[i],                       // add letter and 
      suf.slice(0, i) + suf.slice(i + 1), // remove it from choices
      result,                             // keep track of results
      elements,
      makeVertex(name, name, elements)
    )
  }
}

function permute(str) {
  let result   = []
  ,   elements = []
  _permute('', str, result, elements, null)

  saveNodes(elements, __dirname, '..', 'src', 'data', 'permute.js')
  return result
}

let ps = permute('abc')

// ,   num
// for (let i = 0; i < ps.length; i++) {
//   num = ('00000' + (i + 1)).slice(-5)
//   console.log(`${num}: ${ps[i]}`)
// }
