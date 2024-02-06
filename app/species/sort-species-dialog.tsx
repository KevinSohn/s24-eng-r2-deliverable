"use client";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// We use zod (z) to define a schema for the "Add species" form.
// zod handles validation of the input values with methods like .string(), .nullable(). It also processes the form inputs with .transform() before the inputs are sent to the database.

// Define kingdom enum for use in Zod schema and displaying dropdown options in the form

export default function SortSpeciesDialog() {
  const router = useRouter();
  const [sort, setSort] = useState(0);

  useEffect(() => {
    if (sort == 1) {
      console.log("A-Z");
      router.replace("/species?sort=1");
    } else if (sort == 2) {
      console.log("Z-A");
      router.replace("/species?sort=2");
    }
  }, [sort, router]);

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
            setSort(1);
          }}
        >
          A-Z
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setSort(2);
          }}
        >
          Z-A
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
