import { Formik, FormikErrors, FormikProps, FormikValues } from "formik";
import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from "react";
import { View, LayoutChangeEvent } from "react-native";
import Animated, {
  Transition,
  Transitioning,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { WFormProps, WFormRef } from "./w-form.type";
import { styles } from "./w-form.styles";
import { Text } from "../../../../../shared/components";
import { screenDimensions } from "../../../../../shared/theme";

const AnimatedScrollView = (Animated.ScrollView as unknown) as React.FC<
  React.ComponentProps<typeof Animated.ScrollView>
>;
const TransitioningView = (Transitioning.View as unknown) as React.FC<
  React.ComponentPropsWithRef<typeof Transitioning.View>
>;
const TransitionTogether = (Transition.Together as unknown) as React.FC<
  React.ComponentPropsWithRef<typeof Transition.Together>
>;
const TransitionChange = (Transition.Change as unknown) as React.FC<
  React.ComponentPropsWithRef<typeof Transition.Change>
>;

function CellRender<T extends FormikValues>({
  children,
  formRef,
  initialValues,
  ErrorComponent,
  InputContainer,
  submitAttempted,
  transView,
}: {
  children: React.ReactNode;
  initialValues: FormikValues;
  formRef: React.MutableRefObject<FormikProps<T>>;
  ErrorComponent: WFormProps<T>["ErrorComponent"];
  InputContainer: Exclude<WFormProps<T>["InputContainer"], undefined>;
  submitAttempted: boolean;
  transView: React.MutableRefObject<any>;
}) {
  const content = React.Children.map(
    children,
    (element): React.ReactNode => {
      if (React.isValidElement(element)) {
        if (element.props.fieldName) {
          const El = React.cloneElement(element, {
            onChange: (value: string) => {
              if (submitAttempted) transView.current.animateNextTransition();
              formRef.current.setFieldValue(element.props.fieldName, value);
            },
            onBlur: () => {
              formRef.current.handleBlur(element.props.fieldName);
              element.props.onBlur?.();
            },
            onFocus: () => {
              element.props.onFocus?.();
            },
            error: formRef.current?.errors?.[element.props.fieldName],
            value: formRef.current?.values?.[element.props.fieldName],
          });

          return (
            <InputContainer>
              <>
                {El}
                {formRef.current.errors[El.props.fieldName] ? (
                  ErrorComponent ? (
                    <ErrorComponent
                      error={formRef.current.errors[El.props.fieldName]}
                    />
                  ) : (
                    <View style={styles.formError}>
                      <Text style={styles.formErrorText}>
                        {formRef.current.errors[El.props.fieldName] as string}
                      </Text>
                    </View>
                  )
                ) : (
                  <View />
                )}
              </>
            </InputContainer>
          );
        }
        if (element.props.children) {
          const El = React.cloneElement(element, {
            children: (
              <CellRender<T>
                InputContainer={InputContainer}
                initialValues={initialValues}
                formRef={formRef}
                ErrorComponent={ErrorComponent}
                transView={transView}
                submitAttempted={submitAttempted}
              >
                {element.props.children}
              </CellRender>
            ),
          });
          return El;
        }
        return React.cloneElement(element);
      }
      return element;
    }
  );

  return <>{content}</>;
}
const DefaultInputContainer = ({ children }: { children: React.ReactNode }) => (
  <View>{children}</View>
);

function Form<T extends FormikValues>(
  {
    ErrorComponent,
    style,
    onChange,
    initialValue = {} as T,
    InputContainer = DefaultInputContainer,
    contentContainerStyle = {},
    minHeight,
    noAnimation,
    ...props
  }: WFormProps<T>,
  refs: React.Ref<WFormRef>
) {
  const formRef = useRef<FormikProps<T>>({
    values: initialValue,
  } as FormikProps<T>);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const transView = useRef(null);
  const viewHeight = useSharedValue(minHeight || screenDimensions.height);

  const transition = (
    <TransitionTogether>
      <TransitionChange interpolation={"easeOut"} />
    </TransitionTogether>
  );

  useImperativeHandle(refs, () => ({
    submit() {
      setSubmitAttempted(true);
      formRef.current?.handleSubmit();
    },
    getErrors() {
      return formRef.current.errors;
    },
    isValid: () => submitAttempted && formRef.current.isValid,
    setErrors(errors: FormikErrors<T>) {
      formRef.current?.setErrors(errors);
    },
  }));

  const giveLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (screenDimensions.height > layoutHeight) {
      viewHeight.value = layoutHeight;
    } else {
      viewHeight.value = screenDimensions.height - 30;
    }
  };
  const animatedHeight = useAnimatedStyle(() => ({
    height: withSpring(viewHeight.value),
  }));
  return (
    <AnimatedScrollView
      keyboardShouldPersistTaps={"always"}
      contentContainerStyle={contentContainerStyle}
      style={[styles.mainContainer, noAnimation ? {} : animatedHeight, style]}
    >
      <TransitioningView ref={transView} transition={transition}>
        <Formik
          validationSchema={props.validationSchema}
          onSubmit={props.onSubmit}
          validateOnChange={submitAttempted}
          onChange={onChange}
          validateOnBlur={submitAttempted}
          initialValues={initialValue}
        >
          {(form) => {
            if (form.values !== formRef.current?.values)
              onChange && onChange(form.values);
            formRef.current = form;
            return (
              <View onLayout={giveLayout}>
                <CellRender<T>
                  InputContainer={InputContainer}
                  initialValues={initialValue}
                  ErrorComponent={ErrorComponent}
                  formRef={formRef}
                  transView={transView}
                  submitAttempted={submitAttempted}
                >
                  {props.children}
                </CellRender>
              </View>
            );
          }}
        </Formik>
      </TransitioningView>
    </AnimatedScrollView>
  );
}

export const WForm = forwardRef(Form);
