import Navigation from "@/components/navigation/Navigation";
export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <Navigation/>
      {children}
    </>
  );
}