import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Polyfill for crypto.getRandomValues for Node.js 16.x compatibility
if (typeof globalThis.crypto === 'undefined') {
  const { webcrypto } = require('node:crypto');
  globalThis.crypto = webcrypto as Crypto;
}

// Fallback for older Node.js versions that don't have webcrypto
if (typeof globalThis.crypto?.getRandomValues === 'undefined') {
  const crypto = require('node:crypto');
  globalThis.crypto = {
    ...globalThis.crypto,
    getRandomValues: (array: Uint8Array) => {
      return crypto.randomFillSync(array);
    },
  } as Crypto;
}

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(() => []),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn(),
  })),
});
