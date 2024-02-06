import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// We use zod (z) to define a schema for the "Add species" form.
// zod handles validation of the input values with methods like .string(), .nullable(). It also processes the form inputs with .transform() before the inputs are sent to the database.

// Define kingdom enum for use in Zod schema and displayingdropdown options in the form

type Callback = (value: number) => void;

export default function SortSpeciesDialog({ handleSort }: { handleSort: Callback }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-3">
          <Icons.arrowRight className="mr-3 h-5 w-5" />
          Sort Species
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            handleSort(1);
          }}
        >
          A-Z
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleSort(2);
          }}
        >
          Z-A
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
