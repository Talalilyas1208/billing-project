export const validation = (formData, isLoginMode) => {
  const { email, password, displayName } = formData;


  if (!email && !password &&!displayName) {
    return "Email and password required.";
  }


  if (!email) {
    return "Please enter your email address.";
  }

 
  if (!password) {
    return "Please enter your password.";
  }

//   if(!displayName ){
//     return "please enter the display name"
//   }
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "This doesn't look like a valid email.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!isLoginMode && !displayName) {
    return "Please enter your full name to register.";
  }

  return null; 
};