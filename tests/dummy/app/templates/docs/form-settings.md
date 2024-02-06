# Form settings

Form settings control various aspects of the content and behaviour at the form level. The available settings are listed below.

<DocsSnippet @name="form-settings-options.js" @title="Default form settings and their values" />

Form level settings can be tweaked for each instance of a `changesetWebform` component, in the `formSettings` object at the root of your formSchema.

The only required setting is `formName` which must be unique from that of any other form rendered on th page. This is to avoid the browser error from attempting to add multiple elements to the DOM with the same ID.

<DocsDemo as |demo|>
  <demo.example @name="no-form-settings-form-schema.hbs" @title="Default form settings">
    <ChangesetWebform @formSchema={{this.nothingSpecialFormSchema}} @submitAction={{this.doSubmit}} />
  </demo.example>
  <demo.snippet @name="no-form-settings-form-schema.js" @label="component js" @language="javascript" />
  <demo.snippet @name="no-form-settings-form-schema.hbs" @label="template" @language="htmlbars" />
</DocsDemo>



<DocsDemo as |demo|>
  <demo.example @name="clear-after-submit-form-schema.hbs">
    <ChangesetWebform @formSchema={{this.clearFormSchema}} @submitAction={{this.doSubmit}} />
  </demo.example>
  <demo.snippet @name="clear-after-submit-form-schema.js" @label="component js" @language="javascript" />
  <demo.snippet @name="clear-after-submit-form-schema.hbs" @label="template" @language="htmlbars" />
</DocsDemo>

## Tracked form settings

The following form settings are tracked, and so updating them in an action will result in a template update. 

<DocsSnippet @name="form-settings-tracked-props.js" @title="Tracked form settings" />


