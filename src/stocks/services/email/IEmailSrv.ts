import { Report } from '../../domain/Report';

export type IEmailSrv = {
  send(report: Report): void;
};
