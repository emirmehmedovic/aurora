import { PrismaClient } from '@prisma/client';
import { normalizePhone } from '../src/lib/phoneUtils.js';
import { normalizeNameForMatching } from '../src/lib/textUtils.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting customer normalization backfill...');

  const customers = await prisma.customer.findMany();
  console.log(`Found ${customers.length} customers to normalize`);

  let updated = 0;
  for (const customer of customers) {
    try {
      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          phoneNormalized: normalizePhone(customer.phone),
          fullNameNormalized: normalizeNameForMatching(customer.fullName)
        }
      });
      updated++;

      if (updated % 100 === 0) {
        console.log(`Processed ${updated}/${customers.length} customers`);
      }
    } catch (error) {
      console.error(`Error updating customer ${customer.id}:`, error);
    }
  }

  console.log(`Backfill complete! Updated ${updated} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
