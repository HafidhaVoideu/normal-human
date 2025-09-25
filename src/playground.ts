import { db } from "./server/db";

await db.user.create({
  data: {
    emailAddress: "hafidha!gmail.com",
    firstName: "hafidha",
    lastName: "zaki",
  },
});

console.log("done");
