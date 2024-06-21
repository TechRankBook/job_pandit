import { createClient } from "@/utils/supabase/client";

export const fetchMyApplications = async (user_id:string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('job_applications')
      .select('*').eq('candidate_id', user_id);
  
if(!error) {
  return { data, error };
}

    return { data: [], error };
    
}