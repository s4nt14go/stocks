import cron from 'node-cron';
import {
  Args as DailyReportArgs,
  Response as DailyReportResponse,
} from '../dailyReport/DailyReport.js';
import { IController } from '../dailyReport/IController.js';
import { IEmailSrv } from '../../services/email/IEmailSrv.js';

export class DailyReportCron {
  private dailyReport: IController<DailyReportArgs, DailyReportResponse>;
  private emailSrv: IEmailSrv;

  public constructor(args: {
    dailyReport: IController<DailyReportArgs, DailyReportResponse>;
    emailSrv: IEmailSrv;
  }) {
    const { dailyReport, emailSrv } = args;
    this.dailyReport = dailyReport;
    this.emailSrv = emailSrv;
  }

  public async execute() {
    cron.schedule(
      '0 0 * * *',
      async () => {
        // run every day
        // cron.schedule('*/10 * * * * *', async () => {  // run every 10s for testing purposes

        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toJSON().split('T')[0];

        const reportOrErrors = await this.dailyReport.execute({
          day: yesterday,
        });

        if (reportOrErrors.isFailure) {
          console.error(JSON.stringify(reportOrErrors.errors, null, 2));
          throw Error(reportOrErrors.errors.map((e) => e.message).join('\n'));
        }

        const report = reportOrErrors.value;

        this.emailSrv.send(report);
      },
      {
        timezone: 'Etc/GMT',
      },
    );
  }
}
