# Limitless `git`  workflow

## Single source of truth

The `main` branch of [this](https://github.com/labbit-fec/limitless) remote repository will serve as our **single source of truth**. It will represent the latest  version of production-ready code. Code will be merged into the `main` branch once a pull request to the branch has been reviewed and approved.


## Cloning the repository
Your first step will be cloning our remote repository. Navigate to the appropriate folder on your local machine and execute the following command:\
> `git clone https://github.com/labbit-fec/limitless.git <desired_folder_name>`

Then change into your newly created directory, with the following command:\
> `cd <desired_folder_name>`

Confirm that you are configured with the correct remote repository, with the following command:\
> `git remote -v`

### Renaming your remote repository
> `git remote rename <current_name> <new_name>`
