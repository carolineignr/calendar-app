module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
}
