export default interface Material {
  [key: string]: string | boolean | undefined | number;
  id?: number;
  title: string;
  description: string;
  isNew?: boolean;
  imageUrl: string;
  href: string;
  order?: number;
}
