/** Basic dependency-cruiser config used by PR Architecture Intelligence. */
module.exports = {
  forbidden: [
    { name: "no-circular", severity: "error", from: {}, to: { circular: true } },
    { name: "no-orphans", severity: "info", from: { orphan: true, pathNot: ["\\.d\\.ts$", "(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$", "^tests/", "^[^/]+\\.config\\.(js|cjs|mjs|ts|mts)$", "^app/(.+/)?(page|layout|route|loading|error|not-found|global-error|template|default|robots|sitemap|manifest|opengraph-image|icon)\\.(ts|tsx|js|jsx)$"] }, to: {} },
    { name: "not-to-test", severity: "error", from: { pathNot: "^tests" }, to: { path: "^tests" } },
    { name: "no-non-package-json", severity: "error", from: {}, to: { dependencyTypes: ["npm-no-pkg", "npm-unknown"] } },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(^|/)(node_modules|\\.next|coverage|dist)/" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: { exportsFields: ["exports"], conditionNames: ["import", "require", "node", "default"] },
  },
}
