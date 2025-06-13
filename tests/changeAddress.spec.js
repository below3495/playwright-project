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

test('Смена адреса', async ({ page }) => {

  const nameAddress = page.getByRole('button', { name: 'Ленинский проспект , 37А' })
  const okButton = page.getByRole('button', { name: 'Ок' }).first();
  const addressInput = page.getByTestId('address-input');

  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  await page.getByRole('button', { name: 'Укажите адрес доставки' }).click();
  await addressInput.click();
  await addressInput.fill('ленинский 37а');
  await page.getByLabel('Ленинский проспект, 37АМосква').click();

  await okButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(okButton).toBeEnabled();
  await okButton.click();
  await expect(nameAddress).toBeVisible();

  await nameAddress.click();
  await page.getByRole('button', { name: 'Куда доставить?' }).click();
  await page.getByRole('button', { name: 'Стереть' }).locator('svg').click();
  await addressInput.click();
  await addressInput.fill('дорожная 1к1');
  await page.getByLabel('Дорожная улица, 1к1Москва').click();
  
  await okButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(okButton).toBeEnabled();
  await okButton.click();
  await expect(nameAddress).toBeVisible();
});