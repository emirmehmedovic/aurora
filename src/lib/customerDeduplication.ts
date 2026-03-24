import { prisma } from './prisma';
import { normalizePhone } from './phoneUtils';
import { normalizeNameForMatching, isNameSimilar } from './textUtils';

export interface DuplicateMatch {
  customerId: string;
  matchReason: 'exact_phone' | 'exact_email' | 'fuzzy_name_phone';
  confidence: number;
}

/**
 * Find duplicate customers based on phone, email, and name similarity
 */
export async function findDuplicateCustomers(
  phone: string,
  email: string | null,
  fullName: string
): Promise<DuplicateMatch[]> {
  const matches: DuplicateMatch[] = [];
  const phoneNorm = normalizePhone(phone);

  // 1. Exact phone match (highest confidence)
  const phoneMatches = await prisma.customer.findMany({
    where: { phoneNormalized: phoneNorm }
  });

  for (const match of phoneMatches) {
    matches.push({
      customerId: match.id,
      matchReason: 'exact_phone',
      confidence: 1.0
    });
  }

  // 2. Exact email match
  if (email) {
    const emailMatches = await prisma.customer.findMany({
      where: {
        email: { equals: email, mode: 'insensitive' }
      }
    });

    for (const match of emailMatches) {
      if (!matches.find(m => m.customerId === match.id)) {
        matches.push({
          customerId: match.id,
          matchReason: 'exact_email',
          confidence: 0.95
        });
      }
    }
  }

  // 3. Fuzzy name + partial phone match (last 6 digits)
  const partialPhone = phoneNorm.slice(-6);
  const potentialMatches = await prisma.customer.findMany({
    where: {
      phoneNormalized: { endsWith: partialPhone }
    }
  });

  for (const match of potentialMatches) {
    if (!matches.find(m => m.customerId === match.id)) {
      if (isNameSimilar(fullName, match.fullName, 2)) {
        matches.push({
          customerId: match.id,
          matchReason: 'fuzzy_name_phone',
          confidence: 0.85
        });
      }
    }
  }

  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Merge multiple duplicate customers into one target customer
 */
export async function mergeCustomers(
  targetId: string,
  sourceIds: string[],
  mergeStrategy: 'newest' | 'most_complete' = 'most_complete'
): Promise<void> {
  return await prisma.$transaction(async (tx) => {
    const target = await tx.customer.findUnique({
      where: { id: targetId }
    });

    if (!target) throw new Error('Target customer not found');

    for (const sourceId of sourceIds) {
      const source = await tx.customer.findUnique({
        where: { id: sourceId }
      });

      if (!source) continue;

      // Transfer all orders
      await tx.order.updateMany({
        where: { customerId: sourceId },
        data: { customerId: targetId }
      });

      // Transfer all leads
      await tx.lead.updateMany({
        where: { customerId: sourceId },
        data: { customerId: targetId }
      });

      // Transfer all returns
      await tx.return.updateMany({
        where: { customerId: sourceId },
        data: { customerId: targetId }
      });

      // Merge tags (union)
      const mergedTags = Array.from(new Set([...target.tags, ...source.tags]));

      // Merge notes
      let mergedNotes = target.notes || '';
      if (source.notes) {
        mergedNotes = mergedNotes
          ? `${mergedNotes}\n\n--- Merged from duplicate ---\n${source.notes}`
          : source.notes;
      }

      // Update target with merged data
      const updateData: any = { tags: mergedTags, notes: mergedNotes };

      if (mergeStrategy === 'most_complete') {
        if (!target.email && source.email) updateData.email = source.email;
        if (!target.address && source.address) updateData.address = source.address;
        if (!target.city && source.city) updateData.city = source.city;
        if (!target.zipCode && source.zipCode) updateData.zipCode = source.zipCode;
      }

      await tx.customer.update({
        where: { id: targetId },
        data: updateData
      });

      // Delete source customer
      await tx.customer.delete({
        where: { id: sourceId }
      });
    }

    // Recalculate denormalized fields
    await recalculateCustomerStats(tx, targetId);
  });
}

async function recalculateCustomerStats(tx: any, customerId: string) {
  const result = await tx.order.aggregate({
    where: {
      customerId,
      status: { notIn: ['CANCELLED', 'RETURNED'] }
    },
    _count: { id: true },
    _sum: { totalAmount: true },
    _max: { createdAt: true }
  });

  await tx.customer.update({
    where: { id: customerId },
    data: {
      orderCount: result._count.id,
      totalSpent: result._sum.totalAmount || 0,
      lastOrderAt: result._max.createdAt
    }
  });
}
