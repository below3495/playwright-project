import { test, expect } from '@playwright/test';

const TEXT = {
  logoName: {
    ru: 'Логотип Яндекс Еды',
    en: 'Yandex Eats logo'
  },
  shops: {
    ru: 'Магазины',
    en: 'Shops'
  },
  searchPlaceholder: {
    ru: 'Найти ресторан, блюдо или товар',
    en: 'Search for restaurants, food'
  }
};

test('test', async ({ page }) => {
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  await page.getByRole('link', { name: 'Магнит Доставка 35 – 45' });
  await page.getByRole('link', { name: new RegExp ('Логотип|logo', 'i') }).click();
  await expect(page.getByRole('heading', { name: new RegExp ('Магазины|Shops', 'i') })).toBeVisible();
  await expect(page.getByRole('combobox', { name: new RegExp ('Найти|Search', 'i') })).toBeVisible();
});