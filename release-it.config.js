module.exports = {
    git: {
        commitMessage: 'chore: release v${version}',
    },
    github: {
        release: true,
    },
    plugins: {
        '@release-it/conventional-changelog': {
            preset: {
                types: [
                    { type: 'feat', section: '✨ Features' },
                    { type: 'fix', section: '🐛 Bug Fixes' },
                ],
            },
            infile: 'CHANGELOG.md',
        },
    },
};
