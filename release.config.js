module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    '@semantic-release/git',
    ['@semantic-release/exec', { publishCmd: 'echo "RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV' }],
  ],
};
