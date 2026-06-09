import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Wifi } from "lucide-react";
import Stepper from "../components/onboarding/Stepper";
import RegisterForm, {
  type RegisterData,
} from "../components/onboarding/RegisterForm";
import StoreForm, {
  type StoreFormData,
} from "../components/onboarding/StoreForm";
import { useAuth } from "../context/useAuth";
import { registerUser } from "../services/auth.service";
import { createStore } from "../services/store.service";

const STEPS = [
  { number: 1, label: "Your Account" },
  { number: 2, label: "Provider Info" },
];

export default function Onboarding() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const step = Number(searchParams.get("step") ?? "1");

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) =>
      registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    onSuccess: (session) => {
      auth.setSession(session);
      toast.success("Account created and activated");
      navigate("/onboarding?step=2");
    },
    onError: (error) => toast.error(error.message),
  });

  const storeMutation = useMutation({
    mutationFn: (data: StoreFormData) => createStore(data),
    onSuccess: () => {
      toast.success("ISP store created successfully");
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px]">
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center">
            <Wifi size={18} color="white" />
          </div>
          <span
            className="text-xl font-extrabold text-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            NetFlow
          </span>
        </div>

        <Stepper steps={STEPS} currentStep={step} />

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <>
              <h2
                className="text-[22px] font-extrabold text-text mb-1.5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Create your account
              </h2>
              <p className="text-sm text-text-muted mb-7 leading-relaxed">
                Start by setting up your personal account. Takes less than a
                minute.
              </p>
              <RegisterForm
                onSubmit={(data) => registerMutation.mutate(data)}
                isLoading={registerMutation.isPending}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2
                className="text-[22px] font-extrabold text-text mb-1.5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Set up your ISP
              </h2>
              <p className="text-sm text-text-muted mb-7 leading-relaxed">
                Tell us about your internet service provider. This is what your
                customers will see.
              </p>
              <StoreForm
                onSubmit={(data) => storeMutation.mutate(data)}
                isLoading={storeMutation.isPending}
              />
            </>
          )}
        </div>

        <p className="text-center text-[13px] text-text-muted mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
