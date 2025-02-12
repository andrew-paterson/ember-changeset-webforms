import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{@formSettings.submitButtonFeedback}}");

const FormSubmitFeedback = templateOnly();
var formSubmitFeedback = setComponentTemplate(TEMPLATE, FormSubmitFeedback);

export { formSubmitFeedback as default };
//# sourceMappingURL=form-submit-feedback.js.map
