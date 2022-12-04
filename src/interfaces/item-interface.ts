export type Item = {
  id?: string;
  userId: string;
  category: string;
  description: string;
  sort: string;
  progress: number;
  done: boolean;
  goal: number;
  finishedAt: string;
};
