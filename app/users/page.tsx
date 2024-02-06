"use client";

import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import type { Database } from "@/lib/schema";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import ProfilesCard from "./profiles-card";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function SpeciesList() {
  const [profiles, setSpecies] = useState<"loading" | "error" | Profiles[]>("loading");
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

      const { data, error } = await supabase.from("profiles").select("*").order("id", { ascending: false });
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
  }, [profiles]);

  let profilesList;
  if (profiles === "loading") {
    profilesList = <p>Loading species</p>;
  } else if (profiles === "error") {
    profilesList = <p>There was an error fetching species</p>;
  } else {
    profilesList = profiles?.map((profile) => <ProfilesCard key={profile.id} profiles={profile} />);
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <div></div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">{profilesList}</div>
    </>
  );
}
