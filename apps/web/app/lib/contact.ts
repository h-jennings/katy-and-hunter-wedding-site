const KATY_PHONE = process.env.NEXT_PUBLIC_KATY_PHONE ?? "";

export const KATY_SMS_HREF = KATY_PHONE ? `sms:${KATY_PHONE}` : "";

export const KATY_PHONE_DISPLAY = formatPhoneForDisplay(KATY_PHONE);

function formatPhoneForDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw;
}
