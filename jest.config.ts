import type { Config } from 'jest';
import path from 'path';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/models/**/*.ts',
    '!src/routes/**/*.ts',
    '!src/mappers/**/*.ts',
    '!src/globals.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.test.ts'],
  moduleDirectories: ['node_modules', path.resolve(__dirname, 'src')],
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
