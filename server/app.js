const express = require("express");
const cors = require("cors");
const http = require("http");
const socketServer = require("socket.io").Server;
require("dotenv").config();

const routes = require("./routes/index.routes");
const verifyToken = require("./middleware/checkIOAuth");

const app = express();
const server = http.createServer(app);
const io = new socketServer(server, {
    cors: {
        origin: "*",
    },
});
app.use(cors({ origin: "*" }));

io.on("connection", async (socket) => {
    const token = socket.handshake.headers.authorization;

    const userData = await verifyToken(token);

    if (!userData.success) {
        socket.emit("message", "Invalid token");
        socket.disconnect("Token invalid");
    }

    socket.join(`${userData.user.userId}`);

    socket.emit("connected", "Connected");

    socket.on("requestData", (data) => {
        socket.to(data.userId).emit("permission", data);
    });

    socket.on("permissionResponse", (data) => {
        socket.to(data.userId).emit("finalSend", data);
    });
});

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api", routes);

module.exports = server;
