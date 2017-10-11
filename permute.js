/* eslint no-unused-vars: 0 */  // --> OFF
const fs = require('fs');
const path = require('path')

const makeCounter = () => ({
  id: 1,
  next() { return this.id++ }
})

const counter = makeCounter()
const order = makeCounter()

const makeVertex = (name) => ({
  order: order.next(),
  data: { id: name, label: name },
})

const makeEdge = (source, target) => ({
  order: order.next() + 1000,
  data: {
    id: '' + counter.next(),
    source: source.data.id,
    target: target.data.id
  }
})

function _permute(pre, suf, result, depth, elements, parent) {
  let name = `${pre}:${suf}`

  let targ = makeVertex(name)
  let edge = makeEdge(parent, targ)
  elements.push(targ)
  elements.push(edge)

  if (!suf) {
    let solution = makeVertex(pre)
    edge = makeEdge(targ, solution)
    elements.push(solution)
    elements.push(edge)
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
    _permute( // permute with this character
      pre + suf[i],                       // add letter and 
      suf.slice(0, i) + suf.slice(i + 1), // remove it from choices
      result      // keep track of results
      , depth + 1 // recursive depth
      , elements,
      makeVertex(`${pre}:${suf}`)
    )
  }
}

function permute(str) {
  let result   = []
  ,   elements = []
  ,   root = makeVertex(`:${str}`)
  _permute('', str, result, 0, elements, root)
  elements.sort((a, b) => a.order - b.order)
  elements = elements.map(e => ({data: e.data}))
  // console.log(JSON.stringify(elements, undefined, 2))

  let dest = path.join(__dirname, 'src', 'permute-data.js')
  let json = `${JSON.stringify(elements, undefined, 2)}`
  fs.writeFileSync(dest, 'export default `' + json + '`\n' )  
  return result
}

let ps = permute('abcd')
,   num

// for (let i = 0; i < ps.length; i++) {
//   num = ('00000' + (i+1)).slice(-5)
// }
