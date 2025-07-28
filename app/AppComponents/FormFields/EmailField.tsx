import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import type { Control, FieldValues, Path } from 'react-hook-form';

interface EmailFieldProps<T extends FieldValues>{
    control: Control<T>
    email: Path<T>
}

export default function EmailField<T extends FieldValues>({control, email,}: EmailFieldProps<T>){
    return (
        <FormField
          control={control}
          name={email}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={email}>{email}</FormLabel>
              <FormControl>
                <Input 
                type="email"                   
                
                placeholder={email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
