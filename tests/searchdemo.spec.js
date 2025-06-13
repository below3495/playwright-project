import { test, expect } from '@playwright/test';

const TEXT = {
  searchPlaceholder: {
    ru: 'Найти ресторан, блюдо или товар',
    en: 'Search for restaurants, food'
  },
  searchButton: {
    ru: 'Найти',
    en: 'Search'
  },
  resultsHeader: {
    ru: 'Найдено',
    en: 'Found'
  }
};

test('search functionality test', async ({ page }) => {
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  
  const searchInput = page.getByRole('combobox', { name: new RegExp('ресторан|restaurant', 'i') });
  await searchInput.waitFor();
  await searchInput.click();
  
  await searchInput.fill('сыр');
  
  const searchButton = page
  .getByRole('button', { name: new RegExp('найти|search', 'i') })
  .last();
  await searchButton.click();
  
  const resultsHeader = page.getByRole('heading').filter({ hasText: new RegExp('найдено|found', 'i') });
  await expect(resultsHeader).toBeVisible();
  
  const resultsDiv = page.locator('#main div').filter({ hasText: new RegExp('найдено|found', 'i') }).first();
  await expect(resultsDiv).toBeVisible();
});