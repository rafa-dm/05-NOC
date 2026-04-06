import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("logg.entity.ts", () => {
  test("should create a LogEntity instance", () => {
    const dataObj = {
      message: "Hola Mundo",
      level: LogSeverityLevel.high,
      origin: "log.entity.test.ts",
    };

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from json", () => {});
});
