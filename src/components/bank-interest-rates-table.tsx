
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import Image from "next/image";

interface BankRate {
  id: string;
  name: string;
  logoUrl: string; 
  dataAiHint: string;
  interestRate: string;
  applyLink: string;
}

const bankRatesData: BankRate[] = [
  {
    id: "sbi",
    name: "State Bank of India (SBI)",
    interestRate: "Starting at 11.15% p.a.",
    applyLink: "https://sbi.co.in/web/personal-banking/loans/personal-loans",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "sbi logo"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    interestRate: "Starting at 10.50% p.a.",
    applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "hdfc logo"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    interestRate: "Starting at 10.80% p.a.",
    applyLink: "https://www.icicibank.com/personal-banking/loans/personal-loan",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "icici logo"
  },
  {
    id: "axis",
    name: "Axis Bank",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.axisbank.com/retail/loans/personal-loan",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "axis bank logo"
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.kotak.com/en/personal-banking/loans/personal-loan.html",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "kotak bank logo"
  },
  {
    id: "bajaj",
    name: "Bajaj Finserv",
    interestRate: "Starting at 11.00% p.a.",
    applyLink: "https://www.bajajfinserv.in/personal-loan",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "bajaj finserv logo"
  },
  {
    id: "tata",
    name: "Tata Capital",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.tatacapital.com/personal-loan.html",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "tata capital logo"
  },
  {
    id: "fullerton",
    name: "Fullerton India",
    interestRate: "Starting at 11.99% p.a.",
    applyLink: "https://www.fullertonindia.com/personal-loan.aspx",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "fullerton india logo"
  },
  {
    id: "indusind",
    name: "IndusInd Bank",
    interestRate: "Starting at 10.49% p.a.",
    applyLink: "https://www.indusind.com/in/en/personal/loans/personal-loan.html",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "indusind logo"
  },
  {
    id: "moneyview",
    name: "MoneyView",
    interestRate: "Starting at 15.96% p.a.", // Higher rate for NBFCs typically
    applyLink: "https://moneyview.in/personal-loan",
    logoUrl: "https://placehold.co/32x32.png",
    dataAiHint: "moneyview logo"
  },
];

export function BankInterestRatesTable() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <h2 id="bank-rates-title" className="text-2xl font-semibold leading-none tracking-tight text-primary flex items-center gap-2">
          <Landmark className="h-6 w-6" />
          Compare Personal Loan Interest Rates
        </h2>
        <CardDescription>
          Find personal loan offers from leading Indian banks and finance companies. Rates are indicative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] hidden sm:table-cell">Logo</TableHead>
                <TableHead>Bank / Company Name</TableHead>
                <TableHead className="text-center">Interest Rate (p.a.)</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankRatesData.map((bank) => (
                <TableRow key={bank.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="hidden sm:table-cell py-3">
                    <Image 
                      src={bank.logoUrl} 
                      alt={`${bank.name} logo`} 
                      width={32}
                      height={32}
                      className="rounded-full object-contain border"
                      data-ai-hint={bank.dataAiHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium py-3">{bank.name}</TableCell>
                  <TableCell className="text-center font-semibold text-primary py-3">{bank.interestRate}</TableCell>
                  <TableCell className="text-right py-3">
                    <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow transition-transform hover:scale-105">
                      <a href={bank.applyLink} target="_blank" rel="noopener noreferrer" aria-label={`Apply for a loan at ${bank.name}`}>
                        Apply Now
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    