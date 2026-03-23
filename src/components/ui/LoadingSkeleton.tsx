export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-24" />
      </td>
    </tr>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-24 mb-2" />
      <div className="h-2 bg-gray-200 rounded w-16" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      </div>
      <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
