import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import type { Control, FieldValues, Path } from 'react-hook-form';

interface AmountFieldProps<T extends FieldValues>{
    control: Control<T>
    amount: Path<T>
}

export default function AmountField<T extends FieldValues>({control, amount,}: AmountFieldProps<T>){
    return (
        <FormField
          control={control}
          name={amount}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={amount}>{amount}</FormLabel>
              <FormControl>
                <Input 
                type="number"                    
                placeholder={amount} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
