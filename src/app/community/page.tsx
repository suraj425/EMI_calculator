
"use client";

import type { Question, Answer } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AskQuestionForm } from "@/components/community/ask-question-form";
import { QuestionListItem } from "@/components/community/question-list-item";
import { HelpCircle, MessageSquarePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client

// For client components, document title can be set this way for UX.
// Full SEO metadata should ideally be handled via Next.js App Router's metadata API in server components.
// export const metadata: Metadata = {
//   title: 'Loan Community Forum - Ask Questions, Get Loan Advice',
//   description: 'Join the Loan Community Forum to ask questions about personal loans, home loans, credit scores, and more. Share your knowledge and get guidance from fellow users and experts.',
//   keywords: ['loan forum', 'finance community', 'ask loan questions', 'loan advice', 'credit score help', 'personal loan discussion', 'home loan forum'],
//   openGraph: {
//     title: 'Loan Community Forum - Ask Questions, Get Loan Advice',
//     description: 'Join the Loan Community Forum to ask questions about personal loans, home loans, credit scores, and more. Share your knowledge and get guidance from fellow users and experts.',
//     url: '/community',
//   },
// };


export default function CommunityPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAskForm, setShowAskForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select(`
          *,
          answers (
            *
          )
        `)
        .order('created_at', { ascending: false });

      if (questionsError) throw questionsError;
      
      setQuestions(questionsData || []);
    } catch (err: any) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again later.");
      toast({
        title: "Error",
        description: "Could not fetch questions from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    document.title = 'Loan Community Forum - Ask Questions, Get Loan Advice | EMI Calculator India';
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', 'Join the Loan Community Forum to ask questions about personal loans, home loans, credit scores, and more. Share your knowledge and get guidance from fellow users and experts.');
    }
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAskQuestion = async (newQuestionData: Omit<Question, 'id' | 'author' | 'date' | 'answers' | 'created_at'>) => {
    try {
      const questionToInsert = {
        ...newQuestionData,
        author: "Anonymous User", // Replace with actual user if auth is added
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        tags: newQuestionData.tags || [],
      };

      const { data, error } = await supabase
        .from('questions')
        .insert([questionToInsert])
        .select(`
          *,
          answers (
            *
          )
        `)
        .single();

      if (error) throw error;

      if (data) {
        // Add the new question to the top of the list
        setQuestions(prevQuestions => [data as Question, ...prevQuestions]);
        setShowAskForm(false);
        toast({
          title: "Question Posted!",
          description: "Your question has been added to the forum.",
        });
      }
    } catch (err: any) {
      console.error("Error posting question:", err);
      toast({
        title: "Error Posting Question",
        description: err.message || "Could not save your question. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePostAnswer = async (questionId: string, answerDetails: string) => {
    try {
      const answerToInsert = {
        question_id: questionId,
        details: answerDetails,
        author: "Community Member", // Replace with actual user if auth is added
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        likes: 0,
      };
      const { data: newAnswer, error } = await supabase
        .from('answers')
        .insert([answerToInsert])
        .select()
        .single();

      if (error) throw error;

      if (newAnswer) {
        setQuestions(prevQuestions =>
          prevQuestions.map(q => {
            if (q.id === questionId) {
              return { ...q, answers: [...(q.answers || []), newAnswer as Answer] };
            }
            return q;
          })
        );
        toast({
          title: "Answer Posted!",
          description: "Your answer has been added to the question.",
        });
      }
    } catch (err: any) {
      console.error("Error posting answer:", err);
      toast({
        title: "Error Posting Answer",
        description: err.message || "Could not save your answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLikeAnswer = async (questionId: string, answerId: string) => {
    try {
      // First, get the current like count
      const { data: currentAnswer, error: fetchError } = await supabase
        .from('answers')
        .select('likes')
        .eq('id', answerId)
        .single();

      if (fetchError || !currentAnswer) throw fetchError || new Error("Answer not found");

      const newLikes = currentAnswer.likes + 1;

      const { error: updateError } = await supabase
        .from('answers')
        .update({ likes: newLikes })
        .eq('id', answerId);

      if (updateError) throw updateError;

      setQuestions(prevQuestions =>
        prevQuestions.map(q => {
          if (q.id === questionId) {
            return {
              ...q,
              answers: (q.answers || []).map(ans =>
                ans.id === answerId ? { ...ans, likes: newLikes } : ans
              ),
            };
          }
          return q;
        })
      );
      // Optional: Add a toast for like
    } catch (err: any) {
       console.error("Error liking answer:", err);
       toast({
        title: "Error Liking Answer",
        description: err.message || "Could not update like. Please try again.",
        variant: "destructive",
      });
    }
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
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading questions...</p>
          </div>
        )}
        {error && !isLoading && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-destructive-foreground text-center">{error}</p>
              <div className="text-center mt-4">
                 <Button onClick={fetchQuestions} variant="destructive">Try Again</Button>
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !error && questions.length > 0 ? (
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
        ) : null}
        {!isLoading && !error && questions.length === 0 && (
           <Card className="text-center py-10">
            <CardContent>
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
