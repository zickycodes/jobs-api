const { body, validationResult } = require("express-validator");

const jobdto = [
  body("job_location").notEmpty().withMessage("Job location is required."),
  body("job_type").notEmpty().withMessage("Job type is required."),
  body("gender").notEmpty().withMessage("Gender is required."),
  body("job_description")
    .notEmpty()
    .withMessage("Job description is required."),
  body("uploadURL")
    .notEmpty()
    .withMessage("Upload URL is required.")
    .isURL()
    .withMessage("Invalid URL format."),
];

module.exports = jobdto;
