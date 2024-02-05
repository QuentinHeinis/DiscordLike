import { Member, User } from "@prisma/client"

type MemberType = Member & {user: User}
type ServerMemberType = {
  members: MemberType[]
}
const ServerMember = ({members}:ServerMemberType) => {
  console.log(members[0].user);
  
  return (
    <div>{
      members.map((member) => (
        <p key={member.id}>{member.user.name}</p>
      ))
      }
    </div>
  )
}

export default ServerMember