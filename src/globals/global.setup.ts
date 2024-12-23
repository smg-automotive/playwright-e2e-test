// global.ts
export default async () => {
  // Perform global setup here
  console.log('Global setup before any test suite runs');
  
  const environment = getEnvVariable('Environment');
  const testRail = getEnvVariable('Test_Rail_Integration');
  process.env.CI ? process.env.PLAYWRIGHT_HTML_OPEN = 'never': process.env.PLAYWRIGHT_HTML_OPEN = 'always';
  };

  function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} variable is not defined or empty`);
    }
    return value;
}