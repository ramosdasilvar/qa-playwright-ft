import { test, expect} from '@playwright/test'

test.only('registrar usuário', async ({page}) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

  const inputFirstName = page.locator('#input-firstname')
  await inputFirstName.fill('João')

  await page.fill('id=input-lastname', 'Souza')
  await page.fill('id=input-email', 'email2@teste.com')
  await page.fill('id=input-telephone', '888777666')
  await page.fill('id=input-password', 'abc123')
  await page.fill('id=input-confirm', 'abc123')
  await page.click('xpath=//label[@for="input-newsletter-yes"]')
  await page.click('xpath=//label[@for="input-agree"]')
  await page.click('xpath=//input[@value="Continue"]')

  await expect(page).toHaveTitle('Your Account Has Been Created!')
})