import { Group, Ranking } from "../types/group";
import { Snob } from "../types/snob";

export const getSnobInitials = (snob?: Snob) => {
    if (snob) {
        return ((snob.firstName && snob.lastName) ? `${snob.firstName.charAt(0)}${snob.lastName.charAt(0)}` : snob.email.charAt(0)).toUpperCase();
    }
    return '';
}

export const getSnobIdentifier = (snob?: Snob) => {
    if (snob) {
        return (snob.firstName && snob.lastName) ? `${snob.firstName} ${snob.lastName}` : snob.email;
    }
    return '';
}

export const getGroupInitials = (group: Group) => {
    if (group.name) {
        const words = group.name.split(' ');
        return (words.length > 1 ? `${words[0].charAt(0)}${words[1].charAt(0)}` : words[0].charAt(0)).toUpperCase();
    }
    return '';
}

export const getGroupMember = (group: Group, ranking: Ranking) => {
    return group.groupMembers.find((member) => member.id === ranking.groupMemberId);
}