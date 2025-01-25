export type Story = {
  id: string;
  title: string;
  description: string;
  content: string;
  status: "GENERATING" | "COMPLETED" | "FAILED";
};
