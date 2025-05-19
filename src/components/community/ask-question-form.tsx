"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { Question } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }).max(200, {
    message: "Title must not exceed 200 characters.",
  }),
  details: z.string().min(20, {
    message: "Details must be at least 20 characters.",
  }).max(5000, {
    message: "Details must not exceed 5000 characters.",
  }),
  tags: z.string().optional().transform(value => value ? value.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
});

type AskQuestionFormValues = z.infer<typeof formSchema>;

interface AskQuestionFormProps {
  onSubmitQuestion: (data: Omit<Question, 'id' | 'author' | 'date' | 'answers' | 'created_at'>) => Promise<void>;
}

export function AskQuestionForm({ onSubmitQuestion }: AskQuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<AskQuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      tags: "",
    },
  });

  async function onSubmit(values: AskQuestionFormValues) {
    setIsSubmitting(true);
    try {
      await onSubmitQuestion({
        title: values.title,
        details: values.details,
        tags: values.tags as string[], // Zod transform handles this
      });
      form.reset(); 
    } catch (error) {
      // Error is handled by the parent component's toast
      console.error("Submission error in form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., What are the current interest rates for personal loans?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide more context, what you've tried, and what you're specifically asking about."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (optional, comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., home loan, credit score, advice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto shadow-md" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {isSubmitting ? 'Posting...' : 'Post Question'}
        </Button>
      </form>
    </Form>
  );
}
