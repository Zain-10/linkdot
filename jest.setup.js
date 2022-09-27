// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import "@testing-library/jest-dom/extend-expect";

process.env.NEXT_PUBLIC_API_SERVER_URI = "http://example.com";
