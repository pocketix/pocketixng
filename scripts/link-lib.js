// Cross-platform replacement for `ln -sfn ../dist/iotixng node_modules/iotixng`.
// Runs after `ng build iotixng` so the demo app and Cypress specs can resolve
// the bare import `from "iotixng"` to the freshly built package. Uses a
// Windows-safe "junction" link (works without admin rights / Developer Mode),
// which Node treats as an ordinary symlink on macOS/Linux.

const fs = require("fs");
const path = require("path");

const target = path.join(__dirname, "..", "dist", "iotixng");
const linkPath = path.join(__dirname, "..", "node_modules", "iotixng");

fs.mkdirSync(path.dirname(linkPath), { recursive: true });
fs.rmSync(linkPath, { recursive: true, force: true });
fs.symlinkSync(target, linkPath, "junction");
