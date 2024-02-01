import ServersNav from "@/components/navigation/ServersNav";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
  <>
    {/* <ServersNav serverId="1"/> */}
    {children}
  </>
  )
}