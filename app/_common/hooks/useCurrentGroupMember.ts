import { useQuery } from "@apollo/client";
import { Group } from "../types/group";
import { UserInfo } from "../types/snob";
import { USER_INFO } from "../graphql/queries";

const useCurrentGroupMember = (group: Group) => {
    const { data } = useQuery<UserInfo>(USER_INFO);
    if (data) {
        return group.groupMembers.find((member) => member.snobId === data.userInfo.id);
    }
}

export default useCurrentGroupMember;