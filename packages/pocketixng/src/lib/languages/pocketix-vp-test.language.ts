import { PocketixVPLanguage } from "../model/pocketix-vp-language.model";

export const pocketixVPLanguage: PocketixVPLanguage = {
  variables: [ { label: "param1" }, { label: "param2" } ],
  statements: {
    _: {
      component: "compound",
      label: "_",
      icon: "pi-code",
      color: "black",
      levels: [ -1 ],
      backgroundColor: "#FFFFFF",//"#8FC494",//#ECAAAA",
    },
    if: {
      component: "compound",
      label: "if",
      icon: "pi-question-circle",
      color: "white",
      backgroundColor: "#BFB27C",//"#8FC494",//#ECAAAA",
      avoidParents: [ "switch" ],
      extensions: {
        enableCondition: true
      }
    },
    elseif: {
      component: "compound",
      label: "elseif",
      icon: "pi-question-circle",
      color: "white",
      backgroundColor: "#BFB27C",//"#8FC494",//"#ECAAAA",
      parents: [ "fork" ],
      avoidParents: [ "switch" ],
      positions: [ "middle", "last"],
      avoidPositions: [ "first" ],
      extensions: {
        enableCondition: true
      }
    },
    else: {
      component: "compound",
      label: "else",
      icon: "pi-question-circle",
      color: "white",
      backgroundColor: "#BFB27C",//"#8FC494",//"#ECAAAA",
      parents: [ "fork" ],
      avoidParents: [ "switch" ],
      positions: [ "last" ],
      avoidPositions: [ "first" ],
      extensions: {
        enableCondition: false
      }
    },
    fork: {
      component: "compound",
      label: "fork",
      icon: "pi-sitemap",
      color: "white",
      backgroundColor: "#9F8C3E",//"#689D64",
      avoidParents: [ "fork", "switch" ],
      extensions: {
        enableCondition: false
      }
    },
    switch: {
      component: "compound",
      label: "switch",
      icon: "pi-sitemap",
      color: "white",
      backgroundColor: "#9F8C3E",//"#689D64",
      avoidParents: [ "fork", "switch" ],
      extensions: {
        enableCondition: false
      }
    },
    case: {
      component: "compound",
      label: "case",
      icon: "pi-question-circle",
      color: "white",
      backgroundColor: "#BFB27C",//"#8FC494",//"#ECAAAA",
      parents: [ "switch" ],
      avoidParents: [ "fork" ],
      extensions: {
        enableCondition: true
      }
    },
    default: {
      component: "compound",
      label: "default",
      icon: "pi-question-circle",
      color: "white",
      backgroundColor: "#BFB27C",//"#8FC494",//"#ECAAAA",
      parents: [ "switch" ],
      avoidParents: [ "fork" ],
      positions: [ "last" ],
      avoidPositions: [ "first" ],
      extensions: {
        enableCondition: false
      }
    },
    while: {
      component: "compound",
      label: "while",
      icon: "pi-undo",
      color: "white",
      backgroundColor: "#BFB27C",
      avoidParents: [ "fork", "switch" ],
      extensions: {
        enableCondition: true
      }
    },
    set: {
      component: "cmd",
      label: "set",
      icon: "pi-bolt",
      color: "white",
      backgroundColor: "#99A8D7",
      avoidParents: [ "fork", "switch" ],
      extensions: {
        params: {
          type: "array",
          defs: String
          /*type: "structure",
          defs: [
            {
              name: "param1",
              type: Number
            },
            {
              name: "param2",
              type: Number
            },
            {
              name: "param3",
              type: String
            },
            {
              name: "param4",
              type: Boolean
            }
          ]*/
        }
      }
    },
    read: {
      component: "cmd",
      label: "read",
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
  },
  err: {
    icon: "pi-exclamation-triangle",
    color: "red",
    backgroundColor: "#F9F63D"
  }
}