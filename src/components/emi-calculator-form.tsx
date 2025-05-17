
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
import { PieChart, Pie } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart";

const formSchema = z.object({
  loanAmount: z.coerce.number({invalid_type_error: "Please enter a valid amount."}).positive({ message: "Loan amount must be positive." }).min(1000, "Minimum loan amount is 1,000."),
  interestRate: z.coerce.number({invalid_type_error: "Please enter a valid rate."}).positive({ message: "Interest rate must be positive." }).min(0.1, "Rate must be at least 0.1%.").max(50, "Rate seems too high (max 50%)."),
  loanTerm: z.coerce.number({invalid_type_error: "Please enter a valid term."}).positive({ message: "Loan term must be positive." }).min(1, "Term must be at least 1 year.").max(50, "Term seems too long (max 50 years)."),
});

type FormValues = z.infer<typeof formSchema>;

const chartConfig = {
  principal: {
    label: "Principal Amount",
    color: "hsl(var(--chart-1))",
  },
  interest: {
    label: "Total Interest",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EmiCalculatorForm() {
  const [emi, setEmi] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [totalPayment, setTotalPayment] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number; }[] | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Recalculate on change
    defaultValues: {
      loanAmount: 100000,
      interestRate: 7.5,
      loanTerm: 5,
    },
  });

  const loanAmountValue = form.watch("loanAmount");
  const interestRateValue = form.watch("interestRate");
  const loanTermValue = form.watch("loanTerm");
  const isValid = form.formState.isValid;

  useEffect(() => {
    const calculateAndSetEmi = () => {
      if (isValid && typeof loanAmountValue === 'number' && typeof interestRateValue === 'number' && typeof loanTermValue === 'number') {
        const principal = loanAmountValue;
        const annualRate = interestRateValue;
        const tenureYears = loanTermValue;

        const monthlyRate = annualRate / 12 / 100;
        const tenureMonths = tenureYears * 12;
        
        const plainFormattingOptions: Intl.NumberFormatOptions = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };


        if (principal > 0 && tenureMonths > 0) {
          let emiValueNum: number;
          let totalPaymentNum: number;
          let totalInterestNum: number;

          if (monthlyRate === 0) { // Interest-free loan
            emiValueNum = principal / tenureMonths;
            totalInterestNum = 0;
            totalPaymentNum = principal;
          } else {
            emiValueNum =
              (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            totalPaymentNum = emiValueNum * tenureMonths;
            totalInterestNum = totalPaymentNum - principal;
          }
          
          setEmi(emiValueNum.toLocaleString('en-IN', plainFormattingOptions));
          setTotalInterest(totalInterestNum.toLocaleString('en-IN', plainFormattingOptions));
          setTotalPayment(totalPaymentNum.toLocaleString('en-IN', plainFormattingOptions));
          
          setChartData([
            { name: 'principal', value: principal },
            { name: 'interest', value: totalInterestNum }
          ]);

        } else {
          setEmi(null);
          setTotalInterest(null);
          setTotalPayment(null);
          setChartData(null);
        }
      } else {
        setEmi(null);
        setTotalInterest(null);
        setTotalPayment(null);
        setChartData(null);
      }
    };
    calculateAndSetEmi();
  }, [loanAmountValue, interestRateValue, loanTermValue, isValid]);

  useEffect(() => {
     // Trigger validation on mount to calculate EMI with default values
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
          {(emi !== null && totalInterest !== null && totalPayment !== null && typeof loanAmountValue === 'number') && (
            <CardFooter className="flex flex-col items-stretch space-y-4 bg-muted/50 p-6 rounded-b-lg">
              <div className="w-full">
                <p className="text-lg font-medium text-foreground">Monthly EMI:</p>
                <p className="text-3xl font-bold text-primary">
                  ₹{emi}
                </p>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Principal Amount:</p>
                  <p className="font-semibold text-foreground">₹{Number(loanAmountValue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
              {chartData && (
                <div className="mt-6 pt-6 border-t border-border w-full">
                  <h3 className="text-lg font-semibold text-center mb-2 text-foreground">
                    Loan Breakdown
                  </h3>
                  <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px] w-full">
                    <PieChart accessibilityLayer>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent 
                                    hideLabel 
                                    nameKey="name" 
                                    formatter={(value, name, item) => (
                                      <div>
                                        <p className="font-medium">{chartConfig[item.payload.name as keyof typeof chartConfig].label}</p>
                                        <p className="text-muted-foreground">₹{Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                      </div>
                                    )}
                                />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={"70%"} 
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name: sliceName }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          if (percent < 0.05) return null; 

                          return (
                            <text
                              x={x}
                              y={y}
                              className="fill-primary-foreground text-xs font-medium"
                              textAnchor={x > cx ? 'start' : 'end'}
                              dominantBaseline="central"
                            >
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}
                        fill="hsl(var(--primary))" // Default fill, individual cells can override
                      >
                        {chartData.map((entry, index) => (
                           <PieChart key={`cell-${index}`} data={[{value: entry.value}]} dataKey="value" nameKey="name" >
                             <Pie dataKey="value" nameKey="name" fill={chartConfig[entry.name as keyof typeof chartConfig].color} />
                           </PieChart>
                        ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                  </ChartContainer>
                </div>
              )}
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

