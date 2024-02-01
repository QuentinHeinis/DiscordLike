export default function SignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid place-content-center w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}