import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import SpeciesListings from "./species-list";

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
  const sessionId = session.user.id;

  const { data: species } = await supabase
    .from("species")
    .select("*, profiles (biography, display_name, email, id)")
    .order("id", { ascending: false });
  // const { data: profiles } = await supabase.from("profiles").select("*").order("id", { ascending: false });

  return <SpeciesListings species={species} sessionId={sessionId} />;
}
