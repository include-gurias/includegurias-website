export interface TeamMember {
  id?: number;
  name: string;
  job?: string;
  imageUrl?: string;
  href?: string;
  order?: number;
}

// usado no all team members component
export interface OldMember {
  name: string;
  job?: string;
  imageUrl?: string;
}

// usado no bolsistas component
export interface ScholarshipMember {
  name: string;
  imageUrl?: string;
}
