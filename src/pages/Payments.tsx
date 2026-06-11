import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DataTable from "../components/shared/DataTable";
import Input from "../components/shared/Input";
import { getPayments } from "../services/payment.service";
import { getLocalMonthString } from "../lib/date";

function money(value = 0) {
  return `PKR ${value.toLocaleString()}`;
}

export default function Payments() {
  const [month, setMonth] = useState(getLocalMonthString());
  const paymentsQuery = useQuery({
    queryKey: ["payments", month],
    queryFn: () => getPayments({ month }),
  });

  return (
    <DashboardLayout eyebrow="Payments" title="Monthly payment records">
      <div className="mb-5 grid gap-4 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[220px_1fr_1fr]">
        <Input label="Month" type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
        <div className="rounded-xl bg-bg p-4">
          <p className="text-sm text-text-muted">Collected</p>
          <p className="mt-1 font-heading text-2xl font-black">{money(paymentsQuery.data?.totals.total)}</p>
        </div>
        <div className="rounded-xl bg-bg p-4">
          <p className="text-sm text-text-muted">Credit / unapplied</p>
          <p className="mt-1 font-heading text-2xl font-black">{money(paymentsQuery.data?.totals.unappliedTotal)}</p>
        </div>
      </div>

      <DataTable
        data={paymentsQuery.data?.payments ?? []}
        isLoading={paymentsQuery.isLoading}
        columns={[
          { header: "#", render: (_, index) => index + 1 },
          { header: "Customer", render: payment => payment.customer?.name ?? "-" },
          { header: "Amount", render: payment => <span className="font-heading font-black">{money(payment.amount)}</span> },
          { header: "Method", render: payment => payment.method },
          { header: "Paid at", render: payment => new Date(payment.paidAt).toLocaleString() },
          { header: "Unapplied", render: payment => money(payment.unappliedAmount) },
          { header: "Reference", render: payment => payment.reference ?? "-" },
        ]}
      />
    </DashboardLayout>
  );
}
