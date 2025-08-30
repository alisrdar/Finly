import React from 'react'
import { useForm } from 'react-hook-form';
import type { RegisterOptions } from 'react-hook-form';

interface DynamicFormProps {
  fields: Array<{
    name: string;
    label: string;
    type: string;
    rules: RegisterOptions;
  }>;
  initialData?: Record<string, RegisterOptions>;
  onSubmit: (data: Record<string, RegisterOptions>) => void;
}

const DynamicForm = ({
  fields,
  initialData = {},
  onSubmit
}: DynamicFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  return (
    <div className='space-y-4 '>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((feild) => (
          <div key={feild.name} className='mb-4'>
            <label htmlFor={feild.name} className='block mb-1'>
              {feild.label}
            </label>
            <input
              type={feild.type}
              id={feild.name}
              {...register(feild.name, feild.rules)}
            />

            {errors[feild.name] && (
              <p className='text-red-500'>{errors[feild.name]?.message}</p>
            )}
          </div>
        ))}
      </form>

    </div>
  )
}

export default DynamicForm
