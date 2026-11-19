declare global {
  namespace Express {
    interface Request {
      uid?: string;
      name?: string;
    }
  }
}

export {};
