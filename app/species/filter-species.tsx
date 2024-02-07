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

export default function FilterSpeciesDialog({ handleFilter }: { handleFilter: Callback }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-3">
          <Icons.logo className="mr-3 h-5 w-5" />
          Filter Species
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(1);
          }}
        >
          Animalia
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(2);
          }}
        >
          Plantae
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(3);
          }}
        >
          Fungi
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(4);
          }}
        >
          Protista
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(5);
          }}
        >
          Archaea
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleFilter(6);
          }}
        >
          Bacteria
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
