import React from 'react'
import Input from '../ui/Input';
import { Controller, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IncomeFormData, Income } from '../../types'
import { IncomeFields } from '../../utils/helper';
import EmojiPicker from '../EmojiPicker';

interface AddIncomeFormProps {
  onAddIncome: (income: Income) => void;
  onCancel?: () => void;
}

const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ onAddIncome, onCancel }) => {
  const { control, reset, handleSubmit, formState: { isSubmitting } } = useForm<IncomeFormData>({
     defaultValues: {
    title: "",
    amount: 0, // Changed from 0 to ""
    category: "",
    date: "",
  }
  });  

  const onSubmit: SubmitHandler<IncomeFormData> = async (data) => {
    try {
      onAddIncome(data as Income);
      reset();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <Controller 
          name='icon'
          control={control}
          render={({ field }) => (
            <EmojiPicker
              icon={field.value}
              onSelect={(icon) => field.onChange(icon)}
            />
          )}
        />
        {IncomeFields.map((field) => (
          <div key={field.name} className={field.name === 'title' ? 'sm:col-span-2' : ''}>
            <Input
              label={field.label}
              name={field.name}
              type={field.type}
              rules={field.rules}
              control={control}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="
              w-full sm:w-auto px-6 py-2
              border border-border
              text-muted-foreground hover:text-foreground
              bg-transparent hover:bg-hover-muted
              rounded-lg transition-colors
            "
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="
            w-full sm:flex-1
            bg-primary hover:bg-primary-hover
            text-primary-foreground font-medium
            py-2 px-6 rounded-lg
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? 'Adding...' : 'Add Income'}
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;