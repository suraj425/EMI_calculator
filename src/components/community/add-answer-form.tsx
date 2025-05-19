
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface AddAnswerFormProps {
  onSubmitAnswer: (details: string) => Promise<void>;
}

export function AddAnswerForm({ onSubmitAnswer }: AddAnswerFormProps) {
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (details.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmitAnswer(details.trim());
        setDetails(''); 
      } catch (error) {
        // Error handled by parent toast
         console.error("Submission error in answer form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Share your insights or guidance..."
        className="min-h-[100px] text-sm"
        required
        disabled={isSubmitting}
      />
      <Button type="submit" size="sm" className="shadow-sm" disabled={isSubmitting}>
         {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
        {isSubmitting ? 'Posting...' : 'Post Answer'}
      </Button>
    </form>
  );
}
