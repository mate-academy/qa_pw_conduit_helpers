# Conduit Edit Article Tests

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands: `npm ci` and `npx playwright install`.

## Task

1. Add action function for new article creation:

    - Create the function structure: `src/actions/article/`
    - Create the `createNewArticle` function in the new file `./src/actions/article/createNewArticle.js`
    - Ensure your function covers both cases when creating an article with tags and without; 
    - Use the `signUpUser` function as an example
    - Use the created function for the new tests

2. Create new tests for the Conduit `Edit article` feature:

    - *Edit the article title for the existing article*
    - *Edit the article description for the existing article*
    - *Edit the article text for the existing article*
    - *Add the tag for the existing article without tags* 
    - *Add the tag for the existing article with tags* 
    - *Remove an article tag for the existing article with tag*
    - *Remove an article title for the existing article*
    - *Remove an article description for the existing article*
    - *Remove an article text for the existing article*

4. Add a `test.step` for each class method. 
5. Add all the error messages to the `constants` folder.
6. Use existing `generateNewUserData` and `signUpUser` functions for each test precondition.
7. Think about the extra tests for the `Edit article` feature and add them as well.
8. Re-run all your tests and make sure they pass after the updates. 

## Task Reporting

1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the code review until PR is approved.  
