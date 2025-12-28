const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.querySelector(".success");

function setHelper(input, message, isValid) {
  const helper = input.nextElementSibling;
  helper.textContent = message;
  if (isValid) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    helper.style.color = "green";
  } else {
    input.classList.add("invalid");
    input.classList.remove("valid");
    helper.style.color = "red";
  }
}

function validateName() {
  const value = nameInput.value.trim();
  if (value === "") {
    setHelper(nameInput, "Name is required", false);
    return false;
  } else if (value.length < 3) {
    setHelper(nameInput, "Name too short", false);
    return false;
  } else {
    setHelper(nameInput, "Looks good 👍", true);
    return true;
  }
}

function validateEmail() {
  const value = emailInput.value.trim();
  const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (value === "") {
    setHelper(emailInput, "Email is required", false);
    return false;
  } else if (!regex.test(value)) {
    setHelper(emailInput, "Enter valid email like name@gmail.com", false);
    return false;
  } else {
    setHelper(emailInput, "Looks good 👍", true);
    return true;
  }
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value === "") {
    setHelper(messageInput, "Message is required", false);
    return false;
  } else if (value.length < 10) {
    setHelper(messageInput, "Add at least 10 characters", false);
    return false;
  } else {
    setHelper(messageInput, "Looks good 👍", true);
    return true;
  }
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid);
}

// Add input event listeners
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", validateForm);
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent reload

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    successMsg.textContent = "Message sent successfully!";

    // Trigger animation by forcing reflow
    successMsg.classList.remove("show");
    void successMsg.offsetWidth; // force reflow
    successMsg.classList.add("show"); // add show class to trigger animation

    // Reset form after 2s
    setTimeout(() => {
      this.reset();
      submitBtn.disabled = true;
      successMsg.classList.remove("show");

      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove("valid", "invalid");
        input.nextElementSibling.textContent = "";
      });
    }, 2000);

  } else {
    // Shake invalid fields
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input.classList.contains("invalid")) {
        input.classList.remove("invalid");
        void input.offsetWidth; // force reflow
        input.classList.add("invalid");
      }
    });
  }
});
