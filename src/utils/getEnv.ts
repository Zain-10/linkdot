/**
 * Take a string and return the value of the environment variable
 */
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export { getEnv };
