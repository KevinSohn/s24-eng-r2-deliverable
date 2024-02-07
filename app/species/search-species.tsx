import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

// We use zod (z) to define a schema for the "Add species" form.
// zod handles validation of the input values with methods like .string(), .nullable(). It also processes the form inputs with .transform() before the inputs are sent to the database.

// Define kingdom enum for use in Zod schema and displayingdropdown options in the form

type Callback = (value: string) => void;
const FormSchema = z.object({
  animalSearch: z.string().min(2, {
    message: "Query must be at least 2 characters.",
  }),
});

export default function SearchSpeciesDialog({ handleSearch }: { handleSearch: Callback }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      animalSearch: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSearch(data.animalSearch);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}
        className="space-y- mt-5 flex  flex-row justify-center"
      >
        <FormField
          control={form.control}
          name="animalSearch"
          render={({ field }) => (
            <FormItem className="mr-3 flex grow">
              <FormControl>
                <Input placeholder="Search for an organism" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="grow-0" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
