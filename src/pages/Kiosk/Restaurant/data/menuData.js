import octopus from '../assets/octopus.png';
import squid from '../assets/squid.png';
import pork from '../assets/pork.png';

export const categories = [
  '메인메뉴',
  '음료',
  '디저트',
];

export const menus = [
  {
    id: 1,
    category: '메인메뉴',
    name: '문어다리 꼬치',
    price: 13000,
    image: octopus,
    soldOut: true,
  },
  {
    id: 2,
    category: '메인메뉴',
    name: '제주 한치 꼬치',
    price: 18000,
    image: squid,
  },
  {
    id: 3,
    category: '메인메뉴',
    name: '항정살 꼬치',
    price: 12000,
    image: pork,
  },
];