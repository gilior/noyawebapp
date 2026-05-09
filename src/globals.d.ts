    // src/typings.d.ts or src/globals.d.ts
export {}; // Ensure this is treated as a module

declare global {
  interface Window {
    dataLayer: any; // Or define a specific interface
  }
}