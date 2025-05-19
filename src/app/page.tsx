
import { EmiCalculatorForm } from "@/components/emi-calculator-form";
import { BankInterestRatesTable } from "@/components/bank-interest-rates-table";

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
