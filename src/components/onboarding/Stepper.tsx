type Step = {
  number: number
  label: string
}

type StepperProps = {
  steps: Step[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => {
        const done = currentStep > step.number
        const active = currentStep === step.number
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className={`
                w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${done || active ? "bg-primary border-primary" : "bg-transparent border-border"}
              `}>
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={`text-[13px] font-bold ${active ? "text-white" : "text-text-muted"}`}>
                    {step.number}
                  </span>
                )}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${active || done ? "text-primary" : "text-text-muted"}`}>
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className={`w-20 h-0.5 mx-2 mb-6 transition-colors duration-300 ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
