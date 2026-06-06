import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react"

type InputProps = {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onRightIconClick?: () => void
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, required, leftIcon, rightIcon, onRightIconClick, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[13px] font-semibold text-text">
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-text-muted flex items-center pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            className={`
              w-full h-10 text-sm text-text bg-surface rounded-[10px] outline-none
              border-[1.5px] transition-all duration-150
              placeholder:text-text-muted/50
              focus:border-primary focus:ring-2 focus:ring-primary/10
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border"}
              ${leftIcon ? "pl-9" : "px-3"}
              ${rightIcon ? "pr-9" : "px-3"}
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <span
              onClick={onRightIconClick}
              className={`absolute right-3 text-text-muted flex items-center ${onRightIconClick ? "cursor-pointer" : ""}`}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <span className="text-[12px] text-danger">{error}</span>
        )}

        {!error && hint && (
          <span className="text-[12px] text-text-muted">{hint}</span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
export default Input
