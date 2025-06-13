import { test, expect } from '@playwright/test';

test('Проверка выбора времени доставки на каталоге', async ({ page }) => {
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  
  await page.getByRole('button', { name: 'Enter delivery address' }).click();
  await page.getByTestId('address-input').click();
  await page.getByTestId('address-input').fill('тверская 7');
  await page.getByLabel('Тверская улица, 7Москва').click();
  await page.getByRole('button', { name: 'OK' }).click();
  
  await page.getByRole('button', { name: 'Choose delivery time. Chosen' }).click();
  await page.getByRole('option', { name: '23:30' }).click();

  await expect(page.getByRole('button', { name: 'Choose delivery time. Chosen' })).toHaveText('23:30');
});