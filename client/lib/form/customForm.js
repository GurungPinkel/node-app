import { useState, useEffect, useRef } from "react";

const CustomForm = ({ config, onSubmit }) => {
  const { initialValues, validations } = config;
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  // const formRendered = useRef(true);
  useEffect(() => {
    // if (!formRendered.current) {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setOnSubmitting(false);
    setOnBlur(false);
    // }
    // formRendered.current = false;
  }, []);

  const handleInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
    if (touched[name]) {
      const validationRules = validations[name];
      if (validationRules) {
        validate(name, validationRules, value);
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
    onSubmit({ values, errors });
  };

  const validate = (name, rulesObject, value) => {
    const currentErrors = [];
    setErrors({ ...errors, [name]: currentErrors });
    if (name && rulesObject && rulesObject.length > 0) {
      rulesObject.map((rule) => {
        let isValid = true;
        isValid = rule.regex ? validateRegex(rule.regex, value) : isValid;
        isValid = rule.fn ? rule.fn(value) : isValid;

        if (!isValid) {
          rule.message ? currentErrors.push(rule.message) : null;
          setErrors({ ...errors, [name]: currentErrors });
        }
      });
    }
  };

  const validateRegex = (regex, value) => {
    return regex.test(value);
  };

  return {
    values,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    handleSubmit,
  };
};
export { CustomForm };
