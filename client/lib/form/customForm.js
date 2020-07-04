import { useState, useEffect, useRef } from "react";

const CustomForm = ({ config, onSubmit }) => {
  const { initialValues, validations } = config;
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState(false);

  // const formRendered = useRef(true);
  useEffect(() => {
    // if (!formRendered.current) {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setOnSubmitting(false);
    // }
    // formRendered.current = false;
  }, []);

  const handleInputChange = (event, name) => {
    const { target } = event;
    console.log(target);
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
    if (touched[name]) {
      const validationRules = validations[name];
      if (validationRules) {
        const currentErrors = validate(name, validationRules, value);
        setErrors({ ...errors, [name]: currentErrors });
      }
    }
  };

  const handleBlur = (event) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const formErrors = validateAllFields();
    onSubmit(formErrors);
  };

  const validate = (name, rulesObject, value) => {
    const currentErrors = [];
    if (name && rulesObject && rulesObject.length > 0) {
      rulesObject.map((rule) => {
        let isValid = true;
        isValid = rule.regex ? validateRegex(rule.regex, value) : isValid;
        isValid = rule.fn ? rule.fn(value) : isValid;

        if (!isValid) {
          rule.message ? currentErrors.push(rule.message) : null;
        }
      });
      return currentErrors;
    }
  };

  const validateAllFields = () => {
    const formErrors = {};
    const touched = {};
    Object.keys(validations).map((key) => {
      const currentFieldValue = values[key];
      const currentFieldValidation = validations[key];
      const currentErrors = validate(
        key,
        currentFieldValidation,
        currentFieldValue
      );
      formErrors[key] = currentErrors;
      touched[key] = true;
    });
    setErrors(formErrors);
    setTouched(touched);
    return formErrors;
  };

  const validateRegex = (regex, value) => {
    return regex.test(value);
  };

  return {
    values,
    errors,
    touched,
    onSubmitting,
    handleInputChange,
    handleBlur,
    handleSubmit,
  };
};
export { CustomForm };
