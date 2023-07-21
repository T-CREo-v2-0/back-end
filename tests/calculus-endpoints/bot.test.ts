import {
  predictBotByUser,
  predictBotByUsers,
  predictBots,
} from "../bot_credibility";
import mockConsole from "jest-mock-console";

describe("botPrediction", () => {
  test("predictBotByUser should return predictions for user with id 7996082", async () => {
    const predictions = await predictBotByUser("7996082", 10);
    expect(predictions).toBeDefined();
    expect(predictions.length).toBe(10);
  }, 100000);

  test("predictBotByUsers should return predictions for users with ids 7996082 and 14436030", async () => {
    const userIds = ["7996082", "14436030"];
    const restoreConsole = mockConsole();
    await predictBotByUsers(userIds, 10);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(
      "Predictions for user 7996082:",
      expect.any(Array)
    );
    expect(console.log).toHaveBeenCalledWith(
      "Predictions for user 14436030:",
      expect.any(Array)
    );
    restoreConsole();
  }, 100000);

  test("predictBots should return predictions for all users", async () => {
    const restoreConsole = mockConsole();
    await predictBots(10);
    expect(console.log).toHaveBeenCalled();
    restoreConsole();
  }, 100000);
});
