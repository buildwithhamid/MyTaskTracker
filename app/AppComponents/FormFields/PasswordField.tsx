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

interface PasswordFieldProps<T extends FieldValues>{
    control: Control<T>
    Password: Path<T>
}

export default function PasswordField<T extends FieldValues>({control, Password,}: PasswordFieldProps<T>){
    return (
        <FormField
          control={control}
          name={Password}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={Password} >{Password}</FormLabel>
              <FormControl>
                <Input 
                type="password"                    
                
                placeholder={Password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
