export type ActivityType =
  | 'oficina'
  | 'visitaTecnica'
  | 'curso'
  | 'live'
  | 'palestra'
  | 'escolaParceira'
  | 'snct';

export interface Activity {
  id?: string;
  title: string;
  description: string;
  type: ActivityType;
  date: string;
  imageUrl: string;
  showOnHomepage: boolean;
  details: {
    [key: string]: string | number | undefined;
  };
}

export default Activity;
