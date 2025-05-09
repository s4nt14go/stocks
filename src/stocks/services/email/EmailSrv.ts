import { IEmailSrv } from './IEmailSrv';
import { Report } from '../../domain/Report';
// import * as util from 'util';
import * as dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();
if (!process.env.ETHEREAL_EMAIL || !process.env.ETHEREAL_PASSWORD)
  throw new Error(
    'Required environment variables are missing: ETHEREAL_EMAIL, ETHEREAL_PASSWORD',
  );

export class EmailSrv implements IEmailSrv {
  private transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });
  }

  public async send(report: Report) {
    console.log(`Sending email with report for ${report.day}:`);
    const dto = report.toDto();
    // console.log(util.inspect(dto, false, null, true));
    const stringified = JSON.stringify(dto, null, 2);
    console.log(stringified);

    const info = await this.transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: `${report.day} Daily report ✔`, // Subject line
      text: `REPORT:\n${stringified}`, // plain text body
      html: `<p><b>REPORT:</b></p><pre>${stringified}</pre>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
  }
}
