const stats = [
  { label: "Net revenue", value: "$68.9K", detail: "After refunds" },
  { label: "Refund rate", value: "2.1%", detail: "Last 30 days" },
  { label: "Avg. order value", value: "$74.80", detail: "Monthly average" },
];

const rows = [
  { source: "Product Sales", amount: "$62.4K", fees: "$3.1K", net: "$59.3K" },
  { source: "Shipping Fees", amount: "$6.8K", fees: "$420", net: "$6.4K" },
  { source: "Gift Cards", amount: "$3.7K", fees: "$90", net: "$3.6K" },
];

export default function Revenue() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">Analytics / Revenue</nav>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Revenue</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Track revenue sources, processing fees, refunds, and net earnings.
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
          <h2 className="font-semibold">Revenue Breakdown</h2>
          <p className="mt-1 text-sm text-muted-foreground">Placeholder financial summary for admin review.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Fees</th>
                <th className="px-5 py-3">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.source}>
                  <td className="px-5 py-4 font-medium">{row.source}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.amount}</td>
                  <td className="px-5 py-4">{row.fees}</td>
                  <td className="px-5 py-4">{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
