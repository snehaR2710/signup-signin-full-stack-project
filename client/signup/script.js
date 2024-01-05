
const userData = async () => {

  try {
    // fetch api to make a get request 
    const res = await fetch("http://localhost:8081", {
      method: "GET",
      credentials: "include",
    });


    // check if the response is not ok
    if (res.status !== 200) {
      {
         // Redirect to the login page if the status is not ok
        window.location.href = "http://localhost:5500/client/login.html";
      }

      // If the status is 200, parse the response JSON and extract data
      const { data } = await res.json();

      const userName = document.getElementById("userName");
      const userEmail = document.getElementById("userEmail");
      const userBio = document.getElementById("userBio");

      // here we set the innerText of the elements with user data
      userName.innerText = data.username;
      userEmail.innerText = data.email;
      userBio.innerText = data.bio;
    }
  } catch (error) {
    console.log(error.message);
  }

  // Redirect to the login page (this line will always execute, even if there was an error)
  // window.location.href = "http://localhost:5500/client/login/Login.html";
};

userData();
