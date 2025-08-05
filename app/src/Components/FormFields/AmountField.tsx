import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";


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
