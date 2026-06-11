import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DataTable from "../components/shared/DataTable";
import Input from "../components/shared/Input";
import LoadingButton from "../components/shared/LoadingButton";
import Modal from "../components/shared/Modal";
import { createPlan, deactivatePlan, getPlans, updatePlan, type PlanPayload } from "../services/plan.service";
import type { Plan } from "../types/api";

function money(value = 0) {
  return `PKR ${value.toLocaleString()}`;
}

export default function Plans() {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const plansQuery = useQuery({ queryKey: ["plans", false], queryFn: () => getPlans(false) });

  const createMutation = useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      toast.success("Plan created");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<PlanPayload> & { isActive?: boolean } }) => updatePlan(id, payload),
    onSuccess: () => {
      toast.success("Plan updated");
      setOpen(false);
      setEditingPlan(null);
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => toast.error(error.message),
  });
  const deactivateMutation = useMutation({
    mutationFn: deactivatePlan,
    onSuccess: () => {
      toast.success("Plan deactivated");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (error) => toast.error(error.message),
  });

  function submitPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: PlanPayload = {
      name: String(formData.get("name")),
      price: Number(formData.get("price")),
      description: String(formData.get("description") || ""),
    };

    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, payload });
      return;
    }

    createMutation.mutate(payload);
  }

  return (
    <DashboardLayout eyebrow="Plans" title="Internet plans">
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditingPlan(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add plan
        </button>
      </div>

      <DataTable
        data={plansQuery.data?.plans ?? []}
        isLoading={plansQuery.isLoading}
        columns={[
          { header: "Name", render: plan => <span className="font-bold">{plan.name}</span> },
          { header: "Price", render: plan => <span className="font-heading font-black">{money(plan.price)}</span> },
          { header: "Description", render: plan => plan.description ?? "-" },
          { header: "Status", render: plan => <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${plan.isActive ? "bg-success/10 text-success" : "bg-text-muted/10 text-text-muted"}`}>{plan.isActive ? "active" : "inactive"}</span> },
          {
            header: "Actions",
            render: plan => (
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditingPlan(plan); setOpen(true); }} className="rounded-xl border border-border px-3 py-2 text-xs font-bold">Edit</button>
                {plan.isActive && <button type="button" disabled={deactivateMutation.isPending} onClick={() => deactivateMutation.mutate(plan.id)} className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-danger disabled:opacity-60">Deactivate</button>}
              </div>
            ),
          },
        ]}
      />

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title={editingPlan ? "Update plan" : "Create plan"}>
        <form onSubmit={submitPlan} className="space-y-4">
          <Input name="name" label="Plan name" required defaultValue={editingPlan?.name} />
          <Input name="price" label="Plan price" required type="number" min={1} defaultValue={editingPlan?.price} />
          <Input name="description" label="Description" defaultValue={editingPlan?.description ?? ""} />
          <LoadingButton type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>
            {editingPlan ? "Update plan" : "Create plan"}
          </LoadingButton>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
