const setCookie = (cookieName, cookieValue, expairyDays = 30) => {
  const today = new Date();
  today.setTime(today.getTime() + expairyDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + today.toUTCString();
  document.cookie = encodeURIComponent(cookieName) + "=" +
    encodeURIComponent(cookieValue) + ";" + expires + ";path=/";
};

const getCookie = (cookieName) => {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieList = decodedCookie.split(";");
  for (let i = 0; i < cookieList.length; i++) {
    let cookie = cookieList[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

const deleteCookie = (cookieName) => {
  document.cookie =
    encodeURIComponent(cookieName) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const CookieHandler = {
  setCookie,
  getCookie,
  deleteCookie,
};

export const getAuthHeaders = async () => {
  return {
    Authorization: "Bearer " + CookieHandler.getCookie("access"),
  };
};

export default CookieHandler;
