import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DataTable from "../components/shared/DataTable";
import PageLoader from "../components/shared/PageLoader";
import { getCustomer } from "../services/customer.service";

function money(value = 0) {
  return `PKR ${value.toLocaleString()}`;
}

function statusClass(status?: string) {
  if (status === "paid") return "bg-success/10 text-success";
  if (status === "overdue") return "bg-danger/10 text-danger";
  if (status === "partial") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

export default function CustomerDetail() {
  const { id } = useParams();
  const customerQuery = useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomer(id as string),
    enabled: Boolean(id),
  });

  if (customerQuery.isLoading) {
    return <PageLoader message="Loading customer" />;
  }

  const customer = customerQuery.data?.customer;

  return (
    <DashboardLayout eyebrow="Customer" title={customer?.name ?? "Customer details"}>
      <Link to="/dashboard/customers" className="mb-4 inline-flex text-sm font-bold text-primary hover:underline">Back to customers</Link>

      <div className="mb-5 grid gap-4 rounded-2xl border border-border bg-surface p-5 md:grid-cols-4">
        <div>
          <p className="text-sm text-text-muted">Username</p>
          <p className="font-bold">@{customer?.username}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">Plan</p>
          <p className="font-bold">{customer?.plan?.name ?? "-"}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">Current status</p>
          <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(customer?.paymentStatus)}`}>{customer?.paymentStatus}</span>
        </div>
        <div>
          <p className="text-sm text-text-muted">Outstanding</p>
          <p className="font-heading text-xl font-black">{money(customer?.totalOutstanding)}</p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section>
          <h2 className="mb-3 font-heading text-xl font-black">Billing history</h2>
          <DataTable
            data={customer?.billingPeriods ?? []}
            columns={[
              { header: "Start", render: period => period.periodStart },
              { header: "End", render: period => period.periodEnd },
              { header: "Due", render: period => money(period.amountDue) },
              { header: "Paid", render: period => money(period.amountPaid) },
              { header: "Balance", render: period => money(period.balance) },
              { header: "Status", render: period => <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(period.status)}`}>{period.status}</span> },
            ]}
          />
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl font-black">Payment history</h2>
          <DataTable
            data={customer?.payments ?? []}
            columns={[
              { header: "Amount", render: payment => money(payment.amount) },
              { header: "Method", render: payment => payment.method },
              { header: "Paid at", render: payment => new Date(payment.paidAt).toLocaleString() },
              { header: "Credit", render: payment => money(payment.unappliedAmount) },
            ]}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}
