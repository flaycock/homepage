module.exports = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["./jest.setup.ts"],
	collectCoverageFrom: [
		"**/*.{ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/vendor/**",
	],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
};
