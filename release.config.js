module.exports = {
  branches: ["main", { name: "alpha", prerelease: true }],
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git",
    ["@semantic-release/exec", { publishCmd: 'echo "release_version=${nextRelease.version}" >> $GITHUB_OUTPUT' }],
  ],
};
