"use client";

import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import type { Database } from "@/lib/schema";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AddSpeciesDialog from "./add-species-dialog";
import SortSpeciesDialog from "./sort-species-dialog";
import SpeciesCard from "./species-card";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesList() {
  const [species, setSpecies] = useState<"loading" | "error" | Species[]>("loading");
  const [sessionId, setSessionId] = useState("");
  // Create supabase server component client and obtain user session from stored cookie

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createServerSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // this is a protected route - only users who are signed in can view this route
        redirect("/");
      }

      // Obtain the ID of the currently signed-in user
      setSessionId(session.user.id);

      const { data, error } = await supabase
        .from("species")
        .select("*, profiles (id, email, display_name, biography)")
        .order("id", { ascending: false });
      // const { data: profiles } = await supabase.from("profiles").select("*").order("id", { ascending: false });
      if (error) {
        setSpecies("error");
        return;
      }
      setSpecies(data);
    };
    fetchData().catch((e) => {
      console.log(e);
    });
  }, [species]);

  let speciesList;
  if (species === "loading") {
    speciesList = <p>Loading species</p>;
  } else if (species === "error") {
    speciesList = <p>There was an error fetching species</p>;
  } else {
    speciesList = species?.map((species) => <SpeciesCard key={species.id} species={species} userId={sessionId} />);
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <div>
          <AddSpeciesDialog userId={sessionId} />
          <SortSpeciesDialog />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">{speciesList}</div>
    </>
  );
}
