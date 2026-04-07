import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";

describe("CheckServiceMultiple UseCase", () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sucessCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
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
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute("http://google-test-fake.com");

    expect(wasOk).toBeFalsy();
    expect(sucessCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
