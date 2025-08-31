export function formatPhoneNumber(phoneString: string): string {
  const digits = phoneString.replace(/\D/g, "")
  if (digits.length !== 10) return phoneString // Return original if invalid
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}