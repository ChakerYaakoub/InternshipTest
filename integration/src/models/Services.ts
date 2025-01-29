export interface Service {
  id: string;
  title: string;
  description: string;
  progress: string;
  attachments: Array<{ id: string; path: string }>;
  comments: Array<{ id: string; content: string }>;
  collaborators: Array<{ id: string; avatar: string }>;
}
