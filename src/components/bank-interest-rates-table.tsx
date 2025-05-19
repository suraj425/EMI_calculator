
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

interface BankRate {
  id: string;
  name: string;
  logoUrl?: string; // Optional: for bank logos
  interestRate: string;
  applyLink: string;
  dataAiHint?: string;
}

const bankRatesData: BankRate[] = [
  // Top 5 Indian Banks
  {
    id: "sbi",
    name: "State Bank of India (SBI)",
    interestRate: "Starting at 11.15% p.a.",
    applyLink: "https://sbi.co.in/web/personal-banking/loans/personal-loans",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "SBI logo"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    interestRate: "Starting at 10.50% p.a.",
    applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "HDFC logo"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    interestRate: "Starting at 10.80% p.a.",
    applyLink: "https://www.icicibank.com/personal-banking/loans/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "ICICI logo"
  },
  {
    id: "axis",
    name: "Axis Bank",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.axisbank.com/retail/loans/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Axis Bank logo"
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.kotak.com/en/personal-banking/loans/personal-loan.html",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Kotak Bank logo"
  },
  // 5 Finance Banks / NBFCs
  {
    id: "bajaj",
    name: "Bajaj Finserv",
    interestRate: "Starting at 11.00% p.a.",
    applyLink: "https://www.bajajfinserv.in/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Bajaj Finserv logo"
  },
  {
    id: "tata",
    name: "Tata Capital",
    interestRate: "Starting at 10.99% p.a.",
    applyLink: "https://www.tatacapital.com/personal-loan.html",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Tata Capital logo"
  },
  {
    id: "au",
    name: "AU Small Finance Bank",
    interestRate: "Starting at 12.00% p.a.", // Indicative, actual rates vary
    applyLink: "https://www.aubank.in/personal-banking/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "AU Bank logo"
  },
  {
    id: "ujjivan",
    name: "Ujjivan Small Finance Bank",
    interestRate: "Starting at 11.49% p.a.",
    applyLink: "https://www.ujjivansfb.in/personal-unsecured-loan-for-salaried",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Ujjivan Bank logo"
  },
  {
    id: "equitas",
    name: "Equitas Small Finance Bank",
    interestRate: "Starting at 13.00% p.a.", // Indicative, actual rates vary
    applyLink: "https://www.equitasbank.com/personal-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "Equitas Bank logo"
  },
];

export function BankInterestRatesTable() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <h2 id="bank-rates-title" className="text-2xl font-semibold leading-none tracking-tight text-primary flex items-center gap-2">
          <Landmark className="h-6 w-6" />
          Compare Interest Rates
        </h2>
        <CardDescription>
          Find loan offers from leading Indian banks and finance companies. Rates are indicative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] hidden sm:table-cell">Logo</TableHead>
                <TableHead>Bank / Company Name</TableHead>
                <TableHead className="text-center">Interest Rate (p.a.)</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankRatesData.map((bank) => (
                <TableRow key={bank.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="hidden sm:table-cell">
                    {bank.logoUrl && (
                      <img 
                        src={bank.logoUrl} 
                        alt={`${bank.name} logo`} 
                        className="h-10 w-10 rounded-full object-contain border"
                        data-ai-hint={bank.dataAiHint}
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{bank.name}</TableCell>
                  <TableCell className="text-center font-semibold text-primary">{bank.interestRate}</TableCell>
                  <TableCell className="text-right">
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
