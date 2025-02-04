export const BIRTHDAY_QUERY = `*[_type == "birthdayMessage" && displayUntil > now()] | order(_createdAt desc)[0]`;
