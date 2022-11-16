export type Item = {
  modelID?: string;
  userId: string;
  category: string;
  description: string;
  sort: string;
  progress: number;
  done: boolean;
  goal: number;
  finished_at: number;
};
