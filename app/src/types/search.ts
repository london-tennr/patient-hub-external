import type { Patient } from './patient';
import type { Order } from './order';

export interface PatientSearchResult {
  type: 'patient';
  patient: Patient;
  currentOrderStage?: string;
}

export interface OrderSearchResult {
  type: 'order';
  order: Order;
}

export type SearchResult = PatientSearchResult | OrderSearchResult;

export interface SearchState {
  query: string;
  results: SearchResult[];
  recentSearches: SearchResult[];
  isLoading: boolean;
  selectedIndex: number;
}
