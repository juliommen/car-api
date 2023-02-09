import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { MailProviderInterface } from "../../MailProviderInterface";

@injectable()
class MailProvider implements MailProviderInterface {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templetaParse = handlebars.compile(templateFileContent);
    const templateHTML = templetaParse(variables);
    const info = await this.client.sendMail({
      from: '"Car API" <noreplay@carapi.com>', // sender address
      to,
      subject,
      html: templateHTML,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

export { MailProvider };
