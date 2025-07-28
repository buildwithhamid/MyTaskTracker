import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import type { Control, FieldValues, Path } from 'react-hook-form';

interface CategoryFieldProps<T extends FieldValues>{
    control: Control<T>
    category: Path<T>
    list: String[]
}

export default function CategoryField<T extends FieldValues>({control, category, list}: CategoryFieldProps<T>){
    return (
        <FormField
          control={control}
          name={category}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={category}>
                {category}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${category}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {list.map((cat)=>(
                    <SelectItem key={cat.toString()} value={cat.toString()}>
                        {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
    );
}
