import { expect, test } from '@playwright/test';

export class EditArticlePage{
    constructor(page) {
        this.page = page;
        this.titleInputField = page.getByPlaceholder('Article Title');
        this.descriptionInputField = page
        .getByPlaceholder("What's this article about?");
        this.textInputField = page
        .getByPlaceholder('Write your article (in markdown)');
        this.tagsTextField = page.getByPlaceholder('Enter tags');
        this.updateButton = page
        .getByRole('button', { name: 'Update Article' });
        this.removeIcon = page.locator('.ion-close-round').nth(0);
        this.titleEmpty = page.getByText('Article title cannot be empty');
        this.descrEmpty = page.getByText('Article description cannot be empty');
        this.bodyEmpty = page.getByText('Article body cannot be empty');
    }

    async editTitleField(newTitle) {
        await test.step(`Edit title field for the article`, async () => {
            await this.titleInputField.fill(newTitle);
        });
    }

    async assertTitleEdited(newTitle) {
        await test.step(`Assert that title is edited`, async () => {
            await expect(this.titleInputField).toHaveValue(newTitle);   
        });
    }

    async updateArticle() {
        await test.step (`Click on the 'Update Article' button`, async () => {
            await this.updateButton.click();
        })
    }

    async editDescriptionField(newDescription) {
        await test.step(`Edit description for the article`, async () => {
            await this.descriptionInputField.fill(newDescription);
        })
    }

    async assertDescriptionEdited(newDescription) {
        await test.step(`Assert that description is edited`, async() => {
            await expect(this.descriptionInputField)
            .toHaveValue(newDescription);
        });
    }

    async editTextField(newText) {
        await test.step(`Edit text field for the article`, async() => {
            await this.textInputField.fill(newText);
        });
    }

    async assertTextEdited(newText) {
        await test.step(`Assert that text is edited`, async() => {
            await expect(this.textInputField).toHaveValue(newText);
        });
    }

    async addNewTag(tag){
        await test.step(`Add new tag`, async() => {
            await this.tagsTextField.fill(tag);
            await this.page.keyboard.press('Enter');
        });
    }

    async deleteTag() {
        await test.step(`Delete tag`, async() => {
            await this.removeIcon.click();
        });
    }

    async assertErrorWhenTitleIsEmpty(messageText){
        await test.step(`Assert that error is displayed when title is empty`,
            async() => {
            await expect(this.titleEmpty).toHaveText(messageText);
            });
    }

    async assertErrorWhenDescrIsEmpty(messageText) {
        await test.step(`Assert that error is displayed 
        when description is empty`,
        async() => {
            await expect(this.descrEmpty).toHaveText(messageText);
        });
    }

    async assertErrorWhenTextIsEmpty(messageText) {
        await test.step(`Assert that error is displayed 
        when text is empty`,
        async() => {
            await expect(this.bodyEmpty).toHaveText(messageText);
        });
    }
}