import { EmiCalculatorForm } from "@/components/emi-calculator-form";
import { BankInterestRatesTable } from "@/components/bank-interest-rates-table";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section aria-labelledby="emi-calculator-section-title">
          {/* h2 for section title can be added if needed, CardTitle serves similar purpose visually */}
          <EmiCalculatorForm />
        </section>

        <section aria-labelledby="bank-rates-section-title">
          <BankInterestRatesTable />
        </section>
      </div>
    </div>
  );
}
