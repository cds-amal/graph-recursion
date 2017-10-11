/* eslint no-unused-vars: 0 */  // --> OFF
const fs = require('fs');
const path = require('path')

const makeCounter = () => ({
  id: 1,
  next() { return this.id++ }
})

const count = makeCounter()
const order = makeCounter()

const makeVertex = (id, label) => ({
  order: order.next(),
  data: { id, label },
})

const makeEdge = (source, target) => ({
  order: order.next() + 1000,
  data: {
    id: '' + count.next(),
    source: source.data.id,
    target: target.data.id
  }
})

function fib(n, parent, elements) {
  let v, targ, edge
  if (n < 2){
    v = `${n}-${count.next()}`
    let lastFib = makeVertex(v, `Fib(${n})`)
    edge = makeEdge(parent, lastFib)
    elements.push(lastFib)
    elements.push(edge)

    v = `${n}-${count.next()}`
    targ = makeVertex(v, n)
    edge = makeEdge(lastFib, targ)
    elements.push(targ)
    elements.push(edge)
    return n
  }

  v = `${n}-${count.next()}`
  targ = makeVertex(v, `Fib(${n})`)
  edge = makeEdge(parent, targ)
  elements.push(targ)
  elements.push(edge)
  return fib(n - 1, targ, elements) + fib(n - 2, targ, elements)
}

let N = 6
let root = makeVertex(N, `Fib(${N})`)
,   elements = []
,   f = fib(N, root, elements)

elements.sort((a, b) => a.order - b.order)
elements = elements.map(e => ({data: e.data}))

let dest = path.join(__dirname, 'src', 'fib-data.js')
let json = `${JSON.stringify(elements, undefined, 2)}`
fs.writeFileSync(dest, 'export default `' + json + '`\n' )
