import './globals.css';

export const metadata = {
  title: 'Painterly Customizer',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
