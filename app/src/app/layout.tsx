import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { SearchProvider } from '@/components/search/search-provider';
import { AppShell } from '@/components/shell/app-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Patient Hub',
  description: 'Tennr Patient Hub',
};

const featureDisplayFont = localFont({
  src: [
    {
      path: '../../../lasso/assets/fonts/FeatureDisplay-Light-Web.woff2',
      style: 'normal',
    },
    {
      path: '../../../lasso/assets/fonts/FeatureDisplay-LightItalic-Web.woff2',
      style: 'italic',
    },
  ],
  display: 'block',
  variable: '--font-display',
});

const marfaFont = localFont({
  src: '../../../lasso/assets/fonts/ABCMarfaVariableVF.woff2',
  display: 'block',
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lasso" className="h-full overflow-hidden" suppressHydrationWarning>
      <body
        className={`${featureDisplayFont.variable} ${marfaFont.variable} antialiased h-full overflow-hidden`}
        suppressHydrationWarning
      >
        <SearchProvider>
          <AppShell>{children}</AppShell>
        </SearchProvider>
{process.env.NEXT_PUBLIC_ENABLE_GRAFT === 'true' && (
          <Script
            src="http://localhost:3000/widget.js"
            data-project="jh7aqt5ftkq5jg5k9hgmsc5wbh802h6y"
            data-api-key="gft_x4ub9yey2xubjod0lye0fbb4"
            data-convex-url="https://accurate-meadowlark-931.convex.site"
          />
        )}
      </body>
    </html>
  );
}
