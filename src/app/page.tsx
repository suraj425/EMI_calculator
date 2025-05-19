
import { EmiCalculatorForm } from "@/components/emi-calculator-form";
import { BankInterestRatesTable } from "@/components/bank-interest-rates-table";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMIs & Compare Bank Rates in India',
  description: 'Free EMI calculator for home, car, and personal loans. Calculate your Equated Monthly Installment, see interest breakdown, and compare personal loan rates from top Indian banks.',
  keywords: ['EMI calculator India', 'loan EMI', 'home loan calculator', 'car loan calculator', 'personal loan rates', 'compare interest rates', 'online EMI calculation'],
  openGraph: {
    title: 'EMI Calculator - Calculate Loan EMIs & Compare Bank Rates in India',
    description: 'Free EMI calculator for home, car, and personal loans. Calculate your Equated Monthly Installment, see interest breakdown, and compare personal loan rates from top Indian banks.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section aria-labelledby="emi-calculator-title">
          <EmiCalculatorForm />
        </section>

        <section aria-labelledby="bank-rates-title">
          <BankInterestRatesTable />
        </section>
      </div>
    </div>
  );
}
