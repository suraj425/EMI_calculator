
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
// Lucide icons are no longer used directly here, but keeping imports in case other parts of the page might use them.
// import { Briefcase, Car, GraduationCap, HandCoins, Home, Landmark, Users, Wallet } from "lucide-react";

interface LoanType {
  id: string;
  name: string;
  description: string;
  iconImageUrl: string;
  iconImageAlt: string;
  iconDataAiHint: string;
  imageUrl: string;
  imageAlt: string;
  applyLink: string;
  dataAiHint: string;
  popularChoice?: boolean;
}

const loanTypesData: LoanType[] = [
  {
    id: "personal-loan",
    name: "Personal Loan",
    description: "Flexible financing for various personal needs like weddings, travel, or medical emergencies. Quick approvals and minimal documentation.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Personal loan icon",
    iconDataAiHint: "money bag",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Person happy with a personal loan",
    applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    dataAiHint: "personal finance",
    popularChoice: true,
  },
  {
    id: "home-loan",
    name: "Home Loan",
    description: "Achieve your dream of owning a home with attractive interest rates, long tenures, and tax benefits. Ideal for buying or constructing a house.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Home loan icon",
    iconDataAiHint: "house icon",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Family in front of new house",
    applyLink: "https://sbi.co.in/web/personal-banking/loans/home-loans",
    dataAiHint: "dream house",
    popularChoice: true,
  },
  {
    id: "car-loan",
    name: "Car Loan",
    description: "Drive your desired car with easy financing options. Competitive rates for new and pre-owned cars with flexible repayment plans.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Car loan icon",
    iconDataAiHint: "car icon",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "New car on a scenic road",
    applyLink: "https://www.icicibank.com/personal-banking/loans/car-loan",
    dataAiHint: "new car",
  },
  {
    id: "education-loan",
    name: "Education Loan",
    description: "Invest in your future with education loans for studies in India or abroad. Covers tuition fees, living expenses, and more.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Education loan icon",
    iconDataAiHint: "graduation cap",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Student graduating with cap thrown in air",
    applyLink: "https://www.axisbank.com/retail/loans/education-loan",
    dataAiHint: "student graduation",
  },
  {
    id: "business-loan",
    name: "Business Loan",
    description: "Fuel your business growth with tailored loan solutions for working capital, expansion, or equipment purchase. Quick and hassle-free.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Business loan icon",
    iconDataAiHint: "briefcase chart",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Business meeting with handshake",
    applyLink: "https://www.bajajfinserv.in/business-loan",
    dataAiHint: "business growth",
  },
  {
    id: "gold-loan",
    name: "Gold Loan",
    description: "Get instant cash by pledging your gold ornaments. Secure loans with minimal paperwork and attractive interest rates.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Gold loan icon",
    iconDataAiHint: "gold bars",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Gold coins and jewelry",
    applyLink: "https://www.muthootfinance.com/gold-loan",
    dataAiHint: "gold jewelry",
  },
  {
    id: "loan-against-property",
    name: "Loan Against Property",
    description: "Unlock the value of your residential or commercial property. Get high loan amounts for various financial needs.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Loan against property icon",
    iconDataAiHint: "property document",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Modern building or property",
    applyLink: "https://www.tatacapital.com/loan-against-property.html",
    dataAiHint: "property value",
  },
   {
    id: "two-wheeler-loan",
    name: "Two-Wheeler Loan",
    description: "Own your dream bike or scooter with easy EMIs. Fast processing and competitive interest rates for your new ride.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Two-wheeler loan icon",
    iconDataAiHint: "motorcycle icon",
    imageUrl: "https://placehold.co/600x400.png",
    imageAlt: "Person riding a scooter",
    applyLink: "https://www.bajajautofinance.com/two-wheeler-loan",
    dataAiHint: "scooter ride",
  },
];

export default function ApplyLoanPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-3">Explore Loan Options</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the perfect loan to meet your financial needs. Compare various loan types offered by leading financial institutions in India.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loanTypesData.map((loan) => (
          <Card key={loan.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={loan.iconImageUrl}
                  alt={loan.iconImageAlt}
                  width={32}
                  height={32}
                  className="rounded-md border"
                  data-ai-hint={loan.iconDataAiHint}
                />
                <CardTitle className="text-2xl">{loan.name}</CardTitle>
              </div>
               {loan.popularChoice && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <CardDescription className="text-sm leading-relaxed h-20 overflow-hidden text-ellipsis">
                {loan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pt-2 pb-4">
              <div className="aspect-video w-full relative rounded-md overflow-hidden border">
                <Image
                  src={loan.imageUrl}
                  alt={loan.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={loan.dataAiHint}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
                <Link href={loan.applyLink} target="_blank" rel="noopener noreferrer">
                  Learn More & Apply
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
