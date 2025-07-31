import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Control,
  type FieldValues,
  type Path,
} from "./imports";


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
