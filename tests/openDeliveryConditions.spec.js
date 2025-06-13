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

test('Открытие условий доставки', async ({ page }) => {
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
    await page.getByRole('button', { name: 'Укажите адрес доставки' }).click();
    await page.getByTestId('address-input').click();
    await page.getByTestId('address-input').fill('тверская 7');
    await page.getByLabel('Тверская улица, 7Москва').click();
    await page.getByRole('button', { name: 'ОК' }).click();

  await page.getByRole('link').filter({ hasText: 'FoodBand' }).click();

  // Поиск и добавление товара с умной прокруткой
  const addToCartButton = page.getByRole('listitem').getByLabel('В корзину').first();
  
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    // Проверяем, видна ли кнопка
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      break; // Выходим из цикла после успешного клика
    }
    
    // Если не видна - прокручиваем
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(500);
    attempts++;
  }

  // Проверка, что товар добавлен
  if (attempts >= maxAttempts) {
    throw new Error('Не удалось найти кнопку "В корзину" после прокрутки');
  }
  await page.getByRole('button', { name: 'Корзина' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Доставка' }).click();
  await expect(page.getByRole('dialog').filter({ hasText: 'Текущие условия' }).locator('div').nth(2)).toBeVisible();
});