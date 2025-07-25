import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Excel Mock Interviewer - AI-Powered Assessment',
  description: 'Practice Excel skills with our AI-powered mock interviewer. Get instant feedback and improve your spreadsheet abilities.',
  keywords: 'Excel, interview, AI, assessment, skills, spreadsheet, practice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-900">
                      Excel Mock Interviewer
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Powered by AI
                  </span>
                </div>
              </div>
            </div>
          </header>
          
          <main>
            {children}
          </main>
          
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-500 text-sm">
                <p>&copy; 2025 Excel Mock Interviewer. AI-powered assessment platform.</p>
                <p className="mt-2">Practice your Excel skills with intelligent feedback.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
