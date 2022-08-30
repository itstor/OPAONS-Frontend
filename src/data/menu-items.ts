import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFile, faPenToSquare, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faHome, faRankingStar } from '@fortawesome/free-solid-svg-icons';

export type MenuItem = {
  id: string;
  title: string;
  caption?: string;
  type: 'item' | 'group' | 'collapse';
  children?: Array<MenuItem>;
  url?: string;
  icon?: IconDefinition;
};

const items: Array<MenuItem> = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/',
        icon: faHome,
      },
    ],
  },
  {
    id: 'manage',
    title: 'Manage',
    type: 'group',
    children: [
      {
        id: 'manageTim',
        title: 'Tim',
        type: 'item',
        url: '/manage/tim',
        icon: faUserCircle,
      },
    ],
  },
  {
    id: 'babak1',
    title: 'Babak 1',
    type: 'group',
    children: [
      {
        id: 'soal',
        title: 'Soal',
        type: 'collapse',
        icon: faFile,
        children: [
          {
            id: 'soalsma1',
            title: 'Soal SMA',
            type: 'item',
            url: '/soal/sma?babak=1',
          },
          {
            id: 'soalsmk1',
            title: 'Soal SMK',
            type: 'item',
            url: '/soal/smk?babak=1',
          },
        ],
      },
      {
        id: 'review1',
        title: 'Review',
        type: 'collapse',
        icon: faPenToSquare,
        children: [
          {
            id: 'reviewsma1',
            title: 'Kategori SMA',
            type: 'item',
            url: '/review/sma?babak=1',
          },
          {
            id: 'reviewsmk1',
            title: 'Kategori SMK',
            type: 'item',
            url: '/review/smk?babak=1',
          },
        ],
      },
      {
        id: 'ranking1',
        title: 'Ranking',
        type: 'collapse',
        icon: faRankingStar,
        children: [
          {
            id: 'ranking1sma',
            title: 'Ranking SMA',
            type: 'item',
            url: '/ranking/sma?babak=1',
          },
          {
            id: 'ranking1smk',
            title: 'Ranking SMK',
            type: 'item',
            url: '/ranking/smk?babak=1',
          },
        ],
      },
    ],
  },
  {
    id: 'babak2',
    title: 'Babak 2',
    type: 'group',
    children: [
      {
        id: 'soal',
        title: 'Soal',
        type: 'collapse',
        icon: faFile,
        children: [
          {
            id: 'soalsma2',
            title: 'Soal SMA',
            type: 'item',
            url: '/soal/sma?babak=2',
          },
          {
            id: 'soalsma2',
            title: 'Soal SMK',
            type: 'item',
            url: '/soal/smk?babak=2',
          },
        ],
      },
      {
        id: 'review2',
        title: 'Review',
        type: 'collapse',
        icon: faPenToSquare,
        children: [
          {
            id: 'hasilsma1',
            title: 'Kategori SMA',
            type: 'item',
            url: '/review/sma?babak=2',
          },
          {
            id: 'hasilsmk1',
            title: 'Kategori SMK',
            type: 'item',
            url: '/review/smk?babak=2',
          },
        ],
      },
      {
        id: 'ranking2',
        title: 'Ranking',
        type: 'collapse',
        icon: faRankingStar,
        children: [
          {
            id: 'ranking2sma',
            title: 'Ranking SMA',
            type: 'item',
            url: '/ranking/sma?babak=2',
          },
          {
            id: 'ranking2smk',
            title: 'Ranking SMK',
            type: 'item',
            url: '/ranking/smk?babak=2',
          },
        ],
      },
    ],
  },
];

export { items };
