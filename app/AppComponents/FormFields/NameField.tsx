import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import type { Control, FieldValues, Path } from 'react-hook-form';

interface NameFieldProps<T extends FieldValues>{
    control: Control<T>
    name: Path<T>
}

export default function NameField<T extends FieldValues>({control, name,}: NameFieldProps<T>){
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={name}>{name}</FormLabel>
              <FormControl>
                <Input 
                
                type="name"                    
                placeholder={name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
