import { Snob } from "./snob";

export interface RankingItemAttribute {
    id: string;
    attributeId: string;
    attributeValue: string;
}

export interface RankingItem {
    id: string;
    description: string;
    averageRanking: number;
    ranked: boolean;
    imageId?: string;
    imageUrl?: string;
    attributes: RankingItemAttribute[];
}

export const defaultNewRankingItem: RankingItem = {
    id: '',
    description: '',
    averageRanking: 0,
    ranked: false,
    attributes: [],
}

export interface RankingItemSearchResult {
    searchRankingItems: {
        total: number;
        pages: number;
        items: RankingItem[]
    }
}

export enum RankingItemSoryBy {
    DESCRIPTION = 'DESCRIPTION',
    AVERAGE_RANKING = 'AVERAGE_RANKING'
}

export enum RankingItemSortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum Role {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER'
}

export interface GroupMember {
    id: string;
    groupId: string;
    snobId: string;
    role: Role;
    snob: Snob;
}

export interface GroupAttribute {
    id: string;
    name: string;
}

export interface Group {
    id: string;
    name: string;
    description: string;
    minRanking: number;
    maxRanking: number;
    increments: number;
    rankIcon: string;
    rankingsRequired: number;
    rankingItems: RankingItem[];
    groupMembers: GroupMember[];
    groupInvites: GroupInvite[];
    attributes: GroupAttribute[]
}

export const defaultNewGroup: Group = {
    id: '',
    name: '',
    description: '',
    minRanking: 1,
    maxRanking: 5,
    increments: .5,
    rankIcon: 'star',
    rankingsRequired: 1,
    rankingItems: [],
    groupMembers: [],
    groupInvites: [],
    attributes: [],
}

export interface MyGroups {
    myGroups: Group[];
}

export interface Ranking {
    id: string;
    itemId: string;
    groupMemberId: string;
    rank: number;
    notes: string;
}

export interface Rankings {
    getRankings: Ranking[];
}

export enum InviteStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

export interface GroupInvite {
    id: string;
    groupId: string;
    email: string;
    status: InviteStatus;
    group?: Group;
}

export interface PendingGroupInvites {
    getPendingGroupInvites: GroupInvite[];
}