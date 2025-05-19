
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface AddAnswerFormProps {
  onSubmitAnswer: (details: string) => void;
}

export function AddAnswerForm({ onSubmitAnswer }: AddAnswerFormProps) {
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.trim()) {
      onSubmitAnswer(details.trim());
      setDetails(''); 
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
      />
      <Button type="submit" size="sm" className="shadow-sm">
        <Send className="mr-2 h-4 w-4" />
        Post Answer
      </Button>
    </form>
  );
}
