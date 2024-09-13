import { makeVar } from '@apollo/client';
import { Group, RankingItem } from '../types/group';

export const selectedGroup = makeVar<Group | undefined>(undefined);
export const selectedRankingItem = makeVar<RankingItem | undefined>(undefined);
export const editingRankingItem = makeVar<RankingItem | undefined>(undefined);