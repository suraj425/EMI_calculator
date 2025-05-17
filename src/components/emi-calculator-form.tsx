
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const formSchema = z.object({
  loanAmount: z.coerce.number({invalid_type_error: "Please enter a valid amount."}).positive({ message: "Loan amount must be positive." }).min(1000, "Minimum loan amount is 1,000."),
  interestRate: z.coerce.number({invalid_type_error: "Please enter a valid rate."}).positive({ message: "Interest rate must be positive." }).min(0.1, "Rate must be at least 0.1%.").max(50, "Rate seems too high (max 50%)."),
  loanTerm: z.coerce.number({invalid_type_error: "Please enter a valid term."}).positive({ message: "Loan term must be positive." }).min(1, "Term must be at least 1 year.").max(50, "Term seems too long (max 50 years)."),
});

type FormValues = z.infer<typeof formSchema>;

export function EmiCalculatorForm() {
  const [emi, setEmi] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [totalPayment, setTotalPayment] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Recalculate on change
    defaultValues: {
      loanAmount: 100000,
      interestRate: 7.5,
      loanTerm: 5,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const calculateAndSetEmi = () => {
      const { loanAmount, interestRate, loanTerm } = watchedValues;
      if (form.formState.isValid && loanAmount && interestRate && loanTerm) {
        const principal = Number(loanAmount);
        const annualRate = Number(interestRate);
        const tenureYears = Number(loanTerm);

        const monthlyRate = annualRate / 12 / 100;
        const tenureMonths = tenureYears * 12;

        const formattingOptions: Intl.NumberFormatOptions = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };

        if (principal > 0 && tenureMonths > 0) {
          if (monthlyRate === 0) { // Interest-free loan
            const emiValue = principal / tenureMonths;
            setEmi(emiValue.toLocaleString('en-IN', formattingOptions));
            setTotalInterest((0).toLocaleString('en-IN', formattingOptions));
            setTotalPayment(principal.toLocaleString('en-IN', formattingOptions));
          } else {
            const emiValue =
              (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            setEmi(emiValue.toLocaleString('en-IN', formattingOptions));
            
            const totalPaid = emiValue * tenureMonths;
            setTotalPayment(totalPaid.toLocaleString('en-IN', formattingOptions));
            setTotalInterest((totalPaid - principal).toLocaleString('en-IN', formattingOptions));
          }
        } else {
          setEmi(null);
          setTotalInterest(null);
          setTotalPayment(null);
        }
      } else {
        // Clear EMI if form is not valid or values are missing
        setEmi(null);
        setTotalInterest(null);
        setTotalPayment(null);
      }
    };
    calculateAndSetEmi();
  }, [watchedValues, form.formState.isValid]);

  // Trigger initial calculation
  useEffect(() => {
     form.trigger();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          EMI Calculator
        </CardTitle>
        <CardDescription>
          Estimate your monthly loan payments quickly and easily.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 8.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          {emi !== null && totalInterest !== null && totalPayment !== null && (
            <CardFooter className="flex flex-col items-start space-y-4 bg-muted/50 p-6 rounded-b-lg">
              <div className="w-full">
                <p className="text-lg font-medium text-foreground">Monthly EMI:</p>
                <p className="text-3xl font-bold text-primary">
                  ₹{emi}
                </p>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Principal Amount:</p>
                  <p className="font-semibold text-foreground">₹{Number(watchedValues.loanAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Interest:</p>
                  <p className="font-semibold text-foreground">₹{totalInterest}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Total Payment (Principal + Interest):</p>
                  <p className="font-semibold text-foreground">₹{totalPayment}</p>
                </div>
              </div>
            </CardFooter>
          )}
          {emi === null && (
             <CardFooter className="p-6">
                <p className="text-muted-foreground text-center w-full">
                    Enter loan details above to calculate your EMI.
                </p>
             </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
