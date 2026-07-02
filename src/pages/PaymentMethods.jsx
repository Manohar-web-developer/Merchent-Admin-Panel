const stats = [
  { label: "Enabled methods", value: "5", detail: "Available at checkout" },
  { label: "Success rate", value: "98.4%", detail: "Last 7 days" },
  { label: "Pending payouts", value: "$14.2K", detail: "Processing" },
];

const rows = [
  { method: "Credit Card", provider: "Stripe", status: "Enabled", volume: "$42.5K" },
  { method: "PayPal", provider: "PayPal", status: "Enabled", volume: "$16.8K" },
  { method: "Bank Transfer", provider: "Manual", status: "Review", volume: "$4.2K" },
];

export default function PaymentMethods() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">Settings / Payment Methods</nav>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Payment Methods</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Configure checkout payment options, providers, and payout readiness.
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
          <h2 className="font-semibold">Payment Providers</h2>
          <p className="mt-1 text-sm text-muted-foreground">Placeholder settings table for payment configuration.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Provider</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.method}>
                  <td className="px-5 py-4 font-medium">{row.method}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.provider}</td>
                  <td className="px-5 py-4">{row.status}</td>
                  <td className="px-5 py-4">{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
