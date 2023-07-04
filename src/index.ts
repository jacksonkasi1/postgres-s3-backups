import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import { backup } from "./backup";
import { env } from "./env";

// Create an Express application
const app: Application = express();
const port: number = env.PORT || 5000;

// Define the endpoint to trigger the backup
app.get("/backup", async (req: Request, res: Response) => {
  try {
    await backup();
    res.status(200).send("Backup completed successfully");
  } catch (error) {
    console.error("Error while running backup: ", error);
    res.status(500).send("Error while running backup");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Backup API is running at http://localhost:${port}`);
});

// import { CronJob } from "cron";

// const job = new CronJob(env.BACKUP_CRON_SCHEDULE, async () => {
//   try {
//     await backup();
//   } catch (error) {
//     console.error("Error while running backup: ", error)
//   }
// });

// job.start();
