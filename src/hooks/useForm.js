/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }
    return true
  }, [formValidation])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onFormReset = () => {
    setFormState(initialForm)
  }

  const createValidators = () => {
    const formCheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]

      const isValid = fn(formState[formField])
      formCheckedValues[`${formField}Valid`] = isValid ? null : errorMessage
    }

    setFormValidation(formCheckedValues)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onFormReset,
    ...formValidation,
    isFormValid
  }
}
