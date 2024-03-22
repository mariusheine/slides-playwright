import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://geprog.com/');
  await page.goto('https://geprog.com/en');
  await page.getByRole('link', { name: 'Our tech stack' }).click();
  await expect(page.locator('#tech-stack-section')).toContainText('Playwright');
  await expect(page.locator('#tech-stack-section')).toContainText('Vue3');
});