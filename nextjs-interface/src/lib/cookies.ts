export function getCookie(cname: any) {
  if (typeof window === "undefined") {
    return ""; // Early return if not in browser environment
  }

  const theme = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(theme) == 0) {
      return c.substring(theme.length, c.length);
    }
  }
  return "";
}

export function setCookie(name: { name: string; value: any }) {
  if (typeof window === "undefined") {
    return;
  }

  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name.name + "=" + name.value + ";" + expires + ";path=/";
}
