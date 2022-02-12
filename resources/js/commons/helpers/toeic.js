import * as constCategory from '@/constants/categories';

export function getPartToeic (categoryId) {
  switch (Number(categoryId)) {
    case constCategory.TOEIC_P1:
      return [1];
    case constCategory.TOEIC_P2:
      return [2];
    case constCategory.TOEIC_P3:
      return [3];
    case constCategory.TOEIC_P4:
      return [4];
    case constCategory.TOEIC_P5:
      return [5];
    case constCategory.TOEIC_P6:
      return [6];
    case constCategory.TOEIC_P7:
      return [7];
    default:
      return [1, 2, 3, 4, 5, 6, 7];
  }
}