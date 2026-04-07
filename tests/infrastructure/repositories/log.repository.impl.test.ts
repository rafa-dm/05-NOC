import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    const log = new LogEntity({
      message: "test-message",
      level: LogSeverityLevel.medium,
      origin: "log.repository.impl.test.ts",
    });
    await logRepositoryImpl.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalled();
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const logs = await logRepositoryImpl.getLogs(LogSeverityLevel.medium);

    expect(mockLogDatasource.getLogs).toHaveBeenCalled();
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.medium,
    );
  });
});
