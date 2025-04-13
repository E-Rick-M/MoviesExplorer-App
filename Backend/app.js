"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, function () {
    console.log("Server is running on port 3000 at http://localhost:3000");
});
