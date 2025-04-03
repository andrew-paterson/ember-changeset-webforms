import Component from '@glimmer/component';
import ComponentForStaticContentField from '../forms/component-for-static-content-field';

export default class StaticContentExampleTwoComponent extends Component {
  // BEGIN-SNIPPET static-content-example-2.js
  formSchema = {
    formSettings: {
      formName: 'staticContentExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'staticContent',
        fieldType: 'staticContent',
        contentComponent: {
          componentClass: ComponentForStaticContentField,
          props: {
            info: 'This text was passed to the label component dynamically for this option, via the contentComponent.props object',
          },
        },
      },
    ],
  };
  // END-SNIPPET
}
