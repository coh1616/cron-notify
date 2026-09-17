import mongoose from "mongoose";

const PingSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Ping || mongoose.model("Ping", PingSchema);
