import { Icons } from "../../../../shared/components/v-icon/icons";
import { Card, Product } from "../../services/api";


export interface ProductCardProps {
  product: Product;
  card: Card;
}

export interface SectionProps {
  title: string;
  Body: any,
  iconFamily: keyof typeof Icons;
  iconName: string;
  iconLabel: string;
  onPress: () => any
}