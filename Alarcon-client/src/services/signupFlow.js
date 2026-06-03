export const registerViewerAccount = async (
  account,
  { createUser } = {}
) => {
  await createUser(account);

  return {
    redirectTo: "/",
    message: "Account created successfully.",
  };
};
