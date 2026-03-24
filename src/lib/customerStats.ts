import { prisma } from './prisma';

/**
 * Update customer denormalized stats fields
 * Call after: order create, order status update, customer merge
 */
export async function updateCustomerStats(customerId: string): Promise<void> {
  const result = await prisma.order.aggregate({
    where: {
      customerId,
      status: { notIn: ['CANCELLED', 'RETURNED'] }
    },
    _count: { id: true },
    _sum: { totalAmount: true },
    _max: { createdAt: true }
  });

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      orderCount: result._count.id,
      totalSpent: result._sum.totalAmount || 0,
      lastOrderAt: result._max.createdAt
    }
  });
}
