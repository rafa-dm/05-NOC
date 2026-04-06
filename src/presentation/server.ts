import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-mutiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // todo: Mandar email
    // new sendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "puercasocuellamos@gmail.com",
    // ]);
    // emailService.sendEmailWithFileSystemLogs(["puercasocuellamos@gmail.com"]);

    // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";

      // new CheckServiceMultiple(
      //   [fsLogRepository, postgresLogRepository, mongoLogRepository],
      //   () => console.log(`${url} is ok`),
      //   (error) => console.log(error),
      // ).execute(url);
      new CheckService(
        fsLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}
