import { test, expect} from '@playwright/test'

import { faker } from '@faker-js/faker'

test.describe('teste basico', () => {
  test('registrar usuário', async ({page}) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

    const inputFirstName = page.locator('#input-firstname')
    await inputFirstName.fill('João')

    await page.fill('id=input-firstname', 'Souza')
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
})

test.describe('teste utilizando métodos built-in', () => {
  test('registrar usuário', async ({page}) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

    await page.getByLabel('First Name').fill('João')
    await page.getByLabel('Last Name').fill('Souza')
    await page.getByLabel('E-Mail').fill('email3@teste.com')
    await page.getByLabel('Telephone').fill('21999998888')


    await page.fill('id=input-password', 'abc123')
    await page.fill('id=input-confirm', 'abc123')

    await page.check('xpath=//label[@for="input-newsletter-yes"]')
    await page.check('xpath=//label[@for="input-agree"]')

    await page.getByRole('button', {name: 'Continue'}).click()
    
    await expect(page).toHaveTitle('Your Account Has Been Created!')
  })
})

test.describe('teste utilizando faker', () => {
  test.only('registrar usuário', async ({page}) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

    await page.fill('id=input-firstname', faker.person.firstName())
    await page.fill('id=input-lastname', faker.person.lastName())
    await page.fill('id=input-email', faker.internet.email())
    await page.fill('id=input-telephone', faker.phone.number({style: 'national'}))

    const password = faker.internet.password()

    await page.fill('id=input-password', password)
    await page.fill('id=input-confirm', password)

  
    await page.click('xpath=//label[@for="input-newsletter-yes"]')
    await page.click('xpath=//label[@for="input-agree"]')
    await page.click('xpath=//input[@value="Continue"]')

    await expect(page).toHaveTitle('Your Account Has Been Created!')
  })
})