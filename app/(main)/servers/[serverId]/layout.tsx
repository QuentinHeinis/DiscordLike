import Navigation from "@/components/navigation/main/Navigation";
type ServerLayoutType = {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
};
export default async function MainLayout({
  children,
  params,
}: ServerLayoutType) {
  return (
    <>
      <Navigation type="servers" id={params.serverId} />
      <main className="max-h-screen h-screen bg-neutral-200 dark:bg-neutral-700 w-full pb-0 relative overflow-hidden">
        {children}
      </main>
    </>
  );
}
