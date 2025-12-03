import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: LucideIcon;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, icon: Icon, value, onChange, name }) => {
  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type={type}
        name={name}
        className="block w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 text-sm font-light"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default InputField;