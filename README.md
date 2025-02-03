# Practice task: Conduit article tests with steps

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b added_article_test
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Add action method for new article creation
- Create the folder structure: src/actions/articles/
- Create the method createNewArticle.js
- Ensure your method covers both cases when creating an article with tags and without. 
2. Create new tests for the conduit article view and use just created method for preconditions. 
- Assert the article title, description, and text can be edited for the article without tags. 
- Assert the article tag can be edited for the article without tags. 
- Assert the article tags can be extended for the article with tags. 
- Assert the article tag can be removed on edit.
- Assert the error message is showing when trying to remove the article title on edit.
- Assert the error message is showing when trying to remove the article description on edit.
- Assert the error message is showing when trying to remove the article text on edit.
4. Use signIn/Up methods as an example.
5. Make sure to add a test.step for each method as a wrapper. 
6. Re-run all your tests and make sure they pass after the updates. 


## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

