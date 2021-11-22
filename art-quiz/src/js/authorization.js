const singIn = document.querySelector(".sing_in");
const userName = document.querySelector(".user_name");
const singOut = document.querySelector(".sing_out");

init();
function init() {
  window.gapi.load("auth2", function () {
    window.gapi.auth2
      .init({
        client_id:
          "780076561656-birdmr81t75tq1kuj3degj1jio675o6b.apps.googleusercontent.com",
      })
      .then(
        () => console.log("init"),
        () => console.log("error")
      );
  });
}

singIn.addEventListener("click", getSingIn);
function getSingIn() {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();

  GoogleAuth.signIn({
    scope: "profile email",
  }).then(
    (user) => {
      const name = user.getBasicProfile().getName();
      userName.textContent = `${name}`;
      console.log("user", user);
      if (name) {
        const user = document.querySelector(".user");
        user.classList.remove("hidden");
        singOut.classList.remove("hidden");
        singIn.classList.add("hidden");
      }
    },
    () => console.log("user error")
  );
}
singOut.addEventListener("click", getSingOut);
function getSingOut() {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();
  GoogleAuth.signOut().then(
    () => {
      const user = document.querySelector(".user");
      userName.textContent = "";
      user.classList.add("hidden");
      singOut.classList.add("hidden");
      singIn.classList.remove("hidden");
      console.log("sign out ok");
    },
    () => console.log("sign out error")
  );
}
