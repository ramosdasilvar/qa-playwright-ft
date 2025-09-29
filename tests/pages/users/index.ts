import { type Locator, type Page, expect } from '@playwright/test'
import { UserModel } from '../../fixtures/user.model'
import dotenv from 'dotenv'

dotenv.config()
const BASE_URL = process.env.BASE_URL

export class UsersPage {
  readonly page: Page
  readonly fisrtNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly telephoneInput: Locator
  readonly passwordInput: Locator
  readonly confirmPwd: Locator
  readonly newsletterYes: Locator
  readonly termsCheckbox: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.fisrtNameInput = page.locator('#input-firstname')
    this.lastNameInput = page.locator('#input-lastname')
    this.emailInput = page.locator('#input-email')
    this.telephoneInput = page.locator('#input-telephone')
    this.passwordInput = page.locator('#input-password')
    this.confirmPwd = page.locator('#input-confirm')
    this.newsletterYes = page.locator('xpath=//label[@for="input-newsletter-yes"]')
    this.termsCheckbox = page.locator('xpath=//label[@for="input-agree"]')
    this.continueButton = page.locator('xpath=//input[@value="Continue"]')
  }

  async visitURL(){
    if (!BASE_URL) {
      throw new Error('BASE_URL não estpa definida no arquivo .env!')
    }
    await this.page.goto(BASE_URL)
  }

  async register(user: UserModel) {
    await this.fisrtNameInput.fill(user.firstName)
    await this.lastNameInput.fill(user.lastName)
    await this.emailInput.fill(user.email)
    await this.telephoneInput.fill(user.telephone)
    await this.passwordInput.fill(user.password)
    await this.confirmPwd.fill(user.confirmPassword)

    if (user.newsletter == true) {
    await this.newsletterYes.click()
    }

    if(user.terms == true) {
    await this.termsCheckbox.click()
    }

    await this.continueButton.click()
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