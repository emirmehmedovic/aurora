/**
 * Business Analytics Utilities
 * Functions for calculating advanced business metrics
 */

interface Order {
  customerId: string;
  totalAmount: number;
  createdAt: Date;
  status: string;
}

/**
 * Calculate Customer Lifetime Value (CLV)
 */
export function calculateCLV(orders: Order[]): number {
  if (orders.length === 0) return 0;

  const validOrders = orders.filter((o) => o.status !== "CANCELLED");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = totalRevenue / validOrders.length;

  // Average purchase frequency (orders per month)
  const firstOrder = new Date(
    Math.min(...validOrders.map((o) => new Date(o.createdAt).getTime()))
  );
  const lastOrder = new Date(
    Math.max(...validOrders.map((o) => new Date(o.createdAt).getTime()))
  );
  const monthsDiff =
    (lastOrder.getTime() - firstOrder.getTime()) / (1000 * 60 * 60 * 24 * 30);
  const purchaseFrequency =
    monthsDiff > 0 ? validOrders.length / monthsDiff : validOrders.length;

  // Assume average customer lifespan of 36 months
  const avgCustomerLifespan = 36;

  return avgOrderValue * purchaseFrequency * avgCustomerLifespan;
}

/**
 * Calculate churn rate based on customer activity
 */
export function calculateChurnRate(
  customerLastOrders: { customerId: string; lastOrderAt: Date }[],
  inactiveThresholdDays: number = 90
): number {
  if (customerLastOrders.length === 0) return 0;

  const now = new Date();
  const thresholdDate = new Date(
    now.getTime() - inactiveThresholdDays * 24 * 60 * 60 * 1000
  );

  const churnedCustomers = customerLastOrders.filter(
    (c) => new Date(c.lastOrderAt) < thresholdDate
  );

  return (churnedCustomers.length / customerLastOrders.length) * 100;
}

/**
 * Generate cohort retention data
 */
export interface CohortData {
  cohort: string;
  customers: number;
  retention: { [key: string]: number };
}

export function generateCohortData(orders: Order[]): CohortData[] {
  // Group customers by their first order month
  const customerFirstOrder = new Map<string, Date>();

  orders.forEach((order) => {
    if (!customerFirstOrder.has(order.customerId)) {
      customerFirstOrder.set(order.customerId, new Date(order.createdAt));
    } else {
      const existing = customerFirstOrder.get(order.customerId)!;
      if (new Date(order.createdAt) < existing) {
        customerFirstOrder.set(order.customerId, new Date(order.createdAt));
      }
    }
  });

  // Group by cohort month
  const cohorts = new Map<string, Set<string>>();

  customerFirstOrder.forEach((firstOrderDate, customerId) => {
    const cohortKey = `${firstOrderDate.getFullYear()}-${String(
      firstOrderDate.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!cohorts.has(cohortKey)) {
      cohorts.set(cohortKey, new Set());
    }
    cohorts.get(cohortKey)!.add(customerId);
  });

  // Calculate retention for each cohort
  const cohortData: CohortData[] = [];

  cohorts.forEach((customerIds, cohortKey) => {
    const cohortOrders = orders.filter((o) => customerIds.has(o.customerId));

    // Calculate retention for each month after cohort
    const retention: { [key: string]: number } = {};
    const [cohortYear, cohortMonth] = cohortKey.split("-").map(Number);

    for (let monthOffset = 0; monthOffset <= 12; monthOffset++) {
      const targetDate = new Date(cohortYear, cohortMonth - 1 + monthOffset);
      const targetKey = `M${monthOffset}`;

      const activeCustomers = new Set(
        cohortOrders
          .filter((o) => {
            const orderDate = new Date(o.createdAt);
            return (
              orderDate.getFullYear() === targetDate.getFullYear() &&
              orderDate.getMonth() === targetDate.getMonth()
            );
          })
          .map((o) => o.customerId)
      );

      retention[targetKey] = (activeCustomers.size / customerIds.size) * 100;
    }

    cohortData.push({
      cohort: cohortKey,
      customers: customerIds.size,
      retention,
    });
  });

  return cohortData.sort((a, b) => b.cohort.localeCompare(a.cohort));
}

/**
 * Simple linear regression forecast
 */
export interface ForecastPoint {
  date: string;
  actual?: number;
  forecast: number;
}

export function forecastRevenue(
  historicalData: { date: string; revenue: number }[],
  forecastDays: number = 30
): ForecastPoint[] {
  if (historicalData.length < 2) return [];

  // Convert dates to numeric values (days since first date)
  const firstDate = new Date(historicalData[0].date);
  const dataPoints = historicalData.map((d, i) => ({
    x: i,
    y: d.revenue,
  }));

  // Calculate linear regression
  const n = dataPoints.length;
  const sumX = dataPoints.reduce((sum, p) => sum + p.x, 0);
  const sumY = dataPoints.reduce((sum, p) => sum + p.y, 0);
  const sumXY = dataPoints.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = dataPoints.reduce((sum, p) => sum + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Generate forecast
  const result: ForecastPoint[] = [];

  // Add historical data with forecast line
  historicalData.forEach((d, i) => {
    result.push({
      date: d.date,
      actual: d.revenue,
      forecast: slope * i + intercept,
    });
  });

  // Add future forecast
  for (let i = 0; i < forecastDays; i++) {
    const futureDate = new Date(firstDate);
    futureDate.setDate(futureDate.getDate() + historicalData.length + i);

    result.push({
      date: futureDate.toISOString().split("T")[0],
      forecast: slope * (historicalData.length + i) + intercept,
    });
  }

  return result;
}

/**
 * Calculate product performance metrics
 */
export interface ProductPerformance {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
  averagePrice: number;
  profitMargin?: number;
}

export function analyzeProductPerformance(
  orderItems: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[]
): ProductPerformance[] {
  const productStats = new Map<string, {
    name: string;
    sold: number;
    revenue: number;
  }>();

  orderItems.forEach((item) => {
    const existing = productStats.get(item.productId) || {
      name: item.productName,
      sold: 0,
      revenue: 0,
    };

    existing.sold += item.quantity;
    existing.revenue += item.price * item.quantity;

    productStats.set(item.productId, existing);
  });

  return Array.from(productStats.entries())
    .map(([productId, stats]) => ({
      productId,
      productName: stats.name,
      totalSold: stats.sold,
      revenue: stats.revenue,
      averagePrice: stats.revenue / stats.sold,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}
