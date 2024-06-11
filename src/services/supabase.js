import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qolagebtjdrkfrnahdan.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbGFnZWJ0amRya2ZybmFoZGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTMzMTQsImV4cCI6MjAzMjkyOTMxNH0.LpemHSfWFqAeoLuJw_HOHT-Zvc-yKkU4RSnzrl39VKs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;