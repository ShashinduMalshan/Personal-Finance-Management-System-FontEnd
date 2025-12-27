
type ToggleSwitchProps = {
  label?: string
  value: boolean
  onChange?: (value: boolean) => void
}

const ToggleSwitch = ({ label, value, onChange }: ToggleSwitchProps) => {
  const handleChange = () => {
    onChange?.(!value)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="relative inline-block">
        <input
          type="checkbox"
          checked={value}
          onChange={handleChange}
          className="sr-only peer"
        />
        {/* Track - Scaled to 44px x 24px */}
        <div
          onClick={handleChange}
          className="
            w-11 h-6 bg-gray-300 rounded-full cursor-pointer 
            transition-colors duration-200 ease-in-out
            peer-checked:bg-emerald-500
          "
        >
          {/* Knob - Scaled to 18px */}
          <div
            className={`
              absolute top-[3px] left-[3px] bg-white w-[18px] h-[18px] rounded-full 
              shadow-sm transition-transform duration-200 ease-in-out
              ${value ? "translate-x-5" : "translate-x-0"}
            `}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ToggleSwitch