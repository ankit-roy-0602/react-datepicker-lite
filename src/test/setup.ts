import '@testing-library/jest-dom';

// Mock IntersectionObserver
interface MockIntersectionObserver {
  disconnect(): void;
  observe(): void;
  unobserve(): void;
  root: null;
  rootMargin: string;
  thresholds: number[];
  takeRecords(): unknown[];
}

globalThis.IntersectionObserver = class IntersectionObserver
  implements MockIntersectionObserver
{
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
interface MockResizeObserver {
  disconnect(): void;
  observe(): void;
  unobserve(): void;
}

globalThis.ResizeObserver = class ResizeObserver implements MockResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as unknown as typeof ResizeObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: () => ({
    getPropertyValue: () => '',
  }),
});
