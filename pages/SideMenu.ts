import { Page, Locator } from '@playwright/test';

export class SideMenu {

    private openMenuButton: Locator;
    private logoutButton: Locator;

    constructor(private page: Page) {
        this.openMenuButton = page.getByRole('button', { name: 'Open menu' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async logout() {
        await this.openMenuButton.click();
        await this.logoutButton.click();
    }
}