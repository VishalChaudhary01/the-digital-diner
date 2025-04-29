import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alicePassword = await bcrypt.hash('Alice@1234', 10);
  const bobPassword = await bcrypt.hash('Bob@1234', 10);
  const alice = await prisma.user.upsert({
    where: { phoneNumber: '1111122222' },
    update: {},
    create: {
      phoneNumber: '1111122222',
      name: 'Alice',
      role: 'ADMIN',
      password: alicePassword,
    },
  });
  const bob = await prisma.user.upsert({
    where: { phoneNumber: '4444666666' },
    update: {},
    create: {
      phoneNumber: '4444666666',
      name: 'Bob',
      password: bobPassword,
    },
  });
  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
