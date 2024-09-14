export interface ICustomError extends Error {
  response?: {
    data?: {
      error?: string;
    };
  };
}
