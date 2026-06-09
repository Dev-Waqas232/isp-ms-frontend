import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Wifi } from "lucide-react";

import LoginForm, { type LoginData } from "../components/onboarding/LoginForm";
import { useAuth } from "../context/useAuth";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
    onSuccess: (session) => {
      auth.setSession(session);
      toast.success("Sign in successful!");
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[460px]">
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center">
            <Wifi size={18} color="white" />
          </div>
          <span className="text-xl font-extrabold text-text font-heading">
            NetFlow
          </span>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-[22px] font-extrabold text-text mb-1.5 font-heading">
            Sign in
          </h2>
          <p className="text-sm text-text-muted mb-7 leading-relaxed">
            Continue managing your ISP customers, payments, expenses, and
            revenue.
          </p>
          <LoginForm
            onSubmit={(data) => loginMutation.mutate(data)}
            isLoading={loginMutation.isPending}
          />
        </div>

        <p className="text-center text-[13px] text-text-muted mt-6">
          Need an account?{" "}
          <Link
            to="/onboarding"
            className="text-primary font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
