const express = require("express");
const app = express();
const sequelize = require("./util/database");
const Jobs = require("./model/jobs");
const bodyParser = require("body-parser");
const jobdto = require("./middleware/jobs.dto");
const { body, validationResult } = require("express-validator");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/api/add-jobs", jobdto, async (req, res, next) => {
  try {
    console.log(req.body);
    await Jobs.create({
      job_location: req.body.job_location,
      job_type: req.body.job_type,
      gender: req.body.gender,
      job_description: req.body.job_description,
      uploadURL: req.body.uploadURL,
    });
    res.status(201).json({ message: "Job added successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
});

app.delete("/api/delete-jobs/:id", async (req, res, next) => {
  const jobId = req.params.id;
  console.log(jobId);
  try {
    const deletedJob = await Jobs.destroy({
      where: {
        id: jobId,
      },
    });

    if (deletedJob) {
      return res.status(200).json({ message: "Job deleted successfully." });
    } else {
      return res.status(404).json({ error: "Job not found." });
    }
  } catch (error) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(status).json({ message: message });
});

(async () => {
  try {
    await sequelize.authenticate();
    await app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running");
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
})();

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (err) {
    console.error(err);
  }
})();
