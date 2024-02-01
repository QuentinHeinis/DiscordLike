import FriendsNav from "@/components/navigation/FriendsNav";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
  <>
    <FriendsNav/>
    {children}
  </>
  )
}