declare global {
  interface Window {
    fbAsyncInit?: () => void;
  }

  const FB: {
    init: (config: { xfbml: boolean; version: string }) => void;
    // Add other methods from the FB SDK if you use them
  };
}

declare module 'next-sanity' {
  const value: any;
  export = value;
}