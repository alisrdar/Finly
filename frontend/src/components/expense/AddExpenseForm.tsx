import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { ExpenseFormData, Expense } from '../../types'
import { ExpenseFields } from '../../utils/helper';
import EmojiPickerPop from '../EmojiPickerPop';
import Input from '../ui/Input';


const AddExpenseForm: React.FC<{
    onAddExpense: (expense: Expense) => void;
    onCancel: () => void
}> = ({
    onAddExpense, onCancel
}) => {

        const { control, reset, handleSubmit, formState: { isSubmitting } } = useForm<ExpenseFormData>({
            defaultValues: {
                title: "",
                amount: 0, // Changed from 0 to ""
                category: "",
                date: "",
            }
        });

        const onSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
            try {
                onAddExpense(data as Expense);
                reset();
            } catch (error) {
                console.error('Error adding expense:', error);
                // toast.error('Error adding expense');
            }
        }
        return (
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name='icon'
                        control={control}
                        render={({ field }) => (
                            <EmojiPickerPop
                                icon={field.value}
                                onSelect={(icon) => field.onChange(icon)}
                            />
                        )}
                    />
                    {ExpenseFields.map((field) => (
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
                                border border-border cursor-pointer
                                text-muted-foreground hover:text-foreground
                                hover:bg-slate-300/60 hover:text-white
                                bg-transparent hover:bg-hover-muted
                                transition-all ease-in-out duration-300
                                rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            w-full sm:flex-1
                            bg-primary hover:bg-primary/60
                            text-primary-foreground font-medium
                            py-2 px-6 rounded-lg
                            transition-all ease-in-out duration-300
                            cursor-pointer
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {isSubmitting ? 'Adding...' : 'Add Expense'}
                    </button>
                </div>
            </form>
        )
    }

export default AddExpenseForm
