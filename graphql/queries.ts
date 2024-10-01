import { gql } from '@apollo/client';

export const USER_INFO = gql`
query {
  userInfo {
    id
    email
    firstName
    lastName
  }
}
`;

export const MY_GROUPS = gql`
query {
	myGroups {
		id
		name
		description
		minRanking
		maxRanking
		increments
		rankIcon
		rankingsRequired		
		groupMembers {
			id
			groupId
			snobId
			role
			snob {
				email
				firstName
				lastName
			}
		}
		groupInvites {
			id
			email
			status
		}
		attributes {
			id
			name
		}
	}
}
`;

export const SEARCH_RANKING_ITEMS = gql`
query searchRankingItems(
	$groupId: String!,
	$keyword: String!,
	$page: Float!,
	$limit: Float!,
	$sort: RankingSortBy,
	$dir: RankingSortDirection
) {
	searchRankingItems(
		groupId: $groupId
		keyword: $keyword,
		page: $page,
		limit: $limit,
		sort: $sort,
		dir: $dir
	) {
		total
		pages
		items {
			id
			groupId
			description
			ranked
			averageRanking
			imageId
			imageUrl
			attributes {
				id
				attributeId
				attributeValue
			}
		}
	}
}
`;

export const RANKING_ITEMS = gql`
query getRankings($itemId: String!) {
	getRankings(itemId: $itemId) {
		id
		itemId
		groupMemberId
		rank
		notes
	}
}
`;

export const PENDING_GROUP_INVITES = gql`
query {
	getPendingGroupInvites {
		id
		groupId
		email
		status
		group {
			id
			name
		}
	}
}
`