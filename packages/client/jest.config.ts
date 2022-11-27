export default {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ['/node_modules/', './dist'],
  transform: {
    "^.+\\.(tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}