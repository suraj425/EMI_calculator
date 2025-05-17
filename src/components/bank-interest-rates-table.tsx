import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  {
    id: "bank1",
    name: "Prestige Financial",
    interestRate: "7.2%",
    applyLink: "https://example.com/prestige-financial-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "bank logo"
  },
  {
    id: "bank2",
    name: "Capital Trust Bank",
    interestRate: "7.5%",
    applyLink: "https://example.com/capital-trust-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "financial building"
  },
  {
    id: "bank3",
    name: "Horizon Union Bank",
    interestRate: "7.8%",
    applyLink: "https://example.com/horizon-union-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "modern bank"
  },
  {
    id: "bank4",
    name: "Summit Credit Bank",
    interestRate: "8.0%",
    applyLink: "https://example.com/summit-credit-loan",
    logoUrl: "https://placehold.co/40x40.png",
    dataAiHint: "bank icon"
  },
];

export function BankInterestRatesTable() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
          <Landmark className="h-6 w-6" />
          Compare Interest Rates
        </CardTitle>
        <CardDescription>
          Find the best loan offers from leading banks. Rates are indicative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] hidden sm:table-cell">Logo</TableHead>
                <TableHead>Bank Name</TableHead>
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
