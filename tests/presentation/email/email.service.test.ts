import nodemailer from "nodemailer";

import {
  EmailService,
  sendMailOptions,
} from "../../../src/presentation/email/email.service";

describe("EmailService", () => {
  const email = "asdasd@mail.com";
  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: sendMailOptions = {
      to: email,
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: email,
    });
  });

  test("should send email with attachements", async () => {
    await emailService.sendEmailWithFileSystemLogs(email);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
      ]),
    });
  });
});
