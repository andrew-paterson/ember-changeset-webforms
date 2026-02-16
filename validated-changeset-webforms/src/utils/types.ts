export interface CwfCallbacks {
  beforeClearForm?: (instance: any) => void;
  afterClearForm?: (instance: any) => void;
  beforeResetForm?: (instance: any) => void;
  afterResetForm?: (instance: any) => void;
  // allow other optional callbacks (preserve compatibility)
  [key: string]: any;
}

export interface ChangesetWebformProps {
  formSchema: any;
  formSchemaWithDefaults: any;
  debug: boolean;
  dynamicIncludeExcludeConditions: any;
  callbacks: CwfCallbacks;
  fields: any[];
  submit: Function;
  changeset: any;
}
