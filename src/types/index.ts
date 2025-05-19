
export interface Answer {
  id: string; // Corresponds to Supabase UUID
  question_id: string; // Foreign key
  details: string;
  author: string;
  date: string; // Or Date if you prefer and handle conversion
  likes: number;
  created_at?: string; // Supabase default
}

export interface Question {
  id: string; // Corresponds to Supabase UUID
  title: string;
  details: string;
  author: string;
  date: string; // Or Date
  tags?: string[];
  answers?: Answer[]; // This will be populated client-side after fetching answers
  created_at?: string; // Supabase default
}
