
export interface Question {
  id: string;
  title: string;
  details: string;
  author: string;
  date: string; // Consider using Date object if more complex date logic is needed
  tags?: string[];
  // Future enhancements:
  // upvotes?: number;
  // answerCount?: number;
  // answers?: Answer[];
}

export interface Answer {
  id: string;
  questionId: string;
  details: string;
  author: string;
  date: string;
  // Future enhancements:
  // upvotes?: number;
}
