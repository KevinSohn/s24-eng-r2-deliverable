"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function ShowSpeciesDialog(species: Species) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mt-3 text-4xl font-semibold">{species.common_name}</DialogTitle>
          <DialogDescription className="text-2xl font-light italic">{species.scientific_name}</DialogDescription>
          <DialogDescription className="text-xl">
            <b>Kingdom: </b>
            {species.kingdom}
          </DialogDescription>
          <DialogDescription className="text-xl">
            <b>Total Population: </b> {species.total_population}
          </DialogDescription>
          <DialogDescription className="text-xl">{species.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
