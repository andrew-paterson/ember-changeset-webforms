# Deployment

Deployment happens via the ember-cli-deploy Github plugin

- Ensure that the package.json version is updated to match the version is `ember-changeset-webforms`.
- Ensure that the latest commit is tagged with the same version.

Ensure that the getRootURL method returns '' in `test-app/config/addon-docs.js`, as shown below.

```javaScript
getRootURL() {
    return '';
  }
```

From the `test-app` directory, run `ember deploy production`
