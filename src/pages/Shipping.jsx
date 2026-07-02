const stats = [
  { label: "Shipping zones", value: "12", detail: "Configured regions" },
  { label: "Avg. delivery", value: "3.2 days", detail: "Domestic orders" },
  { label: "Carrier issues", value: "4", detail: "Need attention" },
];

const rows = [
  { zone: "Domestic Standard", carrier: "DHL", rate: "$6.99", status: "Active" },
  { zone: "Domestic Express", carrier: "FedEx", rate: "$14.99", status: "Active" },
  { zone: "International", carrier: "UPS", rate: "Calculated", status: "Review" },
];

export default function Shipping() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <nav className="text-sm text-muted-foreground">Settings / Shipping</nav>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Shipping</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Manage shipping zones, carrier rates, and delivery configuration.
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
          <h2 className="font-semibold">Shipping Rules</h2>
          <p className="mt-1 text-sm text-muted-foreground">Starter list for carrier and zone management.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Zone</th>
                <th className="px-5 py-3">Carrier</th>
                <th className="px-5 py-3">Rate</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.zone}>
                  <td className="px-5 py-4 font-medium">{row.zone}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.carrier}</td>
                  <td className="px-5 py-4">{row.rate}</td>
                  <td className="px-5 py-4">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
