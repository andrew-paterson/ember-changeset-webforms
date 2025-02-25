#!/bin/bash

# Stage all changes
git add .

# Commit changes with the message "Update deps"
git commit -m "$1"

# Print the latest commit SHA
latest_commit_sha=$(git rev-parse HEAD)
echo "Latest commit SHA: $latest_commit_sha"

code /home/paddy/development/ember-addons/my-fancy-app/package.json

# Push changes to the remote repository
git push


# End of script