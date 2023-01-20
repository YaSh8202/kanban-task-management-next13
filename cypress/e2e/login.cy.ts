describe("Login page", () => {
  before(() => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit("/auth/signin")
  })
  it("Login with Google", () => {
    const username = Cypress.env("GOOGLE_USER")
    const password = Cypress.env("GOOGLE_PW")
    const loginUrl = Cypress.env("SITE_NAME")
    const cookieName = Cypress.env("COOKIE_NAME")
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: false,
      logs: false,
      isPopup: true,
      loginSelector: `[role="login"]`,
      postLoginSelector: ".main",
    }

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }: any) => {
        cy.clearCookies()

        const cookie = cookies
          .filter((cookie: any) => cookie.name === cookieName)
          .pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          })
          
          // @ts-ignore
          Cypress.Cookies.defaults({
            preserve: cookieName,
          })

          // remove the two lines below if you need to stay logged in
          // for your remaining tests
          // cy.visit("/api/auth/signout")
          // cy.get("form").submit()
        }
      })
  })
  
})