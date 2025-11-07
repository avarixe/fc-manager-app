import { Team } from "@/types";
import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

export const sessionAtom = atom<Session | null>(null);

export const teamAtom = atom<Team | null>(null);
