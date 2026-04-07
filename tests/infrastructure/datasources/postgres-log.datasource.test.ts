import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { prisma } from "../../../src/infrastructure/database/prisma";
import { PostgresLogDatasource } from "../../../src/infrastructure/datasources/postgres-log.datasource";

describe("PostgresLogDataSource", () => {
  const logDatasource = new PostgresLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "test message",
    origin: "mongo-log.datasource.test.ts",
  });

  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(async () => {
    await prisma.logModel.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should create a log", async () => {
    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Postgres saved");
  });

  test("should get logs", async () => {
    await logDatasource.saveLog(log);
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(2);
    expect(logs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ level: LogSeverityLevel.medium }),
      ]),
    );
  });
});
