import { cache } from 'react';

export type Category = {
  name: string;
  slug: string;
  count: number;
  items: Omit<Category, 'items'>[];
};

export const roomOptions = cache((): Category[] => [
  {
    name: 'Delete',
    slug: 'deleteroom',
    count: 5,
    items: [
     
    ],
  },
  {
    name: 'Available',
    slug: 'available',
    count: 6,
    items: [
     
    ],
  }
]);

export async function fetchCategoryBySlug(slug: string | undefined) {
  // Assuming it always return expected categories
  return roomOptions().find((category) => category.slug === slug);
}

export async function fetchCategories(): Promise<Category[]> {
  return roomOptions();
}

async function findSubCategory(
  category: Category | undefined,
  subCategorySlug: string | undefined,
) {
  return category?.items.find((category) => category.slug === subCategorySlug);
}

export async function fetchSubCategory(
  categorySlug: string | undefined,
  subCategorySlug: string | undefined,
) {
  const category = await fetchCategoryBySlug(categorySlug);
  return findSubCategory(category, subCategorySlug);
}
