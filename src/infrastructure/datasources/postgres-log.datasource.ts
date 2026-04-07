import { SeverityLevel } from "../../../generated/prisma/enums";
import { prisma } from "../database/prisma";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });

    console.log("Postgres saved");
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prisma.logModel.findMany({
      where: { level: level },
    });

    return dbLogs.map((dbLog) =>
      LogEntity.fromObject({ ...dbLog, level: dbLog.level.toLowerCase() }),
    );
  }
}
