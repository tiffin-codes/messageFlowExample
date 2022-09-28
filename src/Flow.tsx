import { useCallback } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "react-flow-renderer";

const initialNodes: Node[] = [
  {
    id: "initialContext",
    type: "input",
    data: {
      label: (
        <>
          When user <strong>signs up for campaign Name</strong>
        </>
      )
    },
    position: { x: 250, y: 0 },
    style: {
      background: "#D6D5E6",
      color: "#344054",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "welcomeMessage",
    data: {
      label: (
        <>
          <strong>Welcome text</strong>
        </>
      )
    },
    position: { x: 250, y: 100 },
    style: { width: 180 }
  },
  {
    id: "logicCheckForReceipt",
    data: {
      label: (
        <>
          <strong>Did User submit?</strong>
        </>
      )
    },
    position: { x: 250, y: 200 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "imageReviewHumanRequired",
    position: { x: 250, y: 300 },
    style: { width: 180 },
    data: {
      label: "Receipt confirmation message"
    }
  },

  {
    id: "logicCheckValidReceipt",
    data: {
      label: "Is the receipt valid?"
    },
    position: { x: 250, y: 400 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "payoutMessage",
    type: "output",
    data: {
      label: (
        <>
          <strong> Success - payment on the way</strong>
        </>
      )
    },
    position: { x: 250, y: 500 },
    style: { width: 180 }
  },
  {
    id: "reminder1",
    data: { label: "reminder 1" },
    position: { x: 500, y: 350 },
    style: { width: 180 }
  },
  {
    id: "reminder2",
    data: { label: "reminder 2" },
    position: { x: 500, y: 450 },
    style: { width: 180 }
  },
  {
    id: "reminder3",
    data: { label: "reminder 3" },
    position: { x: 500, y: 550 },
    style: { width: 180 }
  },
  {
    id: "reengagement",
    type: "output",
    data: { label: "reengagement" },
    position: { x: 500, y: 650 },
    style: { width: 180 }
  },
  {
    id: "2dayTimer",
    data: {
      label: "Wait 2 days"
    },
    position: { x: 500, y: 300 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "5dayTimer",
    data: {
      label: "Wait 5 days"
    },
    position: { x: 500, y: 400 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "7dayTimer",
    data: {
      label: "Wait 7 days"
    },
    position: { x: 500, y: 500 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "14dayTimer",
    data: {
      label: "Wait 14 days"
    },
    position: { x: 500, y: 600 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "initialContext",
    target: "welcomeMessage",
    animated: false
  },
  { id: "e1-3", source: "welcomeMessage", target: "logicCheckForReceipt" },
  {
    id: "e1-3",
    source: "logicCheckForReceipt",
    target: "imageReviewHumanRequired",
    label: "yes"
  },
  {
    id: "e1-4",
    source: "logicCheckForReceipt",
    target: "2dayTimer",
    label: "no",
    type: "step",
    style: { stroke: "#000" },
    animated: true,
    labelStyle: { fill: "#000", fontWeight: 700 }
  },
  {
    id: "2day-reminder1",
    source: "2dayTimer",
    target: "reminder1",
    type: "step"
  },
  {
    id: "reminder1-5day",
    source: "reminder1",
    target: "5dayTimer"
  },
  {
    id: "5day-reminder2",
    source: "5dayTimer",
    target: "reminder2"
  },
  {
    id: "reminder2-7day",
    source: "reminder2",
    target: "7dayTimer"
  },
  {
    id: "7day-reminder3",
    source: "7dayTimer",
    target: "reminder3"
  },
  {
    id: "reminder3-14dayTimer",
    source: "reminder3",
    target: "14dayTimer"
  },
  {
    id: "14dayTimer",
    source: "14dayTimer",
    target: "reengagement"
  },
  {
    id: "e1-3",
    source: "imageReviewHumanRequired",
    target: "logicCheckValidReceipt"
  },
  {
    id: "e1-3",
    source: "logicCheckValidReceipt",
    target: "payoutMessage",
    label: "yes"
  }
];

const BasicFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
    </ReactFlow>
  );
};

export default BasicFlow;
