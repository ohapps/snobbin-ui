import { gql } from "@apollo/client";

export const CREATE_RANKING_GROUP = gql`
mutation createGroup($name: String!, $description: String!, $minRanking: Int!, $maxRanking: Int!, $increment: Float!, $rankIcon: String!, $rankingsRequired: Int!, $attributes: [SnobGroupAttributeUpdate!]) {
	createGroup(
		snobGroupUpdate: {
			name: $name
			description: $description
			minRanking: $minRanking
			maxRanking: $maxRanking
			increments: $increment
			rankIcon: $rankIcon
			rankingsRequired: $rankingsRequired
			attributes: $attributes
		}
	) {
		id
        name
        description
        minRanking
        maxRanking
        increments
        rankIcon
		rankingsRequired
	}
}
`;

export const UPDATE_RANKING_GROUP = gql`
mutation updateGroup($id: String!, $name: String!, $description: String!, $minRanking: Int!, $maxRanking: Int!, $increment: Float!, $rankIcon: String!, $rankingsRequired: Int!, $attributes: [SnobGroupAttributeUpdate!]) {
	updateGroup(
		id: $id,
		snobGroupUpdate: {
			name: $name
			description: $description
			minRanking: $minRanking
			maxRanking: $maxRanking
			increments: $increment
			rankIcon: $rankIcon
			rankingsRequired: $rankingsRequired
			attributes: $attributes
		}
	) {
		id
        name
        description
        minRanking
        maxRanking
        increments
        rankIcon
		rankingsRequired
	}
}
`;

export const DELETE_RANKING_GROUP = gql`
mutation deleteGroup($id: String!) {
	deleteGroup(
		id: $id
	) {
		id        
	}
}
`;

export const CREATE_RANKING_ITEM = gql`
mutation createRankingItem($groupId: String!, $description: String!, $attributes: [RankingItemAttributeUpdate]!) {
	createRankingItem(
		groupId: $groupId,
		rankingItemUpdate: {
			description: $description
			attributes: $attributes
		}
	) {
		id
		description
		ranked
	}
}
`;

export const UPDATE_RANKING_ITEM = gql`
mutation updateRankingItem($id: String!, $description: String!, $attributes: [RankingItemAttributeUpdate]!) {
	updateRankingItem(
		id: $id,
		rankingItemUpdate: {
			description: $description
			attributes: $attributes
		}
	) {
		id
		description
		ranked
	}
}
`;

export const DELETE_RANKING_ITEM = gql`
mutation deleteRankingItem($id: String!) {
	deleteRankingItem(
		id: $id
	) {
		id
		description		
	}
}
`;

export const CREATE_RANKING = gql`
mutation createRanking($itemId: String!, $rank: Float!, $notes: String!) {
	createRanking(
		itemId: $itemId,
		rankingUpdate: {
			rank: $rank
			notes: $notes
		}
	) {
		id
		rank
		notes
	}
}
`;

export const UPDATE_RANKING = gql`
mutation updateRanking($id: String!, $rank: Float!, $notes: String!) {
	updateRanking(
		id: $id,
		rankingUpdate: {
			rank: $rank
			notes: $notes
		}
	) {
		id
		rank
		notes
	}
}
`;

export const UPDATE_PROFILE = gql`
mutation updateSnobInfo($firstName: String!, $lastName: String!) {
	updateSnobInfo(snobUpdate: {		
		firstName: $firstName,
		lastName: $lastName
	}) {
		id
		email
		firstName
		lastName
	}
}
`;

export const CREATE_GROUP_INVITE = gql`
mutation createGroupInvite($groupId: String!, $email: String!) {
	createGroupInvite(
		snobGroupInviteRequest: {
			groupId: $groupId
			email: $email
		}
	) {
		id
		groupId
		email
		status
	}
}
`;

export const DELETE_GROUP_INVITE = gql`
mutation deleteGroupInvite($id: String!) {
	deleteGroupInvite(id: $id) {
		id
		groupId
		email
		status
	}
}
`;

export const ACCEPT_GROUP_INVITE = gql`
mutation acceptGroupInvite($id: String!) {
	acceptGroupInvite(id: $id) {
		id
	}
}
`;