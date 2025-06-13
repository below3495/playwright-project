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

  test.beforeEach(async ({ page }) => {
    await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
    await page.getByRole('button', { name: 'Укажите адрес доставки' }).click();
    await page.getByTestId('address-input').click();
    await page.getByTestId('address-input').fill('тверская 7');
    await page.getByLabel('Тверская улица, 7Москва').click();
    await page.getByRole('button', { name: 'ОК' }).click();
    await page.getByRole('link').filter({ hasText: 'Zotman Pizza' }).click();
  });

    test('Добавление товара в корзину ресторана', async ({ page }) => {

        await page.getByRole('textbox', { name: 'Найти в ресторане' }).click();
        await page.getByRole('textbox', { name: 'Найти в ресторане' }).fill('Волковский лимонад Волчок Манго-Кокос');
        await page.getByRole('button', { name: 'В корзину' }).click();
    
        await expect(page.getByRole('button', { name: 'Корзина' })).toBeVisible();
    })

    test('Удаление товара из корзины ресторана', async ({ page }) => {

        await page.getByRole('textbox', { name: 'Найти в ресторане' }).click();
        await page.getByRole('textbox', { name: 'Найти в ресторане' }).fill('Волковский лимонад Волчок Манго-Кокос');
        await page.getByRole('button', { name: 'В корзину' }).click();
    
        await expect(page.getByRole('button', { name: 'Корзина' })).toBeVisible();
        await page.getByRole('button', { name: 'Корзина' }).click();
        await page.locator('.AppPopup_wrapper').getByRole('button', { name: 'Очистить' }).click();
        await page.getByRole('button', { name: 'Да, очистить' }).click();
        await expect(page.getByRole('button', { name: 'Корзина' })).toBeHidden();
    });