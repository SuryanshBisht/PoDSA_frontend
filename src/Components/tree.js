import React from 'react'
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
import './tree.css'

let nodesData;
let edgeData;

const myGraph = () => {
  let data = {
    // nodes: nodesData,
    // nodes : {props.inputData.}
      nodes: [ 
          {id:"n1", label:"Alice"}, 
          {id:"n2", label:"Rabbit"},
          {id:"n3", label:"Popli"}, 
          {id:"n4", label:"Shreya"},
        ],
  
      // edges: edgeData
      // edges:{
      //   {id:"e2",source:"n3",target:"n4",label:"MainKahanHun"}]
      // }
      edges:[
        {id:"e1",source:"n1",target:"n2",label:"SEES"},
        {id:"e2",source:"n3",target:"n4",label:"MainKahanHun"}]
      }
};

const Tree = () => {
  return (
    <>
      <Sigma graph={myGraph()} settings={{renderEdgeLabels: true, drawEdges: true, clone: false}}>
      <RelativeSize initialSize={13}/>
      <RandomizeNodePositions/>
      </Sigma>
    </>
  )
}

export default Tree;