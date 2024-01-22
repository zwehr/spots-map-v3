import NavBar from '../components/nav/NavBar';
import './globals.css';
import { oswald } from './fonts';

export const metadata = {
  title: 'Skate Tourism',
  description: 'Find skate spots all around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={oswald.className}>
      <body>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
