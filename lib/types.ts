export type Label = "positive" | "negative" | "neutral" | null;

export interface AnnotItem {
  id: string;
  user: string;
  createdAt: string; // ISO date or parsable string
  text: string;
  label: Label;
}
