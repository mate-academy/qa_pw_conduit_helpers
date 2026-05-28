import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
  this.page = page;
  this.titleField = page.getByRole('textbox', { name: 'Article Title' });
  this.descriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
  this.textField = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
  this.tagField = page.getByRole('textbox', { name: 'Enter tags' });
  this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
  this.errorMessage = page.locator('ul li ul li');
  
 }


 async fillTitleField(title){
 await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);

 });
 }

 async fillDescriptionField(description){
  await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
 }

 async fillTextField(text){
  await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
 }
  async fillTagField(tag){
      await test.step(`Fill the 'Tag' field`, async () => {
      await this.tagField.fill(tag);
    });  
  }



 async clickUpdateArticleButton(){
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click({ force: true });
    });
 }

async assertTitleFieldHasValue(value) {
  await test.step(`Assert the 'Title' field has value '${value}'`, async () => {
    await expect(this.titleField).toHaveValue(value);
  });
}

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article description is visible`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article text is visible`, async () => {
      await expect(this.textField).toHaveValue(text);
    });
  }
  
async clickOnDeleteTag(tagName) {
    const tagSpan = this.page.locator('span', { hasText: tagName })
     await tagSpan.locator('i').click();

}

}