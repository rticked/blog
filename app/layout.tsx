import "./globals.css";
import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-black text-white antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}