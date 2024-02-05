import Navigation from "@/components/navigation/main/Navigation";
type ServerLayoutType = {
  children: React.ReactNode,
  params:{
    serverId:string
  }
}
export default async function MainLayout({
  children, params
}: ServerLayoutType) {

  return (
    <>
      <Navigation type="servers" id={params.serverId}/>
      {children}
    </>
  );
}