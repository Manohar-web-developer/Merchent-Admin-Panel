const stats = [
  { label: "Delivered today", value: "64", detail: "Completed shipments" },
  { label: "On-time rate", value: "96%", detail: "Last 30 days" },
  { label: "Delivered value", value: "$18.7K", detail: "Today" },
];

const rows = [
  { id: "#ORD-2382", customer: "Sophia Lee", delivered: "Today, 10:24 AM", total: "$144.00" },
  { id: "#ORD-2376", customer: "Daniel Cruz", delivered: "Today, 9:12 AM", total: "$72.25" },
  { id: "#ORD-2369", customer: "Emma Brooks", delivered: "Yesterday", total: "$428.90" },
];

export default function DeliveredOrders() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">Orders / Delivered</nav>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Delivered Orders</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Review completed deliveries, customer handoffs, and fulfillment performance.
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
          <h2 className="font-semibold">Recent Deliveries</h2>
          <p className="mt-1 text-sm text-muted-foreground">Placeholder list for delivered order history.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Delivered</th>
                <th className="px-5 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-4 font-medium">{row.id}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.customer}</td>
                  <td className="px-5 py-4">{row.delivered}</td>
                  <td className="px-5 py-4">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
