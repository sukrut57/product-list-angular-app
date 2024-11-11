import {Image} from './Image.model';

export interface Product{
  id: number
  image: Image
  name: string
  category: string
  price: number
}

