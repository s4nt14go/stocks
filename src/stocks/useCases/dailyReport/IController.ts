import { Result } from '../../../core/Result.js';

export declare interface IController<Args, Response> {
  execute(args: Args): Promise<Result<Response>>;
}
