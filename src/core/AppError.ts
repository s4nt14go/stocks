import { StatusError } from './Status.js';
import { GraphQLError } from 'graphql/error/index.js';

export type BaseErrorDto = {
  type: string;
  message: string;
  status: number;
  field?: string;
};

export class BaseError {
  public type: string;
  public field?: string;
  public readonly message: string;
  public readonly status: StatusError; // Sometimes the error is found down inside functions and to bubble the correct error type (i.e. BAD_REQUEST 400, NOT_FOUND 404) up to the controller, we need to save it in the error.

  public toDto(): BaseErrorDto {
    return {
      type: this.type,
      message: this.message,
      status: this.status,
      ...(this.field !== undefined && { field: this.field }),
    };
  }

  protected constructor(args: { message: string; status: StatusError }) {
    const { message, status } = args;
    this.message = message;
    this.status = status;
    this.type = this.constructor.name;
  }
}

export const formatErrors = (errors: BaseError[]) => {
  if (!errors.length) throw Error(`Empty errors array`);
  const msg = errors.length === 1 ? errors[0].message : 'Multiple errors';
  return new GraphQLError(msg, {
    extensions: { errors: errors.map((e) => e.toDto()) },
  });
};
