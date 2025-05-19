import { Calculator, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Calculator className="h-8 w-8" />
          <h1 className="text-xl md:text-2xl font-bold">EMI Calculator</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/community" className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80">
                <MessageSquare className="h-5 w-5" />
                Community
              </Link>
            </li>
            {/* Additional navigation items can be added here if needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
