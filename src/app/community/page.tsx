"use client";

import type { Question } from "@/types";
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
    tags: ['home loan', 'salaried', 'interest rates']
  },
  { 
    id: '2', 
    title: 'How to improve credit score for a personal loan?', 
    details: 'My credit score is around 650. What are some quick ways to improve it before applying for a personal loan for a medical emergency? I need the loan within a month.', 
    author: 'Priya K.', 
    date: 'July 18, 2024',
    tags: ['credit score', 'personal loan', 'tips'] 
  },
  { 
    id: '3', 
    title: 'Understanding fixed vs floating interest rates for car loans.', 
    details: 'Can someone explain the pros and cons of fixed vs floating interest rates in the context of a 5-year car loan? Which one is generally better given the current market conditions?', 
    author: 'Rajesh V.', 
    date: 'July 15, 2024',
    tags: ['car loan', 'interest rates', 'fixed vs floating'] 
  },
];

export default function CommunityPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAskForm, setShowAskForm] = useState(false);
  const { toast } = useToast();

  // Load initial questions on mount (client-side)
  useEffect(() => {
    setQuestions(initialQuestionsData);
  }, []);

  const handleAskQuestion = (newQuestionData: Omit<Question, 'id' | 'author' | 'date'>) => {
    const newQuestion: Question = {
      ...newQuestionData,
      id: (questions.length + 1).toString(), // Simple ID generation for mock
      author: "Anonymous User", // Or integrate with user system later
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setQuestions(prevQuestions => [newQuestion, ...prevQuestions]);
    setShowAskForm(false);
    toast({
      title: "Question Posted!",
      description: "Your question has been added to the forum.",
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <HelpCircle className="h-8 w-8" />
          Community Forum
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask questions, share knowledge, and get guidance on loans from the community.
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
            <CardDescription>Fill in the details below to post your question to the community.</CardDescription>
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
              <QuestionListItem key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
        )}
      </section>
    </div>
  );
}
