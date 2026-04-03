import { CheckService } from "../domain/use-cases/checks/check-service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // todo: Mandar email
    // new sendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "puercasocuellamos@gmail.com",
    // ]);
    // emailService.sendEmailWithFileSystemLogs(["puercasocuellamos@gmail.com"]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
