// TEMP in-memory users (simulate DB)
const users = [
  { userId: "doctor", password: "temporary123" },
  { userId: "nurse", password: "temporary123" },
];

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const user = users.find((u) => u.userId === userId);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== currentPassword) {
    return { success: false, message: "Current password is incorrect" };
  }

  //  Password validation (important)
  const isValid = validatePassword(newPassword);

  if (!isValid.valid) {
    return { success: false, message: isValid.message };
  }

  //  Update password
  user.password = newPassword;

  return { success: true };
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return { valid: false, message: "Minimum 8 characters required" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Must include uppercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Must include a number" };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, message: "Must include special character" };
  }

  return { valid: true };
}