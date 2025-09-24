import { Page, expect } from '@playwright/test'
import { UserModel } from '../../fixtures/user.model'

export class UsersPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async visitURL(){
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
  }

  async register(user: UserModel) {
    const inputFirstName = this.page.locator('#input-firstname')
    await inputFirstName.fill('João')

    await this.page.fill('id=input-firstname', user.firstName)
    await this.page.fill('id=input-lastname', user.lastName)
    await this.page.fill('id=input-email', user.email)
    await this.page.fill('id=input-telephone', user.telephone)   
    await this.page.fill('id=input-password', user.password)
    await this.page.fill('id=input-confirm', user.confirmPassword)

    if (user.newsletter == true) {
    await this.page.click('xpath=//label[@for="input-newsletter-yes"]')
    }

    if(user.terms == true) {
    await this.page.click('xpath=//label[@for="input-agree"]')
    }

    await this.page.click('xpath=//input[@value="Continue"]')
  }

  async verifyRegistrationSuccess(){
    await expect(this.page).toHaveTitle('Your Account Has Been Created!')
    await expect(this.page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/success')

    await expect(this.page.locator('xpath=//div[@id="content"]/h1')).toHaveText(' Your Account Has Been Created!')
    await expect(this.page.locator('xpath=//p[text()="Congratulations! Your new account has been successfully created!"]')).toBeVisible()
    await expect(this.page.locator('xpath=//p[text()="You can now take advantage of member privileges to enhance your online shopping experience with us."]')).toBeVisible()
    await expect(this.page.locator('xpath=//p[text()="If you have ANY questions about the operation of this online shop, please e-mail the store owner."]')).toBeVisible()
    await expect(this.page.locator('xpath=//p[text()="A confirmation has been sent to the provided e-mail address. If you have not received it within the hour, please "]')).toBeVisible()
    await expect(this.page.locator('xpath=//a[text()="contact us"]')).toBeVisible()
    const coninue_button = this.page.locator('xpath=//a[text()="Continue"]')

    await expect(coninue_button).toBeVisible()
    await expect(coninue_button).toBeEnabled()
  }
}