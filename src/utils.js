export const user = {
  isLoggedIn: localStorage.getItem("user"),
  credantials: JSON.parse(localStorage.getItem("user")),
  handleLogin: function (data) {
    localStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  },
  handleLogout: function () {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  },
  orgBasedPermission: function (val) {
    return this.credantials?.organization?.includes(val);
  },
};

export const tcknQuery = (tckn) => {
  let tc10 =
    parseInt(tckn[0]) +
    parseInt(tckn[2]) +
    parseInt(tckn[4]) +
    parseInt(tckn[6]) +
    parseInt(tckn[8]);
  tc10 = tc10 * 7;
  tc10 =
    tc10 -
    (parseInt(tckn[1]) +
      parseInt(tckn[3]) +
      parseInt(tckn[5]) +
      parseInt(tckn[7]));
  tc10 = tc10 % 10;
  let tc11 =
    parseInt(tckn[0]) +
    parseInt(tckn[1]) +
    parseInt(tckn[2]) +
    parseInt(tckn[3]) +
    parseInt(tckn[4]) +
    parseInt(tckn[5]) +
    parseInt(tckn[6]) +
    parseInt(tckn[7]) +
    parseInt(tckn[8]) +
    tc10;
  tc11 = tc11 % 10;

  if (
    parseInt(tckn[9]) === tc10 &&
    parseInt(tckn[10]) === tc11 &&
    parseInt(tckn[0]) !== 0
  ) {
    return true;
  } else {
    return false;
  }
};
