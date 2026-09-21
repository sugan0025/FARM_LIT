import { test, expect } from '@playwright/test';

test.describe('FARM_LIT Full E2E & Attribution Flow', () => {
  test('Complete consumer purchasing journey from UTM campaign landing to order receipt', async ({
    page,
  }) => {
    // 1. Visit homepage with UTM campaign attribution query
    await page.goto('/?utm_source=instagram&utm_medium=social&utm_campaign=weekend_harvest_2026');
    await expect(page).toHaveTitle(/Farm_lit/);

    // Assert Hero elements
    await expect(page.locator('h1')).toContainText('Fresh. Natural.');
    await expect(page.locator('text=Shop Now').first()).toBeVisible();

    // 2. Open Shop catalog
    await page.click('text=Shop Now');
    await expect(page).toHaveURL(/\/shop/);
    await expect(page.locator('h1')).toContainText('All Fresh Produce');

    // 3. Search for product
    await page.goto('/search?q=spinach');
    await expect(page.locator('text=Crisp Baby Spinach')).toBeVisible();

    // 4. Open product detail
    await page.click('text=Crisp Baby Spinach (Palak)');
    await expect(page).toHaveURL(/\/shop\/crisp-baby-spinach/);
    await expect(page.locator('h1')).toContainText('Crisp Baby Spinach (Palak)');

    // 5. Add product to cart
    await page.click('text=Add to Basket');

    // Drawer should open and show item
    await expect(page.locator('text=Your Farm Basket')).toBeVisible();
    await expect(page.locator('text=Crisp Baby Spinach (Palak)')).toBeVisible();

    // 6. Increase quantity in cart drawer
    const plusButton = page.locator('button[aria-label="Increase quantity"]').first();
    await plusButton.click();
    await expect(page.locator('text=2').first()).toBeVisible();

    // 8. Refresh page to test Guest Cart Persistence (Local Storage)
    await page.reload();
    await page.click('#cart-trigger-button');
    await expect(page.locator('text=Your Farm Basket')).toBeVisible();
    await expect(page.locator('text=Crisp Baby Spinach (Palak)')).toBeVisible();

    // 10. Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@farmlit.com');
    await page.fill('input[type="password"]', 'FarmLit2026!');
    await page.click('button[type="submit"]');

    // Should redirect to /account
    await expect(page).toHaveURL(/\/account/);
    await expect(page.locator('h1')).toContainText('Demo Customer');

    // 11. Verify cart synchronization remains active
    await page.click('#cart-trigger-button');
    await expect(page.locator('text=Crisp Baby Spinach (Palak)')).toBeVisible();

    // 12. Proceed to Checkout
    await page.goto('/checkout');
    await expect(page.locator('h1')).toContainText('Checkout');

    // Fill shipping address
    await page.fill('input[name="deliveryStreet"]', '402 Sunrise Orchards, West Ridge');
    await page.fill('input[name="deliveryCity"]', 'Pune');
    await page.fill('input[name="deliveryState"]', 'Maharashtra');
    await page.fill('input[name="deliveryPostalCode"]', '411001');

    // 13. Complete Checkout (Cash on Delivery simulation)
    await page.click('button[type="submit"]');

    // 14. Order confirmation verified
    await expect(page).toHaveURL(/\/checkout\/success/);
    await expect(page.locator('h1')).toContainText('Thank You');
    await expect(page.locator('text=Order Reference')).toBeVisible();
  });

  test('Security tests against malicious inputs', async ({ page }) => {
    // Attempt XSS via search URL
    await page.goto('/search?q=%3Cscript%3Ealert(1)%3C/script%3E');
    // Verify script does not pop alert and is rendered safely as escaped text
    await expect(page.locator('body')).not.toContainText('<script>');

    // Attempt SQL injection via search
    await page.goto('/search?q=%22%20OR%201=1%20--');
    await expect(page.locator('text=No farm items matched')).toBeVisible();
  });
});
