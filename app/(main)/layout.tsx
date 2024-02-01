import MainNav from "@/components/navigation/MainNav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <MainNav/>
      {children}
    </>
  );
}