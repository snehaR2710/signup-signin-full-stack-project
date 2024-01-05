const formSubmit = document.getElementById("submit");

formSubmit.addEventListener("click", (event) => {
  event.defaultPrevented();
  const userName = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;
  const userData = {
    username: userName,
    password: userPassword,
  };

  loginUser(userData);
});

const loginUser = async (payload) => {
  try {
    const res = await fetch("http://localhost:8081/login", {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);

    window.location.href = "http://localhost:5500/client/signup/index.html";
  } catch (error) {
    console.log(error.message);
  }
};
