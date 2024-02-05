import getCurrentUser from "@/lib/current-profil"

export default async function Template({ children }: { children: React.ReactNode }) {  
  return (
  <>
    {children}
  </>
  )
}