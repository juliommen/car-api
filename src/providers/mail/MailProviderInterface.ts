export interface MailProviderInterface {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void>;
}
