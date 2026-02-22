import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hectorHash = await bcrypt.hash("hector123", 12);
  const clientHash = await bcrypt.hash("client123", 12);

  await prisma.user.upsert({
    where: { email: "hector@hectorsherbs.com" },
    update: {},
    create: {
      email: "hector@hectorsherbs.com",
      name: "Hector",
      passwordHash: hectorHash,
      role: "practitioner",
      practitionerSlug: "hector",
    },
  });

  await prisma.user.upsert({
    where: { email: "sarah.mitchell@example.com" },
    update: {},
    create: {
      email: "sarah.mitchell@example.com",
      name: "Sarah Mitchell",
      passwordHash: clientHash,
      role: "client",
    },
  });

  console.log("Seeded users: hector@hectorsherbs.com (practitioner), sarah.mitchell@example.com (client)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
