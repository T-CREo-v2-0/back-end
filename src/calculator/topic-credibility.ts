const path = require("path");

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

export { getDistance };
