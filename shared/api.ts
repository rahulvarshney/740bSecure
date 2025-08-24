export interface AgentList {
  items: AgentListItem[];
}

export interface AgentListItem {
  // Non-empty in API request and response
  id?: string;

  // Non-empty in API response
  versionstamp?: string;

  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}