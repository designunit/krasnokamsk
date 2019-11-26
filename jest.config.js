module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: false,
        }
    },
    roots: [
        'src',
    ],
    collectCoverageFrom: [
        'src/**/*.{ts, tsx}',

        // no coverage in
        '!**/node_modules/**',
        '!**/components/**',
    ],
    setupFilesAfterEnv: [
        'jest-enzyme',
        './node_modules/jest-enzyme/lib/index.js',
    ],
    testEnvironment: 'enzyme',
};
