export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}