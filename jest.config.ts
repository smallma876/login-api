import type { Config } from 'jest';
const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/models/**/*.ts',
    '!src/routes/**/*.ts',
    '!src/globals.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

export default config;
