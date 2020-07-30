import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Store from "react-observable-store";

Store.init({
  state: {
    tree: {
      id: "root",
      label: "root",
      items: [
        { id: "l1", label: "node1" },
        {
          id: "l2",
          label: "node2",
          items: [
            { id: "l21", label: "node21" },
            {
              id: "l22",
              label: "node22",
              items: [
                { id: "l211", label: "node211" },
                { id: "l212", label: "node212" },
                { id: "l213", label: "node213" }
              ]
            }
          ]
        },
        { id: "l3", label: "node3" }
      ]
    }
  }
});
ReactDOM.render(<App />, document.getElementById("root"));
