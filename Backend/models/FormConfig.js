

const mongoose = require("mongoose");

const formConfigSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: true,
      enum: ["examForm"],
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("FormConfig", formConfigSchema);
