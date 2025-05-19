
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
import { FileText, Banknote, Home, Car, GraduationCap, Briefcase, Gem, Landmark as BuildingIcon, Bike } from "lucide-react"; 

interface BankProvider {
  id: string;
  name: string;
  logoUrl: string;
  dataAiHint: string;
  applyLink: string;
  isBank: boolean;
  interestRate: string; 
}

interface LoanType {
  id: string;
  name: string;
  shortDescription: string;
  pageIcon: React.ElementType; 
  providers: BankProvider[];
}

const loanTypesData: LoanType[] = [
  {
    id: "personal-loan",
    name: "Personal Loan",
    shortDescription: "Flexible financing for weddings, travel, medical emergencies, or debt consolidation. Quick approvals, often unsecured.",
    pageIcon: Banknote,
    providers: [
      { id: "sbi-pl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/personal-loans", isBank: true, interestRate: "11.15% - 15.30% p.a." },
      { id: "hdfc-pl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan", isBank: true, interestRate: "10.50% - 14.50% p.a." },
      { id: "icici-pl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/personal-loan", isBank: true, interestRate: "10.80% - 16.00% p.a." },
      { id: "axis-pl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/personal-loan", isBank: true, interestRate: "10.99% - 17.00% p.a." },
      { id: "kotak-pl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/personal-loan.html", isBank: true, interestRate: "10.99% onwards" },
      { id: "bajaj-pl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/personal-loan", isBank: false, interestRate: "11.00% onwards" },
      { id: "tata-pl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/personal-loan.html", isBank: false, interestRate: "10.99% onwards" },
      { id: "moneyview-pl", name: "MoneyView", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "moneyview logo", applyLink: "https://moneyview.in/personal-loan", isBank: false, interestRate: "15.96% onwards" },
      { id: "fullerton-pl", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/personal-loan.aspx", isBank: false, interestRate: "11.99% onwards" },
      { id: "indusind-pl", name: "IndusInd Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indusind logo", applyLink: "https://www.indusind.com/in/en/personal/loans/personal-loan.html", isBank: true, interestRate: "10.49% onwards" },
    ],
  },
  {
    id: "home-loan",
    name: "Home Loan",
    shortDescription: "Finance your dream home purchase, construction, or renovation. Typically offers long tenures and tax benefits.",
    pageIcon: Home,
    providers: [
      { id: "sbi-hl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://homeloans.sbi/", isBank: true, interestRate: "8.50% - 9.85% p.a." },
      { id: "hdfc-hl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan", isBank: true, interestRate: "8.70% onwards" },
      { id: "icici-hl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/home-loan", isBank: true, interestRate: "8.75% onwards" },
      { id: "axis-hl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/home-loan", isBank: true, interestRate: "8.75% onwards" },
      { id: "kotak-hl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/home-loan.html", isBank: true, interestRate: "8.70% onwards" },
      { id: "bajaj-hl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/home-loan", isBank: false, interestRate: "8.60% onwards" },
      { id: "tata-hl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/home-loan.html", isBank: false, interestRate: "8.95% onwards" },
      { id: "pnbhfl-hl", name: "PNB Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "pnbhfl logo", applyLink: "https://www.pnbhousing.com/", isBank: false, interestRate: "8.75% onwards" },
      { id: "lichfl-hl", name: "LIC Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lichfl logo", applyLink: "https://www.lichousing.com/", isBank: false, interestRate: "8.50% onwards" },
      { id: "indiabulls-hl", name: "Indiabulls Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indiabulls logo", applyLink: "https://www.indiabullshomeloans.com/", isBank: false, interestRate: "8.99% onwards" },
    ],
  },
  {
    id: "car-loan",
    name: "Car Loan",
    shortDescription: "Finance your new or used car purchase with flexible repayment options and competitive interest rates.",
    pageIcon: Car,
    providers: [
      { id: "sbi-cl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/auto-loans", isBank: true, interestRate: "8.80% - 9.80% p.a." },
      { id: "hdfc-cl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/new-car-loan", isBank: true, interestRate: "9.40% onwards" },
      { id: "icici-cl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/car-loan", isBank: true, interestRate: "9.00% onwards" },
      { id: "axis-cl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/car-loan", isBank: true, interestRate: "9.30% onwards" },
      { id: "kotak-cl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/car-loan.html", isBank: true, interestRate: "8.75% onwards" },
      { id: "tata-cl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/car-loan.html", isBank: false, interestRate: "10.75% onwards" },
      { id: "mahindra-cl", name: "Mahindra Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "mahindra logo", applyLink: "https://www.mahindrafinance.com/loans/vehicle-loans/car-loan", isBank: false, interestRate: "Rates vary" },
      { id: "sundaram-cl", name: "Sundaram Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sundaram logo", applyLink: "https://www.sundaramfinance.in/vehicle-loans/car-loans", isBank: false, interestRate: "Rates vary" },
      { id: "cholamandalam-cl", name: "Cholamandalam Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "chola logo", applyLink: "https://www.cholamandalam.com/vehicle-finance/car-loans", isBank: false, interestRate: "Rates vary" },
      { id: "bajajauto-cl", name: "Bajaj Auto Finance (Used Car)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajautofinance.com/used-car-loan", isBank: false, interestRate: "Rates vary" },
    ],
  },
  {
    id: "education-loan",
    name: "Education Loan",
    shortDescription: "Fund your higher education in India or abroad, covering tuition fees, living expenses, and other associated costs.",
    pageIcon: GraduationCap,
    providers: [
      { id: "sbi-el", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/education-loans", isBank: true, interestRate: "8.55% - 11.75% p.a." },
      { id: "hdfc-el", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan", isBank: true, interestRate: "9.50% onwards" },
      { id: "icici-el", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/education-loan", isBank: true, interestRate: "10.00% onwards" },
      { id: "axis-el", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/education-loan", isBank: true, interestRate: "10.50% onwards" },
      { id: "bob-el", name: "Bank of Baroda", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bob logo", applyLink: "https://www.bankofbaroda.in/personal-banking/loans/education-loan", isBank: true, interestRate: "8.15% - 11.15% p.a." },
      { id: "avanse-el", name: "Avanse Financial Services", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "avanse logo", applyLink: "https://www.avanse.com/", isBank: false, interestRate: "11.00% onwards" },
      { id: "hdfccredila-el", name: "HDFC Credila", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "credila logo", applyLink: "https://www.hdfccredila.com/", isBank: false, interestRate: "11.25% onwards" },
      { id: "auxilo-el", name: "Auxilo", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "auxilo logo", applyLink: "https://www.auxilo.com/", isBank: false, interestRate: "11.50% onwards" },
      { id: "incred-el", name: "InCred", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "incred logo", applyLink: "https://www.incred.com/education-loan/", isBank: false, interestRate: "11.00% onwards" },
      { id: "propelld-el", name: "Propelld", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "propelld logo", applyLink: "https://propelld.com/", isBank: false, interestRate: "12.00% onwards" },
    ],
  },
   {
    id: "business-loan",
    name: "Business Loan",
    shortDescription: "Secure funding for your business expansion, working capital needs, or purchasing new equipment.",
    pageIcon: Briefcase,
    providers: [
      { id: "sbi-bl", name: "State Bank of India (SME Loans)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/sme/sme-loans", isBank: true, interestRate: "Rates vary by scheme" },
      { id: "hdfc-bl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/sme/borrow/business-loan", isBank: true, interestRate: "11.90% - 16.55% p.a." },
      { id: "icici-bl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/business-banking/loans/business-loan", isBank: true, interestRate: "11.25% onwards" },
      { id: "axis-bl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/business-banking/loans/business-loan", isBank: true, interestRate: "11.50% onwards" },
      { id: "kotak-bl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/business/loans/business-loans.html", isBank: true, interestRate: "Rates vary" },
      { id: "bajaj-bl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/business-loan", isBank: false, interestRate: "9.75% - 30.00% p.a." },
      { id: "tata-bl", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/business-loan.html", isBank: false, interestRate: "12.00% onwards" },
      { id: "lendingkart-bl", name: "Lendingkart Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lendingkart logo", applyLink: "https://www.lendingkart.com/", isBank: false, interestRate: "12.00% - 27.00% p.a." },
      { id: "flexiloans-bl", name: "FlexiLoans", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "flexiloans logo", applyLink: "https://flexiloans.com/", isBank: false, interestRate: "12.00% onwards" },
      { id: "fullerton-bl", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/business-loan.aspx", isBank: false, interestRate: "12.00% onwards" },
    ],
  },
  {
    id: "gold-loan",
    name: "Gold Loan",
    shortDescription: "Get instant cash by pledging your gold ornaments. Secure loans with minimal paperwork and quick disbursal.",
    pageIcon: Gem,
    providers: [
        { id: "sbi-gl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/gold-loan", isBank: true, interestRate: "7.50% + 0.25% (spread) p.a." },
        { id: "hdfc-gl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/gold-loan", isBank: true, interestRate: "9.90% onwards" },
        { id: "icici-gl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/gold-loan", isBank: true, interestRate: "10.00% onwards" },
        { id: "axis-gl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/gold-loan", isBank: true, interestRate: "10.50% onwards" },
        { id: "federal-gl", name: "Federal Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "federal logo", applyLink: "https://www.federalbank.co.in/gold-loans", isBank: true, interestRate: "8.99% onwards" },
        { id: "muthoot-gl", name: "Muthoot Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "muthoot logo", applyLink: "https://www.muthootfinance.com/gold-loan", isBank: false, interestRate: "12.00% - 24.00% p.a." },
        { id: "manappuram-gl", name: "Manappuram Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "manappuram logo", applyLink: "https://www.manappuram.com/gold-loan.html", isBank: false, interestRate: "12.00% - 29.00% p.a." },
        { id: "iifl-gl", name: "IIFL Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "iifl logo", applyLink: "https://www.iifl.com/gold-loans", isBank: false, interestRate: "9.24% - 24.00% p.a." },
        { id: "bajaj-gl", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/gold-loan", isBank: false, interestRate: "9.50% - 28.00% p.a." },
        { id: "indusind-gl", name: "IndusInd Bank (Gold Loan)", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indusind logo", applyLink: "https://www.indusind.com/in/en/personal/loans/gold-loan.html", isBank: true, interestRate: "9.00% onwards" },
    ]
  },
  {
    id: "loan-against-property",
    name: "Loan Against Property",
    shortDescription: "Unlock the value of your residential or commercial property. Get high loan amounts for various financial needs.",
    pageIcon: BuildingIcon,
    providers: [
        { id: "sbi-lap", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/loan-against-property", isBank: true, interestRate: "10.10% - 11.70% p.a." },
        { id: "hdfc-lap", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/loan-against-property", isBank: true, interestRate: "9.65% onwards" },
        { id: "icici-lap", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/loan-against-property", isBank: true, interestRate: "9.75% onwards" },
        { id: "axis-lap", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/loan-against-property", isBank: true, interestRate: "10.50% onwards" },
        { id: "kotak-lap", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/loan-against-property.html", isBank: true, interestRate: "9.75% onwards" },
        { id: "bajaj-lap", name: "Bajaj Finserv", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajaj logo", applyLink: "https://www.bajajfinserv.in/loan-against-property", isBank: false, interestRate: "9.00% - 16.00% p.a." },
        { id: "tata-lap", name: "Tata Capital", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tata logo", applyLink: "https://www.tatacapital.com/loan-against-property.html", isBank: false, interestRate: "10.10% onwards" },
        { id: "fullerton-lap", name: "Fullerton India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "fullerton logo", applyLink: "https://www.fullertonindia.com/loan-against-property.aspx", isBank: false, interestRate: "9.00% onwards" },
        { id: "lichfl-lap", name: "LIC Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "lichfl logo", applyLink: "https://www.lichousing.com/loan-against-property", isBank: false, interestRate: "9.50% onwards" },
        { id: "indiabulls-lap", name: "Indiabulls Housing Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "indiabulls logo", applyLink: "https://www.indiabullshomeloans.com/loan-against-property/", isBank: false, interestRate: "10.00% onwards" },
    ]
  },
   {
    id: "two-wheeler-loan",
    name: "Two-Wheeler Loan",
    shortDescription: "Own your dream bike or scooter with easy EMIs. Fast processing and competitive interest rates.",
    pageIcon: Bike,
    providers: [
        { id: "sbi-twl", name: "State Bank of India", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "sbi logo", applyLink: "https://sbi.co.in/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan", isBank: true, interestRate: "12.80% - 14.05% p.a." },
        { id: "hdfc-twl", name: "HDFC Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hdfc logo", applyLink: "https://www.hdfcbank.com/personal/borrow/popular-loans/two-wheeler-loan", isBank: true, interestRate: "14.50% onwards" },
        { id: "icici-twl", name: "ICICI Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "icici logo", applyLink: "https://www.icicibank.com/personal-banking/loans/two-wheeler-loan", isBank: true, interestRate: "10.50% onwards" },
        { id: "axis-twl", name: "Axis Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "axis logo", applyLink: "https://www.axisbank.com/retail/loans/two-wheeler-loan", isBank: true, interestRate: "11.00% onwards" },
        { id: "kotak-twl", name: "Kotak Mahindra Bank", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "kotak logo", applyLink: "https://www.kotak.com/en/personal-banking/loans/two-wheeler-loan.html", isBank: true, interestRate: "10.00% onwards" },
        { id: "bajajauto-twl", name: "Bajaj Auto Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "bajajauto logo", applyLink: "https://www.bajajautofinance.com/two-wheeler-loan", isBank: false, interestRate: "6.99% onwards (may vary)" },
        { id: "tvscredit-twl", name: "TVS Credit", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "tvscredit logo", applyLink: "https://www.tvscredit.com/two-wheeler-loans/", isBank: false, interestRate: "Rates vary" },
        { id: "ltfs-twl", name: "L&T Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "ltfs logo", applyLink: "https://www.ltfs.com/companies/lt-finance/two-wheeler-loan.html", isBank: false, interestRate: "Rates vary" },
        { id: "shriramcity-twl", name: "Shriram City Union Finance", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "shriramcity logo", applyLink: "https://www.shriramcity.in/two-wheeler-loan", isBank: false, interestRate: "Rates vary" },
        { id: "hero-twl", name: "Hero FinCorp", logoUrl: "https://placehold.co/32x32.png", dataAiHint: "hero logo", applyLink: "https://www.herofincorp.com/two-wheeler-loan", isBank: false, interestRate: "Rates vary" },
    ]
  },
];

export default function ApplyLoanPage() {
  const [selectedLoanTypeId, setSelectedLoanTypeId] = useState<string | null>(loanTypesData[0]?.id || null);

  const selectedLoan = loanTypesData.find(loan => loan.id === selectedLoanTypeId);
  const PageSpecificIcon = selectedLoan?.pageIcon || FileText; // Fallback icon

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
          <FileText className="h-10 w-10" /> Explore Loan Options
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select a loan type to see available offers from leading financial institutions in India. Interest rates are indicative and subject to change.
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
              className={`p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-primary group
                ${selectedLoanTypeId === loan.id ? 'ring-2 ring-primary border-primary bg-primary/10' : 'border-border'}`}
              style={{ minWidth: '150px', minHeight: '60px' }}
            >
              <span className={`text-sm font-medium text-center ${selectedLoanTypeId === loan.id ? 'text-primary' : 'text-foreground'}`}>
                {loan.name}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {selectedLoan && (
        <Card className="shadow-xl w-full max-w-4xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
                <PageSpecificIcon className="h-8 w-8 text-primary" /> 
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
                      <TableHead className="text-center">Interest Rate (p.a.)</TableHead> 
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
                        <TableCell className="text-center font-semibold text-primary py-3">{provider.interestRate}</TableCell> 
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
