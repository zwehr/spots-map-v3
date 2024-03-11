import supabase from "@/lib/utils/supabase";
import { Database } from "../../../types/supabase";

export async function findSpotsByCityAndTag(cityQuery: string, searchQuery: string) {
  type Spot = Database['public']['Tables']['spots']['Row'];
  
  const {data, error} = await supabase
    .from('spots')
    .select()
    .ilike('city', cityQuery)
    .or(`type.eq.${searchQuery}, tags.cs.{${searchQuery}}`)

  if (error) {
    console.log(error)
  }

  return data as Spot[]
}