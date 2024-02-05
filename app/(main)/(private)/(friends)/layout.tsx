import Navigation from "@/components/navigation/main/Navigation";
export default async function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Navigation type="friends" />
      {children}
    </>
  );
}