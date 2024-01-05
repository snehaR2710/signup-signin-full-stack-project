const formSubmit = document.getElementById("submit");

formSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  const nameOfUser = document.getElementById("name").value;
  const userBio = document.getElementById("bio").value;

  if (!userName || !userEmail || !userPassword || !nameOfUser || !userBio) {
    return alert("All input fields are required");
  }

  const userData = {
    name: nameOfUser,
    email: userEmail,
    password: userPassword,
    username: userName,
    bio: userBio,
  };
  registerUser(userData);
});

const registerUser = async (payload) => {
  console.log("payload: ", payload);
  try {
    const res = await fetch("http://localhost:8081/signup", {
      method: "POST",
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
