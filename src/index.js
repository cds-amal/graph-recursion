/* eslint no-unused-vars: 0 */  // --> OFF

import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre';

import data from './data'
const elements = JSON.parse(data[process.env.GRAPH])

cytoscape.use( dagre );

var layoutDefaults = {
  // dagre algo options, uses default value on undefined
  nodeSep: undefined, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: undefined, // the separation between adjacent nodes in the same rank
  rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
  ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

  // general layout options
  fit: true, // whether to fit to viewport
  padding: 30, // fit padding
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: undefined, // whether labels should be included in determining the space used by a node (default true)
  animate: false, // whether to transition the node positions
  animateFilter: function( node, i ){ return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform: function( node, pos ){ return pos; }, // a function that applies a transform to the final node position
  ready: function(){}, // on layoutready
  stop: function(){} // on layoutstop
};

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements,
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': ele => ele.data('bg') || '#999',
        label: ele =>  ele.data('label') || '-',
        'text-opacity': 0.5,
        'text-valign': ele => ele.data('textValign') || 'top',
        'text-halign': 'center',
      }
    },

    {
      selector: 'edge',
      style: {
        width: 4,
        'line-style': ele => ele.data('lineStyle') || 'solid',
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'dagre',
    layoutDefaults
  }
});

const sucker = process.env.GRAPH;
cy.ready(event => {
  console.log('ready event called!')
  console.log(sucker)
  console.log('process.env', process.env)

  var png64 = cy.png({scale: 5});
  $('#export').attr('src', png64);
})
