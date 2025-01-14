"use client";

import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import type { Database } from "@/lib/schema";
import { useEffect, useState } from "react";
import AddSpeciesDialog from "./add-species-dialog";
import FilterSpeciesDialog from "./filter-species";
import SearchSpeciesDialog from "./search-species";
import SortSpeciesDialog from "./sort-species-dialog";
import SpeciesCard from "./species-card";

interface Species {
  author: string;
  common_name: string | null;
  description: string | null;
  endangered: boolean;
  id: number;
  image: string | null;
  kingdom: Database["public"]["Enums"]["kingdom"];
  scientific_name: string;
  total_population: number | null;
  profiles: Database["public"]["Tables"]["profiles"]["Row"] | null;
}

export default function SpeciesListings({ sessionId, species }: { sessionId: string; species: Species[] | null }) {
  const [sort, setSort] = useState(0);
  const [filter, setFilter] = useState(0);
  const [sorted, setSorted] = useState(species);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (sort === 1) {
      setSorted(
        species?.sort((a, b) => {
          const titleA = a.scientific_name.toUpperCase(); // ignore upper and lowercase
          const titleB = b.scientific_name.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }
          // names must be equal
          return 0;
        }) ?? null,
      );
    } else if (sort === 2) {
      setSorted(
        species?.sort((a, b) => {
          const titleA = a.scientific_name.toUpperCase(); // ignore upper and lowercase
          const titleB = b.scientific_name.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          // names must be equal
          return 0;
        }) ?? null,
      );
    }
  }, [sort, species]);

  useEffect(() => {
    if (filter === 1) {
      setSorted(species?.filter((e) => e.kingdom === "Animalia") ?? null);
    }
    if (filter === 2) {
      setSorted(species?.filter((e) => e.kingdom === "Plantae") ?? null);
    }
    if (filter === 3) {
      setSorted(species?.filter((e) => e.kingdom === "Fungi") ?? null);
    }
    if (filter === 4) {
      setSorted(species?.filter((e) => e.kingdom === "Protista") ?? null);
    }
    if (filter === 5) {
      setSorted(species?.filter((e) => e.kingdom === "Archaea") ?? null);
    }
    if (filter === 6) {
      setSorted(species?.filter((e) => e.kingdom === "Bacteria") ?? null);
    }
  }, [filter, species]);

  useEffect(() => {
    setSorted(
      species?.filter(
        (e) =>
          e.description?.includes(search) ?? e.scientific_name?.includes(search) ?? e.common_name?.includes(search),
      ) ?? null,
    );
  }, [search, species]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <div>
          <div>
            <AddSpeciesDialog userId={sessionId} />
            <SortSpeciesDialog handleSort={setSort} />
            <FilterSpeciesDialog handleFilter={setFilter} />
          </div>
          <SearchSpeciesDialog handleSearch={setSearch} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {sorted?.map((cur) => (
          <SpeciesCard key={cur.id} displayName={cur.profiles?.display_name ?? ""} species={cur} userId={sessionId} />
        ))}
      </div>
    </>
  );
}
