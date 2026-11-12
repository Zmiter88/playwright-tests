import { Page } from '@playwright/test';

export class CookieConsentHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

async acceptCookies() {
    const consentButton = this.page.getByRole('button', {name: 'Consent'})
    if (await consentButton.isVisible()) {
    await consentButton.click();
    }
}
}


