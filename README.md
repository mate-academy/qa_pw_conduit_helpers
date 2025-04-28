# Conduit Edit Article Tests

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`

## Task 1

Add an action function for creating new articles:

1. Create the function structure: `src/ui/actions/article/`.
2. Create the `createNewArticle` function in the new file `./src/ui/actions/article/createNewArticle.js`.
3. Ensure your function covers both cases when creating an article with tags and without.
4. Use the `signUpUser` function as an example.
5. Use the created function for the new tests.

## Task 2

1. Create new tests for the Conduit `Edit article` feature:

    - *Edit the article title for the existing article*
    - *Edit the article description for the existing article*
    - *Edit the article text for the existing article*
    - *Add the tag for the existing article without tags* 
    - *Add the tag for the existing article with tags* 
    - *Remove an article tag for the existing article with tag*
    - *Remove an article title for the existing article*
    - *Remove an article description for the existing article*
    - *Remove the article text for the existing article*

2. Add a `test.step` for each class method. 
3. Add all the error messages to the `constants` folder.
4. Use existing `generateNewUserData` and `signUpUser` functions for each test precondition.
5. Try to come up with other useful tests for the `Edit article` feature, and add them as well.
6. Re-run all your tests and make sure they pass after the updates.

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
