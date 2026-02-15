export default interface Partner {
  id: string | number;
  name: string;
  href?: string;
  imageUrl: string;
  active: boolean;
  order?: number;
}
