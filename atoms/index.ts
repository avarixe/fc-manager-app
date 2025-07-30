import { Tables } from "@/database-generated.types";
import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

export const sessionAtom = atom<Session | null>(null);

export const teamAtom = atom<Tables<"teams"> | null>(null);
