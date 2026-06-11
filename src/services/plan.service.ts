import { apiRequest } from "../lib/api";
import type { Plan } from "../types/api";

export type PlanPayload = {
  name: string;
  price: number;
  description?: string;
};

export function getPlans(activeOnly = true) {
  return apiRequest<{ plans: Plan[] }>(`/plans?activeOnly=${activeOnly}`, {
    auth: true,
  });
}

export function createPlan(payload: PlanPayload) {
  return apiRequest<{ plan: Plan }>("/plans", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function updatePlan(planId: string, payload: Partial<PlanPayload> & { isActive?: boolean }) {
  return apiRequest<{ plan: Plan }>(`/plans/${planId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function deactivatePlan(planId: string) {
  return apiRequest<{ plan: Plan }>(`/plans/${planId}`, {
    method: "DELETE",
    auth: true,
  });
}
