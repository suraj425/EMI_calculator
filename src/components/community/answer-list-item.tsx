
"use client";

import type { Answer } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, UserCircle, CalendarDays } from "lucide-react";

interface AnswerListItemProps {
  answer: Answer;
  onLikeAnswer: () => void;
}

export function AnswerListItem({ answer, onLikeAnswer }: AnswerListItemProps) {
  return (
    <Card className="bg-muted/30 shadow-none border-l-4 border-primary/50">
      <CardContent className="pt-3 pb-2 text-sm">
        <p className="text-foreground">{answer.details}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex justify-between items-center pt-1 pb-2 px-4">
        <div className="flex items-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1">
            <UserCircle className="h-3.5 w-3.5" />
            {answer.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {answer.date}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onLikeAnswer} className="text-muted-foreground hover:text-primary h-7 px-2">
          <ThumbsUp className="mr-1 h-3.5 w-3.5" />
          {answer.likes > 0 ? answer.likes : ''}
        </Button>
      </CardFooter>
    </Card>
  );
}
