import { Textarea } from "~/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import type { Control, FieldValues, Path } from 'react-hook-form';

interface NameFieldProps<T extends FieldValues>{
    control: Control<T>
    desc: Path<T>
}

export default function TextAreaField<T extends FieldValues>({control, desc,}: NameFieldProps<T>){
    return (
        <FormField
          control={control}
          name={desc}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={desc}>{desc}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Here is description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    );
}
