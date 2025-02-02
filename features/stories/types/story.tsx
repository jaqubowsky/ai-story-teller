export const enum Status {
  GENERATING = "GENERATING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  QUEUED = "QUEUED",
}

export type Story = {
  id: string;
  title: string;
  description: string;
  content: string;
  status: Status;
};
