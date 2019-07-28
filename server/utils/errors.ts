export class HttpError extends Error {
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
  code: number;
}

export const Errors = {
  User: {
    NOT_FOUND: new HttpError('User not found', 404),
    INVALID_CREDENTIALS: new HttpError('Email or password are incorrect', 422),
  },
  Token: {
    NOT_FOUND: new HttpError('Token not found', 401),
    EXPIRED: new HttpError('Token expired', 401),
  }
}
