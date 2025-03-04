import Cookies from "js-cookie";

export function setCookie(key: string, data: any, expiresIn: number) {
  try {
    Cookies.set(key, JSON.stringify(data), { expires: expiresIn });
    return true;
  } catch (error) {
    return error;
  }
}


export function getCookie(key: string): any | null {
  try {
    const data = Cookies.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("getCookie error:", error);
    return null;
  }
}

export function removeCookie(key: string) {
  try {
    Cookies.remove(key);
    return true;
  } catch (error) {
    return error;
  }
}
