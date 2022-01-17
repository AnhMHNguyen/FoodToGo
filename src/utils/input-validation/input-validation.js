const isValidEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export const validateEmail = (value, setEmailError) => {
  if (value === "") {
      setEmailError("")
  }
  else if (isValidEmail(value)) {
      setEmailError("")
  }
  else {
      setEmailError("Invalid Email")
  }
}

export const validatePassword = (value, setPasswordError) => {
  if (value.length < 6) {
      setPasswordError("Password must be 6 characters")
  } else {
      setPasswordError("")
  }
}

export const validateInput = (value, minLength, setError) => {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
        setError("")
    }
}