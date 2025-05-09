import { DailyReportCron } from './DailyReportCron.js';
import DailyReportUseCase from '../dailyReport/index.js';
import { EmailSrv } from '../../services/email/EmailSrv.js';

const emailSrv = new EmailSrv();

export default new DailyReportCron({
  dailyReport: DailyReportUseCase,
  emailSrv,
});
