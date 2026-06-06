import { useSearchParams } from "react-router"
import { Wifi } from "lucide-react"
import Stepper from "../components/onboarding/Stepper"
import RegistorForm from "../components/onboarding/RegisterForm"
import StoreForm from "../components/onboarding/StoreForm"

const STEPS = [
  { number: 1, label: "Your Account" },
  { number: 2, label: "Provider Info" },
]

export default function Onboarding() {
  const [searchParams] = useSearchParams()
  const step = Number(searchParams.get("step") ?? "1")

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px]">

        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center">
            <Wifi size={18} color="white" />
          </div>
          <span className="text-xl font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>
            NetFlow
          </span>
        </div>

        <Stepper steps={STEPS} currentStep={step} />

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <>
              <h2 className="text-[22px] font-extrabold text-text mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                Create your account
              </h2>
              <p className="text-sm text-text-muted mb-7 leading-relaxed">
                Start by setting up your personal account. Takes less than a minute.
              </p>
              <RegistorForm onSubmit={(data) => console.log(data)} />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-[22px] font-extrabold text-text mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                Set up your ISP
              </h2>
              <p className="text-sm text-text-muted mb-7 leading-relaxed">
                Tell us about your internet service provider. This is what your customers will see.
              </p>
              <StoreForm onSubmit={(data) => console.log(data)} />
            </>
          )}
        </div>

        <p className="text-center text-[13px] text-text-muted mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">Sign in</a>
        </p>

      </div>
    </div>
  )
}
