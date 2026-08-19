export default interface News {
  id?: number;
  title: string;
  text: string;
  imageUrl?: string;
  href?: string;
  date: string;
  showInTimeline: boolean;
  order?: number;
}
