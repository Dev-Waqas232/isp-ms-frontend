import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DataTable from "../components/shared/DataTable";
import Input from "../components/shared/Input";
import LoadingButton from "../components/shared/LoadingButton";
import Modal from "../components/shared/Modal";
import Pagination from "../components/shared/Pagination";
import { createCustomer, deactivateCustomer, getCustomers, updateCustomer, type CustomerPayload } from "../services/customer.service";
import { getPlans } from "../services/plan.service";
import { recordPayment } from "../services/payment.service";
import type { Customer, PaymentMethod } from "../types/api";

const methods: PaymentMethod[] = ["cash", "bank", "easypaisa"];

function money(value = 0) {
  return `PKR ${value.toLocaleString()}`;
}

function statusClass(status?: string) {
  if (status === "paid") return "bg-success/10 text-success";
  if (status === "overdue") return "bg-danger/10 text-danger";
  if (status === "partial") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

export default function Customers() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [paymentCustomer, setPaymentCustomer] = useState<Customer | null>(null);
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);

  const customersQuery = useQuery({
    queryKey: ["customers", page, search],
    queryFn: () => getCustomers({ page, limit: 10, search, status: "active" }),
  });
  const plansQuery = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlans(true),
  });

  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      toast.success("Customer created");
      setCustomerModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CustomerPayload> }) => updateCustomer(id, payload),
    onSuccess: () => {
      toast.success("Customer updated");
      setCustomerModalOpen(false);
      setEditingCustomer(null);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const deactivateMutation = useMutation({
    mutationFn: deactivateCustomer,
    onSuccess: () => {
      toast.success("Customer marked inactive");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const paymentMutation = useMutation({
    mutationFn: recordPayment,
    onSuccess: () => {
      toast.success("Payment recorded");
      setPaymentCustomer(null);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => toast.error(error.message),
  });

  function submitCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: CustomerPayload = {
      name: String(formData.get("name")),
      username: String(formData.get("username")),
      phoneNumber: String(formData.get("phoneNumber")),
      address: String(formData.get("address") || ""),
      planId: String(formData.get("planId")),
      activationDate: String(formData.get("activationDate")),
    };

    if (editingCustomer) {
      updateMutation.mutate({ id: editingCustomer.id, payload });
      return;
    }

    createMutation.mutate(payload);
  }

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!paymentCustomer) return;
    const formData = new FormData(event.currentTarget);
    paymentMutation.mutate({
      customerId: paymentCustomer.id,
      amount: Number(formData.get("amount")),
      method: String(formData.get("method")) as PaymentMethod,
      paidAt: String(formData.get("paidAt")),
      reference: String(formData.get("reference") || ""),
      notes: String(formData.get("notes") || ""),
    });
  }

  return (
    <DashboardLayout eyebrow="Customers" title="Customer records">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Search by name, username, or phone"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="bg-surface"
        />
        <button
          type="button"
          onClick={() => {
            setEditingCustomer(null);
            setCustomerModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add customer
        </button>
      </div>

      <DataTable
        data={customersQuery.data?.customers ?? []}
        isLoading={customersQuery.isLoading}
        columns={[
          { header: "Customer", render: customer => <Link to={`/dashboard/customers/${customer.id}`} className="font-bold text-primary hover:underline">{customer.name}<span className="block text-xs font-medium text-text-muted">@{customer.username}</span></Link> },
          { header: "Phone", render: customer => customer.phoneNumber },
          { header: "Plan", render: customer => customer.plan?.name ?? "-" },
          { header: "Expires", render: customer => customer.expirationDate },
          { header: "Status", render: customer => <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(customer.paymentStatus)}`}>{customer.paymentStatus}</span> },
          { header: "Outstanding", render: customer => <span className="font-heading font-black">{money(customer.totalOutstanding)}</span> },
          {
            header: "Actions",
            render: customer => (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setPaymentCustomer(customer)} className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-primary">Pay</button>
                <button type="button" onClick={() => { setEditingCustomer(customer); setCustomerModalOpen(true); }} className="rounded-xl border border-border px-3 py-2 text-xs font-bold">Edit</button>
                <button type="button" onClick={() => deactivateMutation.mutate(customer.id)} disabled={deactivateMutation.isPending} className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-danger disabled:opacity-60">Inactive</button>
              </div>
            ),
          },
        ]}
      />

      <div className="mt-4">
        <Pagination
          page={customersQuery.data?.pagination.page ?? page}
          totalPages={customersQuery.data?.pagination.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>

      <Modal
        isOpen={isCustomerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        title={editingCustomer ? "Update customer" : "Create customer"}
      >
        <form onSubmit={submitCustomer} className="space-y-4">
          <Input name="name" label="Name" required defaultValue={editingCustomer?.name} />
          <Input name="username" label="Username" required defaultValue={editingCustomer?.username} />
          <Input name="phoneNumber" label="Phone number" required defaultValue={editingCustomer?.phoneNumber} />
          <Input name="address" label="Address" defaultValue={editingCustomer?.address ?? ""} />
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text">Plan</label>
            <select name="planId" required defaultValue={editingCustomer?.planId ?? ""} className="h-10 rounded-[10px] border-[1.5px] border-border bg-surface px-3 text-sm outline-none focus:border-primary">
              <option value="">Select plan</option>
              {plansQuery.data?.plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name} - {money(plan.price)}</option>)}
            </select>
          </div>
          <Input name="activationDate" label="Activation date" required type="date" defaultValue={editingCustomer?.activationDate ?? new Date().toISOString().slice(0, 10)} />
          <LoadingButton type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>
            {editingCustomer ? "Update customer" : "Create customer"}
          </LoadingButton>
        </form>
      </Modal>

      <Modal isOpen={Boolean(paymentCustomer)} onClose={() => setPaymentCustomer(null)} title="Record payment">
        <form onSubmit={submitPayment} className="space-y-4">
          <p className="rounded-xl bg-bg p-3 text-sm text-text-muted">
            Recording payment for <span className="font-bold text-text">{paymentCustomer?.name}</span>
          </p>
          <Input name="amount" label="Amount" required type="number" min={1} />
          <Input name="paidAt" label="Paid at" required type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text">Method</label>
            <select name="method" className="h-10 rounded-[10px] border-[1.5px] border-border bg-surface px-3 text-sm outline-none focus:border-primary">
              {methods.map(method => <option key={method} value={method}>{method}</option>)}
            </select>
          </div>
          <Input name="reference" label="Reference" />
          <Input name="notes" label="Notes" />
          <LoadingButton type="submit" isLoading={paymentMutation.isPending}>Record payment</LoadingButton>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
