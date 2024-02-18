'use server'

import supabase from "@/lib/utils/supabase";

export async function deleteVideo(id: number) {
  try {
  const { error } = await supabase.from('videos').delete().eq('id', id);

  if (error) {
    console.log(error)
    return {failure: 'Delete failed.'}
  } else {
    return {success: 'Successfully deleted video'}
  }
} catch (error) {
  console.log(error)
}
}