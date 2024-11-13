import { Formik, FormikErrors, FormikProps, FormikValues } from "formik";
import { ComponentPropsWithRef } from "react";
import { ScrollViewProps, ViewStyle } from "react-native"

export interface WFormProps<T extends FormikValues> {

  /**
   * Required Form Children
   */
  children: React.ReactNode

  /**
    * optionally listen to any input change into your form.
    * @param {T} value
    */
  onChange?: (value: T) => void;

  /**
   * Form initialValue - this is required, you can still pass in an empty object
   */
  initialValue: T;

  /**
   * Function that should be called when the form is being submitted.
   * The from can be submitted by calling formRef.submit()
   */
  onSubmit: (value: T) => void

  /**
   * Yup validation schema of function that returns [Yup](https://github.com/jquense/yup) validation schema
   */
  validationSchema?: React.ComponentProps<typeof Formik>['validationSchema'];

  /**
   * Form container style
   */
  style?: ViewStyle;

  /**
 * Optional Input container
 */
  InputContainer?: React.ComponentType<{ children: React.ReactNode }>;

  /**
   * Custom validation error component
   */
  ErrorComponent?: React.ComponentType<{ error: any }>;

  /**
   * min height for rendering input with animation default to screen height
   */
  minHeight?: number;

  /** 
   * removes the onShow animation of the form 
   */
  noAnimation?: boolean;

  contentContainerStyle?: ScrollViewProps['contentContainerStyle']
}

export interface WFormRef {
  submit: () => void
  isValid: () => boolean
  getErrors: () => any;
  setErrors: FormikProps<any>["setErrors"]
}
