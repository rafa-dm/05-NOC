import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../../src/data/mongo";
import { MongoLogDataSource } from "../../../src/infrastructure/datasources/mongo-log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("MongoLogDataSource", () => {
  const logDatasource = new MongoLogDataSource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "test message",
    origin: "mongo-log.datasource.test.ts",
  });

  let logSpy: jest.SpyInstance;

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(async () => {
    logSpy.mockRestore();
    await LogModel.deleteMany();
  });

  test("should create a log", async () => {
    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created: ",
      expect.any(String),
    );
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
