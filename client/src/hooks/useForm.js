import { useState, useEffect, useCallback } from 'react';
import validate from 'validate.js';
import _ from 'lodash';
import ls from 'modules/LocalStorage';

function useForm(stateSchema, validationSchema = {}, callback, options = {}) {
  
  const formatStateSchema = (schema) => {
    let newSchema = {};
    const keys = Object.keys(schema);
    for(var key of keys){
      newSchema[key] = {
        value: schema[key],
        error: '',
        touched: false
      }
    }
    return newSchema;
  }

  const formatStateDate = (data) => {
    let newSchema = {};
    const keys = Object.keys(data);
    for(var key of keys){
      newSchema[key] = data[key].value
    }
    return newSchema;
  }

  const [state, setState] = useState(formatStateSchema(stateSchema));

  useEffect(() => {
    if(options.localStorage){
      const lsdata = ls.get(options.localStorage);
      if(lsdata) setState(formatStateSchema(lsdata));
    }
  }, [])

  const [hasError, setHasError] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Disable button in initial render.
  /*
  useEffect(() => {
    setHasError(true);
  }, []);
  */

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setHasError(!validateState());
    }
  }, [state, isDirty]);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    if(_.isEmpty(validationSchema)){
	    return true;
    }
    const stateKeys = Object.keys(state);
    let validationState = {};
    for(var key of stateKeys){
      validationState[key] = state[key].value;
    }
    const errors = validate(validationState, validationSchema);
	
    if(!errors) return true;
    return false;
  }, [state, validationSchema]);

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    event => {
      if(isDirty === false) setIsDirty(true);
      const name = event.target.name;
      let value = event.target.value;
      if(event.target.type === 'number'){
        value = parseInt(event.target.value)
      }else if(event.target.type === 'checkbox'){
        value = event.target.checked;
      }

      let error = '';
      const validateErrors = validate({[name]: value}, validationSchema);
      if(validateErrors){
        error = validateErrors[name];
      }
      if(options.localStorage) ls.set(options.localStorage, formatStateDate({...state, [name]: {value}}));
      setState(prevState => ({
        ...prevState,
        [name]: { value, error, touched: true },
      }));
    },
    [validationSchema]
  );

  const handleOnValueChange = useCallback(
    name => value => {
      if(isDirty === false) setIsDirty(true);

      let error = '';
      const validateErrors = validate({[name]: value}, validationSchema);
      if(validateErrors){
        error = validateErrors[name];
      }
      console.log(999, error, name, value);
      if(options.localStorage) ls.set(options.localStorage, formatStateDate({...state, [name]: {value}}));
      setState(prevState => ({
        ...prevState,
        [name]: { value, error, touched: true },
      }));
    },
    [validationSchema]
  )

  const setFormValue = useCallback(
    (object) => {
      if(isDirty === false) setIsDirty(true);
      let savedNewState = {...state}
      let error = '';
      for(var name of Object.keys(object)){
        const value = object[name];
        const validateErrors = validate({[name]: value}, validationSchema);
        if(validateErrors){
          error = validateErrors[name];
        }
        console.log(999, error, name, value);
        savedNewState = {...savedNewState, [name]: {value}}
        if(options.localStorage) ls.set(options.localStorage, formatStateDate(savedNewState));
        setState(prevState => ({
          ...prevState,
          [name]: { value, error, touched: true },
        }));
      }
    },
    [validationSchema]
  )
  
  //Used to handle submit (with state showing submitting (true||false))
  const handleOnSubmit = useCallback(
    async event => {
      if (event) event.preventDefault();

      // Make sure that validateState returns true
      // Before calling the submit callback function
      if (validateState()) {
        setSubmitting(true);
        await callback(state);
        setSubmitting(false);
      }
    },
    [state]
  );
  
  //Function to set initial state after submitting
  const setInitial = useCallback(
    () => {
      setState(stateSchema);
    }
  )
  
  return Object.assign([hasError, isDirty, state, handleOnChange, handleOnValueChange, setFormValue, handleOnSubmit, submitting, setInitial], { hasError, isDirty, state, handleOnChange, handleOnValueChange, setFormValue, handleOnSubmit, submitting, setInitial })
}

export default useForm;