import {IoTiXVPStatementLanguage} from "iotixng";

const capabilityTemplate: IoTiXVPStatementLanguage = {
  name: "cmd",
  component: "cmd",
  icon: "pi-bolt",
  color: "white",
  backgroundColor: "#99A8D7",
  avoidParents: [ "fork", "switch" ],
  extensions: {
    params: {
      type: "array",
      // Type<T> here (vs a "string" tag on iotix-react's copy) is this
      // platform's idiomatic representation - unused at runtime for "array"
      // params on either platform (only the "structure" case reads defs), so
      // not unified across repos.
      defs: String
    }
  }
}

export {capabilityTemplate};
