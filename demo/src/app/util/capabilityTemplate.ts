import {PocketixVPStatementLanguage} from "pocketixng";

const capabilityTemplate: PocketixVPStatementLanguage = {
  component: "cmd",
  icon: "pi-bolt",
  color: "white",
  backgroundColor: "#99A8D7",
  avoidParents: [ "fork", "switch" ],
  extensions: {
    params: {
      type: "array",
      defs: String
    }
  }
}

export {capabilityTemplate};
