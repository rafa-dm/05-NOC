import { envs } from "../../../src/config/plugins/envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "puercasocuellamos@gmail.com",
      MAILER_SECRET_KEY: "yzheivultdmpaggh",
      PROD: false,
      MONGO_URL: "mongodb://rafa:123456789@localhost:27018/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "rafa",
      MONGO_PASS: "123456789",
      POSTGRES_URL: "postgresql://postgres:123456789@localhost:5433/NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_PASSWORD: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("../../../src/config/plugins/envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
