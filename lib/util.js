const fs = require('fs');
const path = require('path')

const makeCounter = () => ({
  id: 1,
  next() { return this.id++ }
})

const order = makeCounter()

const makeVertex = (id, label, elements) => {
  const obj = {
    order: order.next(),
    data: { id, label},
  }
  elements.push(obj)
  return obj
}

const makeEdge = (source, target) => ({
  order: order.next() + 1000,
  data: {
    id: '' + order.next(),
    source: source.data.id,
    target: target.data.id,
  }
})

const connect = (parent, child, elements) => {
  let edge = makeEdge(parent, child)
  elements.push(edge)
  return edge
}

const saveNodes = (elements, ...args) => {
  const dest = path.join(...args)
  elements.sort((a, b) => a.order - b.order)
  elements = elements.map(e => ({data: e.data}))

  let json = `${JSON.stringify(elements, undefined, 2)}`
  fs.writeFileSync(dest, 'export default `' + json + '`\n' )
  console.log(`data file ${dest} created.`)
}

module.exports = {
  makeVertex,
  saveNodes,
  order,
  connect
}
