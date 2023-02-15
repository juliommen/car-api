import { hashSync } from "bcrypt";
import { randomUUID } from "crypto";

import { prisma } from "../src/utils/prismaClient";

async function createAdminUser() {
  await prisma.user.create({
    data: {
      admin: true,
      avatar: "",
      email: process.env.EMAIL_USER_ADMIN,
      id: randomUUID(),
      password: hashSync(process.env.PWD_USER_ADMIN, 8),
      driverLicense: "1",
      name: "Admin",
    },
  });
}

createAdminUser();
