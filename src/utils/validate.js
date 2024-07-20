export const checkValidData = (name, email, password) => {
  const nameIsValid = /([a-zA-Z0-9_\s]+)/.test(name);
  const emailIsValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(
    email
  );
  const passwordIsValid =
    /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!nameIsValid) return "Name is not valid";
  if (!emailIsValid) return "Email Id is not valid";
  if (!passwordIsValid) return "Password is not valid";

  return null;
};
