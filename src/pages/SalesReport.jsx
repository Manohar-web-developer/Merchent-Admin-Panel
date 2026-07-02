const stats = [
  { label: "Gross sales", value: "$82.6K", detail: "This month" },
  { label: "Orders", value: "1,284", detail: "Across all channels" },
  { label: "Conversion", value: "4.8%", detail: "Storefront average" },
];

const rows = [
  { channel: "Online Store", orders: "826", sales: "$52.1K", trend: "+12%" },
  { channel: "Marketplace", orders: "318", sales: "$21.4K", trend: "+7%" },
  { channel: "Wholesale", orders: "140", sales: "$9.1K", trend: "-2%" },
];

export default function SalesReport() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">Analytics / Sales Report</nav>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Sales Report</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor sales performance by channel, order volume, and growth trend.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card shadow-sm">
        <div className="border-b p-5">
          <h2 className="font-semibold">Channel Performance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Starter table for sales reporting and filters.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Channel</th>
                <th className="px-5 py-3">Orders</th>
                <th className="px-5 py-3">Sales</th>
                <th className="px-5 py-3">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.channel}>
                  <td className="px-5 py-4 font-medium">{row.channel}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.orders}</td>
                  <td className="px-5 py-4">{row.sales}</td>
                  <td className="px-5 py-4">{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
