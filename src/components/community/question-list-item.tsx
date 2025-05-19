import type { Question } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, CalendarDays, Tag } from "lucide-react";

interface QuestionListItemProps {
  question: Question;
}

export function QuestionListItem({ question }: QuestionListItemProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-primary hover:underline cursor-pointer">
          {/* In a real app, this title would link to a question detail page */}
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
        <p className="text-foreground line-clamp-3">
          {question.details}
        </p>
      </CardContent>
      {question.tags && question.tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2 pt-4">
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
