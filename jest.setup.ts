import '@testing-library/jest-dom';
import 'structured-clone';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id'});

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = function structuredClone(value) {
    if (value === null || value === undefined) {
      return value;
    }

    try {
      if (typeof value === 'object') {
        return JSON.parse(JSON.stringify(value));
      }

      return value;
    } catch (error) {
      console.warn('structuredClone polyfill failed:', error);

      return Array.isArray(value) ? [...value] : { ...value };
    }
  };
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
