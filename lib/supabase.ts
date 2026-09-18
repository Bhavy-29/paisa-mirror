import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProfileRow {
  parent_name: string;
  parent_age: number;
  parent_photo_url: string;
  monthly_income: number;
  monthly_expenses: number;
  current_savings: number;
  has_pension: boolean;
  futures_json: unknown;
  plan_json: unknown;
}

export async function saveProfile(profile: ProfileRow) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}