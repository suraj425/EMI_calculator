
import type { Question } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, CalendarDays, Tag, MessageCircle } from "lucide-react";
import { AddAnswerForm } from "./add-answer-form";
import { AnswerListItem } from "./answer-list-item";
import { Separator } from "@/components/ui/separator";

interface QuestionListItemProps {
  question: Question;
  onPostAnswer: (questionId: string, answerDetails: string) => void;
  onLikeAnswer: (questionId: string, answerId: string) => void;
}

export function QuestionListItem({ question, onPostAnswer, onLikeAnswer }: QuestionListItemProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-primary hover:underline cursor-pointer">
          {question.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
          <span className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
            {question.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {question.date}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground line-clamp-3 mb-4">
          {question.details}
        </p>

        {question.answers && question.answers.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-foreground mb-2 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
              Answers ({question.answers.length})
            </h4>
            <Separator className="my-2" />
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {question.answers.map(answer => (
                <AnswerListItem 
                  key={answer.id} 
                  answer={answer} 
                  onLikeAnswer={() => onLikeAnswer(question.id, answer.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
           <h4 className="text-md font-semibold text-foreground mb-2">
            Post Your Answer
           </h4>
          <AddAnswerForm onSubmitAnswer={(details) => onPostAnswer(question.id, details)} />
        </div>

      </CardContent>
      {question.tags && question.tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2 pt-4 border-t mt-4">
          {question.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
