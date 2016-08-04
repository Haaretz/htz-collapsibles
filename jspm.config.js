SystemJS.config({
  nodeConfig: {
    "paths": {
      "htz-collapsibles/": "src/"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "htz-collapsibles": {
      "main": "index.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "htz-parse-bps-state": "github:haaretz/htz-parse-bps-state@1.0.0",
    "lodash-es": "npm:lodash-es@4.14.1",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.13",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.6.0"
      }
    },
    "npm:buffer@4.6.0": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    }
  }
});
