export enum UserRole {
  Peh = 'peh',
  Agency = 'agency',
}

export type Housing = {
  id: string;
  name: string;
  description: string;
  location: string;
  isAvailable: boolean;
  contact: string;
};
