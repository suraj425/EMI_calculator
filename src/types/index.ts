
export interface Answer {
  id: string;
  questionId: string;
  details: string;
  author: string;
  date: string;
  likes: number;
}

export interface Question {
  id: string;
  title: string;
  details: string;
  author: string;
  date: string;
  tags?: string[];
  answers?: Answer[];
}
