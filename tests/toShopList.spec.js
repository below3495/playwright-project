import { test, expect } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({ 
  use: {
    locale: 'ru-RU',
    permissions: [],
  }});

  test.use({
    locale: 'ru-RU',
  });
  test.use({permissions: []})

test('Переход в магазин лист с главной', async ({ page }) => {
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  await page.getByRole('button', { name: 'Все Магазины' }).click();
  await expect(page.getByRole('heading', { name: 'Популярные' })).toBeVisible();
});