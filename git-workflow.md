# Limitless `git`  workflow

## Single source of truth

The `main` branch of [this](https://github.com/labbit-fec/limitless) remote repository will serve as our **single source of truth**. It will represent the latest  version of production-ready code. Code will be merged into the `main` branch once a pull request to the branch has been reviewed and approved.


## Cloning the repository
Your first step will be cloning our remote repository. Navigate to the appropriate folder on your local machine and execute the following command:
```
git clone https://github.com/labbit-fec/limitless.git <desired_folder_name>
```

Then change into your newly created directory:
```
cd <desired_folder_name>
```

Confirm that you are configured with the correct remote repository:
```
git remote -v
```
You should see the following:
```
origin	https://github.com/labbit-fec/limitless.git (fetch)
origin	https://github.com/labbit-fec/limitless.git (push)
```

### Removing / renaming your remote repository
If you had initially configured your workflow to work off of a **fork** of the organization's repository, and you cloned that forked repository, your `origin` remote may already be connected to your personal forked repository. In that case, you would see the following in your remote connections:
```
...
origin  https://github.com/<your_github_username>/limitless.git (fetch)
origin  https://github.com/<your_github_username>/limitless.git (push)
...
```
If that is the case, you should first remove that connection to your personal repository, assuming it is named `origin`. If it was called something else, you can replace `origin` with the name of the remote connection.
```
git remote remove origin
```
Then, create a remote connection with the **organization's** repository, and call it `origin`:
```
git remote add origin https://github.com/labbit-fec/limitless.git
```
Check that you have the remote connection:
```
git remote -v
```
You should only see the following:
```
origin  https://github.com/<your_github_username>/limitless.git (fetch)
origin  https://github.com/<your_github_username>/limitless.git (push)
```

## Working on a feature
> No work should be done on the `main` branch.

All work should be done on a **'feature' branch**; that is, an existing or newly created branch designated to the feature on which you are working.

Whether you already have a branch that you are revisting, or are creating a new branch, your first step is to `pull` down the latest from the **source of truth**, the `main` branch.

If you are not already on the `main` branch on your local machine, switch to it:
```
git checkout main
```

Then, `pull` down the latest master branch:
```
git pull origin
```

### Revisting an existing branch
Checkout your existing feature branch:
```
git checkout <feature_branch_name>
```

Rebase it to the latest master:
```
git rebase master
```

***Merge conflicts may arise in this step.*** Resolve any merge conflicts in VS Code, working with other members of the team as needed, and then execute the following:
```
git rebase --continue
```


