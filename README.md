# AppLibraryBenefit - Contributors: Poros K. Ioulios, Klapsis Kyriakos - TeamName: " "

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## GitHub CLI Steps 

Explanatory guide in case we forget something! (commands etc.)

## Step 1 

Git clone the repository on your desired folder path. Run `git clone https://github.com/konstantinosporo/app-library-benefit.git`. 

## Step 2 

Procceed to create a new branch when implementing a new functionality/feature. Run `git checkout -b feature/feature-name`.
*For fixing issues replace feature with fix and run `git checkout -b fix/fix-name`.
Expect this message in the CLI: `Switched to a new branch: branchname`.

## Step 3

Before procceding with anything verify the status of the files that have been changed. Run `git status`.

## Step 4

After checking which files were changed proceed to stage all the changes. Run `git add .`.
In case you want to stage specific files. Run `git add specific-file-path`.

## Step 5

Once the changes are staged proceed to commit to your branch: Run `git commit -m 'Commit meaningfull message'`.

## Step 6

Now push the new branch online. Run `git push origin feature/feature-name` or `git push origin fix/fix-name`.

## Step 7 

Pull Request Steps : 1 - GitHub Pull Requests.
                     2 - Create Pull Request.
                     3 - Merge Pull Request.
                     4 - Confirm Merge.
                     5 - *Optional: Delete Branch after merging.

## Step 8

Pull Changes Locally after merging to update to the master branch: Run `git checkout master` and update running `git pull origin master`.

## Added commands

## Scenario where you forget to delete branch after Merge

You can delete the online branch from the cli: Run `git push origin --delete branch/name`.