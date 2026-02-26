# Using a `ChangesetWebform` component with Ember query params

The addon provides a series of helper functions for easy integrate a `ChangesetWebform` component with query params set on an Ember controller.

An example use case is a form which allows users to update page number, sorting, and filtering query params.

A live demo of such an example is in the **Demo** section at the end of this page.

Such a form should:

1. initially load with any values of query params in the page url, and
2. update the url params when submitted.

- Note that if we add `?name=User Name` to the end of the page url and reload, we see **User Name** in the name field of the form in the **Demo** section below.
- Then, if we update the value of the name field to `Updated User Name` and click **Apply filters**, the url is updated to and now includes `?name=Updated User Name`

See [https://guides.emberjs.com/release/routing/query-params/](https://guides.emberjs.com/release/routing/query-params/) if you're unfamiliar with Ember query params.

The seven steps required to implement this pattern are as follows.

## 1. Import the required utils

In the relevant controller, begin by adding the import statement below.

<DocsSnippet @name="changeset-webform-with-query-params-imports.js" @title="Importing required functions" />

## 2. Define your `queryParamsObjects` array

Each item in `queryParamsArray` corresponds to a single query param in your controller.

<DocsSnippet @name="query-params-objects-definition.js" @title="Definition of query params objects" />

- `paramName`
  - **Required**
  - This is the name of the param which will be added to the `queryParams` array on the controller, and will have all of behaviours defined in [https://guides.emberjs.com/release/routing/query-params/](https://guides.emberjs.com/release/routing/query-params/).
- `defaultValue`
  - **Optional**
  - The value to set the param to if the param is not in the url. See [https://guides.emberjs.com/release/routing/query-params/#toc_default-values-and-deserialization](https://guides.emberjs.com/release/routing/query-params/#toc_default-values-and-deserialization)
- `ecwFieldSchema`
  - **Required**
  - The definition of the field that will be used in the `formSchema` to be passed to the `ChangesetWebform` component.
  - Note that `fieldId` should not be included, as this will be set to the `paramName`.
- `fieldValueFromUrlParamFunc`
  - **Optional**
  - A function that allows you to serialize query params values into a format which is required by the associated form field.
    - It runs when the `formDataFromUrlParams` function is called (See step 6 below)
    - In the example **Definition of query params objects** above, we want the sort field to use human readable options, such as **Oldest first** rather than the actual query param names such as `-inserted_at`. Thus our field schema defines the options for the `powerSelect` field as objects with `label` and `paramName` properties, and then sets the `optionDisplayProp` to `label`, which tells the field to display the label value in the options list.
    - In order to have the correct option display in the power select field, we need to set it's initial value to one of those options, but the value of `sort` param as derived from the url will be a string, such as `inserted_at`.
    - Thus, in our `fieldValueFromUrlParamFunc` function, we take that string value and use it to find the relevant option, and set that as the `sort` property in the data that will be passed to the `ChangesetWebform` component.
  - It receives two arguments:
    - `queryParamsObject` - the relevant item from the `queryParamsObjects` array
    - `qpValue` - the value of the query param as derived from the URL
- `applyValuesFunc`
  - **Optional**
  - This function can be though of as `fieldValueFromUrlParamFunc` in reverse. A field with `fieldValueFromUrlParamFunc` will likely need `applyValuesFunc` as well.
    - It allows you to manipulate the value of a form field before the value is set on the controller.
    - It runs when the `applyFormValues` function is called (See step 7 below).
    - In the example below, when the user clicks submit, the value of the `sort` field will be an object with the keys `label` and `paramName` , as the field options are objects with those keys.
    - However, we need the `sort` prop on the controller to be set to the a string, being the value of the `paramName` key of the form field. The example below shows how we can do this.
  - It receives a single argument
    - `fieldValue` - the value of the associated form field.

## 3. Set properties as tracked

In order for your form fields to update in the template when the associated controller properties are updated, they need to be set as tracked proeprties.

<DocsSnippet @name="query-params-tracked-props.js" @title="Setting query params props as tracked props" />

## 4. Populate the `queryParams` property on the controller, and apply default values

In the constructor function of the controller class call the `setQueryParamsWithDefaults` function, with two required arguments:

- `this` - the controller class instance,
- the `queryParamsObjects` array defined in part 2 above.

<DocsSnippet @name="set-query-params-with-defaults.js" @title="Calling createFormSchema to generate the form schema" />

The function does two things.

- It populates the `queryParams` property on the controller with the `paramName` from each item in `queryParamsObjects`.
  - In the example above, it adds `number`, `size`, `sort`, `name`, `inserted_from`, and `inserted_to` to `queryParams`.
- For each item in the `queryParamsObjects` array which has `defaultValue`, the controller property is set to that value. Note that this value will be overriden by a value which is derived from the url params.

Note that if there is an existing `queryParams` prop, this will not be removed by running the `setQueryParamsWithDefaults` function. The snippet below shows that we have `queryParams = ['authenticated]` in our example controller. This param will behave as normal.

<DocsSnippet @name="query-params-in-the-usual-way.js" @title="Query params defined in the usual way" />

## 5. Generate your formSchema

The `createFormSchema` function returns a form schema object which can be passed to a `ChangesetWebform` component as `@formSchema`.

<DocsSnippet @name="create-changeset-webform-with-query-params.js" @title="Calling createFormSchema to generate the form schema" />

It receives three arguments.

- `queryParamsObjects`
  - **Required**
  - the `queryParamsObjects` array defined in part 2 above.
- `formName`
  - **Required**
  - A unique name for the form.
- `formSchemaSettings`

  - **Optional**
  - This object will be deep merged with the final form schema object before it is returned.
  - This allows you to customise the resulting form schema in any way.
  - In the example above
    - we set `submitButtontext` to `Apply filters`
    - we set `clearFormButton` to `true` to show the clear form, button,
    - we set `clearFormButtonText` to `Reset filters`,
    - we set `submitAfterClear` to `true` so that after clicking the `Reset filters` button, the form fields are cleared, and the associated properties on the controller are set to `null`.

## 6. Generate the data object from the URL params

Our `ChangesetWebform` component should load with values that are derived from the associated url params, if they exist.

To do this, we create a an object from the param values and pass that to our `ChangesetWebform` component as `@data`

In the example below, we do this in the `queryParamsFormData` getter, which we then pass to our `ChangesetWebform` component as `@data`.

We call the `formDataFromUrlParams` function with two required arguments:

- `this` - the controller class instance,
- the `queryParamsObjects` array defined in part 2 above

<DocsSnippet @name="generate-form-data-from-query-params.js" @title="Generating the data object to pass to the ChangesetWebform component" />

## 7. Run the `applyValues` function on form submit

Finally, we need an action to run when the user clicks the submit button, which sets the relevant controller properties to the associated values from the form data.

We define an action which is passed to the `ChangesetWebform` component as `@submitData`.

In that action, we call the `applyFormValues` with three required arguments:

- `this` - the controller class instance,
- the `queryParamsObjects` array defined in part 2 above
- `formData` - the object passed to the submit action by the `ChangesetWebform` component.

<DocsSnippet @name="run-the-apply-form-values-function-on-submit.js" @title="Calling the applyFormValues function in an action" />

<DocsSnippet @name="changeset-webform-with-query-params-example-1.hbs" @title="Passing the action to the ChangesetWebform component"/>

## Demo

Authenticated: **{{this.authenticated}}**  

Note that the `authenticated` param is handled in the "normal" way, added to the `queryParams` property on the controller.

<DocsSnippet @name="query-params-in-the-usual-way.js" @title="Query params defined in the usual way" />

It's fine to have some query params handled in the conventional way along side the pattern shown above. Such params will work as per usual.

<!-- BEGIN-SNIPPET component-invocation.hbs -->
<Demos::QueryParamsFormSchema
  @queryParamsFormSchema={{this.queryParamsFormSchema}}
  @queryParamsFormData={{this.queryParamsFormData}}
  @applyFormValues={{this.applyFormValues}} 
/>
<!-- END-SNIPPET -->
