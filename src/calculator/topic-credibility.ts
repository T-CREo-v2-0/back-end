const path = require("path");

/**
 * Calls python script to get Hellinger distance of a text
 * @param text
 * @returns
 */
async function getDistance(text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    var spawn = require("child_process");
    const scriptPath = path.join(__dirname, "topicModule", "get_distance.py");

    // Full path go back 2 folders to get to root folder
    const fullPath = path.join(__dirname, "..", "..");
    const envPath = path.join(fullPath, "venv/bin/python");

    const process = spawn.spawnSync(envPath, [scriptPath, text], {
      encoding: "utf8",
      stdio: "pipe",
      silent: true,
    });

    if (process.error) {
      reject(process.error);
    }
    resolve(process.stdout);
  });
}

/**
 * Calculates the credibility of a topic based on the Hellinger distance
 * @param text
 * @param weight
 * @returns The credibility of the topic
 */
async function calculateTopicCredibility(text: string): Promise<number> {
  return new Promise((resolve, reject) => {
    getDistance(text).then((distance: number) => {
      const credibility: number = 100 * (1 - distance);
      resolve(credibility);
    });
  });
}

export { calculateTopicCredibility };
