
"use client";

import type { Question, Answer } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AskQuestionForm } from "@/components/community/ask-question-form";
import { QuestionListItem } from "@/components/community/question-list-item";
import { HelpCircle, MessageSquarePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialQuestionsData: Question[] = [
  { 
    id: '1', 
    title: 'Best home loan for salaried employees in 2024?', 
    details: 'I am looking for a home loan with a good interest rate and minimal processing fees. Any recommendations for someone salaried in a metro city? My annual income is 12 LPA and I have a good credit score.', 
    author: 'Amit S.', 
    date: 'July 20, 2024',
    tags: ['home loan', 'salaried', 'interest rates'],
    answers: [
      { id: 'a1-1', questionId: '1', details: 'Consider checking out SBI MaxGain. It usually has competitive rates for salaried individuals.', author: 'Deepa L.', date: 'July 21, 2024', likes: 5 },
      { id: 'a1-2', questionId: '1', details: 'HDFC also has good options, especially if you have an existing relationship with them.', author: 'Rajiv B.', date: 'July 22, 2024', likes: 2 },
    ]
  },
  { 
    id: '2', 
    title: 'How to improve credit score for a personal loan?', 
    details: 'My credit score is around 650. What are some quick ways to improve it before applying for a personal loan for a medical emergency? I need the loan within a month.', 
    author: 'Priya K.', 
    date: 'July 18, 2024',
    tags: ['credit score', 'personal loan', 'tips'],
    answers: []
  },
  { 
    id: '3', 
    title: 'Understanding fixed vs floating interest rates for car loans.', 
    details: 'Can someone explain the pros and cons of fixed vs floating interest rates in the context of a 5-year car loan? Which one is generally better given the current market conditions?', 
    author: 'Rajesh V.', 
    date: 'July 15, 2024',
    tags: ['car loan', 'interest rates', 'fixed vs floating'],
    answers: [
       { id: 'a3-1', questionId: '3', details: 'Fixed rates offer predictability, which is good for budgeting. Floating rates can be lower initially but might increase.', author: 'ConsultantGPT', date: 'July 16, 2024', likes: 10 },
    ]
  },
];

export default function CommunityPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAskForm, setShowAskForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setQuestions(initialQuestionsData);
  }, []);

  const handleAskQuestion = (newQuestionData: Omit<Question, 'id' | 'author' | 'date' | 'answers'>) => {
    const newQuestion: Question = {
      ...newQuestionData,
      id: `q-${Date.now()}`, // More unique ID
      author: "Anonymous User", 
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      answers: [],
    };
    setQuestions(prevQuestions => [newQuestion, ...prevQuestions]);
    setShowAskForm(false);
    toast({
      title: "Question Posted!",
      description: "Your question has been added to the forum.",
    });
  };

  const handlePostAnswer = (questionId: string, answerDetails: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          const newAnswer: Answer = {
            id: `ans-${Date.now()}`,
            questionId: q.id,
            details: answerDetails,
            author: "Community Member", // Mock author
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            likes: 0,
          };
          return { ...q, answers: [...(q.answers || []), newAnswer] };
        }
        return q;
      })
    );
    toast({
      title: "Answer Posted!",
      description: "Your answer has been added to the question.",
    });
  };

  const handleLikeAnswer = (questionId: string, answerId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: (q.answers || []).map(ans =>
              ans.id === answerId ? { ...ans, likes: ans.likes + 1 } : ans
            ),
          };
        }
        return q;
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <HelpCircle className="h-8 w-8" />
          Loan Community Forum
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask questions, share knowledge, get guidance on loans, and help others in the community.
        </p>
      </header>

      <div className="mb-6">
        <Button onClick={() => setShowAskForm(!showAskForm)} className="shadow-md">
          <MessageSquarePlus className="mr-2 h-5 w-5" />
          {showAskForm ? 'Cancel' : 'Ask a New Question'}
        </Button>
      </div>

      {showAskForm && (
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Ask Your Question</CardTitle>
            <CardDescription>Fill in the details below to post your question to the forum.</CardDescription>
          </CardHeader>
          <CardContent>
            <AskQuestionForm onSubmitQuestion={handleAskQuestion} />
          </CardContent>
        </Card>
      )}

      <section aria-labelledby="recent-questions-title">
        <h2 id="recent-questions-title" className="text-2xl font-semibold mb-6 text-foreground">
          Recent Questions
        </h2>
        {questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map(question => (
              <QuestionListItem 
                key={question.id} 
                question={question}
                onPostAnswer={handlePostAnswer}
                onLikeAnswer={handleLikeAnswer}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
        )}
      </section>
    </div>
  );
}
