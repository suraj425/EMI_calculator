
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, FileText } from "lucide-react";

interface BankProvider {
  id: string;
  name: string;
  logoUrl: string;
  dataAiHint: string;
  applyLink: string;
  isBank: boolean; // To differentiate banks from NBFCs if needed for display, though not strictly used in this layout
}

interface LoanType {
  id: string;
  name: string;
  shortDescription: string; // A brief description to show when selected
  iconImageUrl: string;
  iconImageAlt: string;
  iconDataAiHint: string;
  providers: BankProvider[];
}

const loanTypesData: LoanType[] = [
  {
    id: "personal-loan",
    name: "Personal Loan",
    shortDescription: "Flexible financing for weddings, travel, medical emergencies, or debt consolidation. Quick approvals, often unsecured.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Personal loan icon",
    iconDataAiHint: "money bag",
    providers: [
      { id: "sbi-pl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/personal-loans", isBank: true },
      { id: "hdfc-pl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan", isBank: true },
      { id: "icici-pl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/personal-loan", isBank: true },
      { id: "axis-pl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/personal-loan", isBank: true },
      { id: "kotak-pl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/personal-loan.html", isBank: true },
      { id: "bajaj-pl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/personal-loan", isBank: false },
      { id: "tata-pl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/personal-loan.html", isBank: false },
      { id: "moneyview-pl", name: "MoneyView", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "moneyview logo", applyLink: "https://moneyview.in/personal-loan", isBank: false },
      { id: "fullerton-pl", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/personal-loan.aspx", isBank: false },
      { id: "indusind-pl", name: "IndusInd Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indusind logo", applyLink: "https://www.indusind.com/in/en/personal/loans/personal-loan.html", isBank: true },
    ],
  },
  {
    id: "home-loan",
    name: "Home Loan",
    shortDescription: "Finance your dream home purchase, construction, or renovation. Typically offers long tenures and tax benefits.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Home loan icon",
    iconDataAiHint: "house icon",
    providers: [
      { id: "sbi-hl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://homeloans.sbi/", isBank: true },
      { id: "hdfc-hl", name: "HDFC Bank (merged with HDFC Ltd.)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan", isBank: true },
      { id: "icici-hl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/home-loan", isBank: true },
      { id: "axis-hl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/home-loan", isBank: true },
      { id: "kotak-hl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/home-loan.html", isBank: true },
      { id: "bajaj-hl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/home-loan", isBank: false },
      { id: "tata-hl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/home-loan.html", isBank: false },
      { id: "pnbhfl-hl", name: "PNB Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "pnbhfl logo", applyLink: "https://www.pnbhousing.com/", isBank: false },
      { id: "lichfl-hl", name: "LIC Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lichfl logo", applyLink: "https://www.lichousing.com/", isBank: false },
      { id: "indiabulls-hl", name: "Indiabulls Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indiabulls logo", applyLink: "https://www.indiabullshomeloans.com/", isBank: false },
    ],
  },
  {
    id: "car-loan",
    name: "Car Loan",
    shortDescription: "Finance your new or used car purchase with flexible repayment options and competitive interest rates.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Car loan icon",
    iconDataAiHint: "car icon",
    providers: [
      { id: "sbi-cl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/auto-loans", isBank: true },
      { id: "hdfc-cl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/new-car-loan", isBank: true },
      { id: "icici-cl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/car-loan", isBank: true },
      { id: "axis-cl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/car-loan", isBank: true },
      { id: "kotak-cl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/car-loan.html", isBank: true },
      { id: "bajaj-cl", name: "Bajaj Finserv (Used Car Loan)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/used-car-loan", isBank: false }, // Bajaj focuses more on used car loans
      { id: "tata-cl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/car-loan.html", isBank: false },
      { id: "mahindra-cl", name: "Mahindra Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "mahindra logo", applyLink: "https://www.mahindrafinance.com/loans/vehicle-loans/car-loan", isBank: false },
      { id: "sundaram-cl", name: "Sundaram Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sundaram logo", applyLink: "https://www.sundaramfinance.in/vehicle-loans/car-loans", isBank: false },
      { id: "cholamandalam-cl", name: "Cholamandalam Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "chola logo", applyLink: "https://www.cholamandalam.com/vehicle-finance/car-loans", isBank: false },
    ],
  },
  {
    id: "education-loan",
    name: "Education Loan",
    shortDescription: "Fund your higher education in India or abroad, covering tuition fees, living expenses, and other associated costs.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Education loan icon",
    iconDataAiHint: "graduation cap",
    providers: [
      { id: "sbi-el", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/education-loans", isBank: true },
      { id: "hdfc-el", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan", isBank: true },
      { id: "icici-el", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/education-loan", isBank: true },
      { id: "axis-el", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/education-loan", isBank: true },
      { id: "bob-el", name: "Bank of Baroda", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bob logo", applyLink: "https://www.bankofbaroda.in/personal-banking/loans/education-loan", isBank: true }, // Kotak less prominent for edu, using BoB
      { id: "avanse-el", name: "Avanse Financial Services", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "avanse logo", applyLink: "https://www.avanse.com/", isBank: false },
      { id: "hdfccredila-el", name: "HDFC Credila", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "credila logo", applyLink: "https://www.hdfccredila.com/", isBank: false },
      { id: "auxilo-el", name: "Auxilo", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "auxilo logo", applyLink: "https://www.auxilo.com/", isBank: false },
      { id: "incred-el", name: "InCred", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "incred logo", applyLink: "https://www.incred.com/education-loan/", isBank: false },
      { id: "propelld-el", name: "Propelld", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "propelld logo", applyLink: "https://propelld.com/", isBank: false },
    ],
  },
   {
    id: "business-loan",
    name: "Business Loan",
    shortDescription: "Secure funding for your business expansion, working capital needs, or purchasing new equipment.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Business loan icon",
    iconDataAiHint: "briefcase chart",
    providers: [
      { id: "sbi-bl", name: "State Bank of India (SME Loans)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/sme/sme-loans", isBank: true },
      { id: "hdfc-bl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/sme/borrow/business-loan", isBank: true },
      { id: "icici-bl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/business-banking/loans/business-loan", isBank: true },
      { id: "axis-bl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/business-banking/loans/business-loan", isBank: true },
      { id: "kotak-bl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/business/loans/business-loans.html", isBank: true },
      { id: "bajaj-bl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/business-loan", isBank: false },
      { id: "tata-bl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/business-loan.html", isBank: false },
      { id: "lendingkart-bl", name: "Lendingkart Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lendingkart logo", applyLink: "https://www.lendingkart.com/", isBank: false },
      { id: "flexiloans-bl", name: "FlexiLoans", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "flexiloans logo", applyLink: "https://flexiloans.com/", isBank: false },
      { id: "fullerton-bl", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/business-loan.aspx", isBank: false },
    ],
  },
  {
    id: "gold-loan",
    name: "Gold Loan",
    shortDescription: "Get instant cash by pledging your gold ornaments. Secure loans with minimal paperwork and quick disbursal.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Gold loan icon",
    iconDataAiHint: "gold bars",
    providers: [
        { id: "sbi-gl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/gold-loan", isBank: true },
        { id: "hdfc-gl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/gold-loan", isBank: true },
        { id: "icici-gl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/gold-loan", isBank: true },
        { id: "axis-gl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/gold-loan", isBank: true },
        { id: "federal-gl", name: "Federal Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "federal logo", applyLink: "https://www.federalbank.co.in/gold-loans", isBank: true }, // Kotak less prominent, using Federal
        { id: "muthoot-gl", name: "Muthoot Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "muthoot logo", applyLink: "https://www.muthootfinance.com/gold-loan", isBank: false },
        { id: "manappuram-gl", name: "Manappuram Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "manappuram logo", applyLink: "https://www.manappuram.com/gold-loan.html", isBank: false },
        { id: "iifl-gl", name: "IIFL Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "iifl logo", applyLink: "https://www.iifl.com/gold-loans", isBank: false },
        { id: "bajaj-gl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/gold-loan", isBank: false },
        { id: "indusind-gl", name: "IndusInd Bank (Gold Loan)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indusind logo", applyLink: "https://www.indusind.com/in/en/personal/loans/gold-loan.html", isBank: true },
    ]
  },
  {
    id: "loan-against-property",
    name: "Loan Against Property",
    shortDescription: "Unlock the value of your residential or commercial property. Get high loan amounts for various financial needs.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Loan against property icon",
    iconDataAiHint: "property document",
    providers: [
        { id: "sbi-lap", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/loan-against-property", isBank: true },
        { id: "hdfc-lap", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/loan-against-property", isBank: true },
        { id: "icici-lap", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/loan-against-property", isBank: true },
        { id: "axis-lap", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/loan-against-property", isBank: true },
        { id: "kotak-lap", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/loan-against-property.html", isBank: true },
        { id: "bajaj-lap", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/loan-against-property", isBank: false },
        { id: "tata-lap", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/loan-against-property.html", isBank: false },
        { id: "fullerton-lap", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/loan-against-property.aspx", isBank: false },
        { id: "lichfl-lap", name: "LIC Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lichfl logo", applyLink: "https://www.lichousing.com/loan-against-property", isBank: false },
        { id: "indiabulls-lap", name: "Indiabulls Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indiabulls logo", applyLink: "https://www.indiabullshomeloans.com/loan-against-property/", isBank: false },
    ]
  },
   {
    id: "two-wheeler-loan",
    name: "Two-Wheeler Loan",
    shortDescription: "Own your dream bike or scooter with easy EMIs. Fast processing and competitive interest rates.",
    iconImageUrl: "https://placehold.co/40x40.png",
    iconImageAlt: "Two-wheeler loan icon",
    iconDataAiHint: "motorcycle icon",
    providers: [
        { id: "sbi-twl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan", isBank: true },
        { id: "hdfc-twl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/two-wheeler-loan", isBank: true },
        { id: "icici-twl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/two-wheeler-loan", isBank: true },
        { id: "axis-twl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/two-wheeler-loan", isBank: true },
        { id: "kotak-twl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/two-wheeler-loan.html", isBank: true },
        { id: "bajajauto-twl", name: "Bajaj Auto Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajajauto logo", applyLink: "https://www.bajajautofinance.com/two-wheeler-loan", isBank: false },
        { id: "tvscredit-twl", name: "TVS Credit", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tvscredit logo", applyLink: "https://www.tvscredit.com/two-wheeler-loans/", isBank: false },
        { id: "ltfs-twl", name: "L&T Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "ltfs logo", applyLink: "https://www.ltfs.com/companies/lt-finance/two-wheeler-loan.html", isBank: false },
        { id: "shriramcity-twl", name: "Shriram City Union Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "shriramcity logo", applyLink: "https://www.shriramcity.in/two-wheeler-loan", isBank: false },
        { id: "hero-twl", name: "Hero FinCorp", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hero logo", applyLink: "https://www.herofincorp.com/two-wheeler-loan", isBank: false },
    ]
  },
];

export default function ApplyLoanPage() {
  const [selectedLoanTypeId, setSelectedLoanTypeId] = useState<string | null>(loanTypesData[0]?.id || null);

  const selectedLoan = loanTypesData.find(loan => loan.id === selectedLoanTypeId);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
          <FileText className="h-10 w-10" /> Explore Loan Options
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select a loan type to see available offers from leading financial institutions in India.
        </p>
      </header>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">Select Loan Type</h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {loanTypesData.map((loan) => (
            <Button
              key={loan.id}
              variant={selectedLoanTypeId === loan.id ? "default" : "outline"}
              onClick={() => setSelectedLoanTypeId(loan.id)}
              className={`flex flex-col items-center justify-center h-auto p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-primary group
                ${selectedLoanTypeId === loan.id ? 'ring-2 ring-primary border-primary bg-primary/10' : 'border-border'}`}
              style={{ minWidth: '130px' }}
            >
              <Image
                src={loan.iconImageUrl}
                alt={loan.iconImageAlt}
                width={32}
                height={32}
                className="mb-2 rounded-md group-hover:opacity-80 transition-opacity"
                data-ai-hint={loan.iconDataAiHint}
              />
              <span className="text-sm font-medium text-center">{loan.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {selectedLoan && (
        <Card className="shadow-xl w-full max-w-4xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
                <Image
                    src={selectedLoan.iconImageUrl}
                    alt={selectedLoan.iconImageAlt}
                    width={36}
                    height={36}
                    className="rounded-md border"
                    data-ai-hint={selectedLoan.iconDataAiHint}
                />
                <CardTitle className="text-2xl md:text-3xl text-primary">{selectedLoan.name}</CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground">
              {selectedLoan.shortDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Available from:</h3>
            {selectedLoan.providers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] hidden sm:table-cell">Logo</TableHead>
                      <TableHead>Institution Name</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedLoan.providers.map((provider) => (
                      <TableRow key={provider.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            src={provider.logoUrl}
                            alt={`${provider.name} logo`}
                            width={32}
                            height={32}
                            className="rounded-full border object-contain"
                            data-ai-hint={provider.dataAiHint}
                          />
                        </TableCell>
                        <TableCell className="font-medium py-3">{provider.name}</TableCell>
                        <TableCell className="text-right py-3">
                          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow transition-transform hover:scale-105">
                            <Link href={provider.applyLink} target="_blank" rel="noopener noreferrer">
                              Apply Now
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground">No providers listed for this loan type yet.</p>
            )}
          </CardContent>
        </Card>
      )}
      {!selectedLoan && loanTypesData.length > 0 && (
         <p className="text-center text-muted-foreground mt-10">Please select a loan type to see available providers.</p>
      )}
    </div>
  );
}

    