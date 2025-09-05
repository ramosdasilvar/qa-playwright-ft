import {test, expect} from '@playwright/test'

test('Verificar pagina no ar 1', async ({page}) => {
  // steps do caso de teste
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
  
  await expect(page).toHaveTitle('Account Login')

})

test('Verificar pagina no ar 2', async ({page}) => {
  // steps do caso de teste
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
  
  await expect(page).toHaveTitle('Account Loginl')

})