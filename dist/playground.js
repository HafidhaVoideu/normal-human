"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./server/db");
await db_1.db.user.create({
    data: {
        emailAddress: "hafidha!gmail.com",
        firstName: "hafidha",
        lastName: "zaki",
    },
});
console.log("done");
