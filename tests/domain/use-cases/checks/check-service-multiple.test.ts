import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-mutiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sucessCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    sucessCallback,
    errorCallback,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sucessCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("http://google.com");

    expect(wasOk).toBeTruthy();
    expect(sucessCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute("http://google-test-fake.com");

    expect(wasOk).toBeFalsy();
    expect(sucessCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
