import Component from '@glimmer/component';
import ComponentForStaticContentField from '../forms/component-for-static-content-field.js';
import { ensureSafeComponent } from '@embroider/util';

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
          componentClass: ensureSafeComponent(ComponentForStaticContentField),
          props: {
            info: 'This text was passed to the label component dynamically for this option, via the contentComponent.props object',
          },
        },
      },
    ],
  };
  // END-SNIPPET
}
