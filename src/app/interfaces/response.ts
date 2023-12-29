export interface Response<T> {
    errors: string[];
    message: string;
    result: T[];
  }