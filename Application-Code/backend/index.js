require("dotenv").config();

const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const Redis = require("ioredis");
const express = require("express");
const app = express();

connection();

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis-cluster-master-0.redis-cluster-headless.devtron-demo.svc.cluster.local",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || "deep2468"  
});

app.use(express.json());
app.use(cors());


app.get('/ok', (req, res) => {
    res.status(200).send('ok')
})

redis.on("connect", () => {
  console.log("Redis connection established.");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});



app.get("/redis-test", async (req, res) => {
try {
    await redis.set("foo", "bar");
    const value = await redis.get("foo");
    res.json({ value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
