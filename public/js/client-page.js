//comments
const writeComment = document.querySelector("#write-comment");
const commentBtn = document.querySelector("#comments-btn");
let commentsList = document.querySelector("#comments-table tbody");
const clientId = document.querySelector("#client-id");

function displayComments(array) {
  commentsList.innerHTML = "";
  array.forEach((element) => {
    commentsList.innerHTML += `<tr><td>${element}</td></tr>`;
  });
}

async function fetchComments() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    const comments = client.data.comments;
    displayComments(comments);
  } catch (err) {
    console.error(err);
  }
}

function sendComment() {
  commentBtn.addEventListener("click", async () => {
    const comments = writeComment.value;
    const id = clientId.textContent;
    writeComment.value = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        $push: { comments: `${comments}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  });
}

//firstname
let firstname = document.querySelector("#client-firstname");
let editedFirstname = document.querySelector("#input-firstname");
const editFirstameBtn = document.querySelector("#check-firstname");
const deleteFirstameBtn = document.querySelector("#delete-firstname");

async function fetchFirstname() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    firstname.innerHTML = `${client.data.firstname} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editFirstname() {
  editFirstameBtn.addEventListener("click", async () => {
    const firstname = editedFirstname.value;
    const id = clientId.textContent;
    editedFirstname = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        firstname: `${firstname}`,
      });
      fetchFirstname();
    } catch (err) {
      console.error(err);
    }
  });
}

//lastname
let lastname = document.querySelector("#client-lastname");
let editedLastname = document.querySelector("#input-lastname");
const editLastnameBtn = document.querySelector("#check-lastname");
const deleteLastnameBtn = document.querySelector("#delete-lastname");

async function fetchLastname() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    lastname.innerHTML = `${client.data.lastname} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editLastname() {
  editLastnameBtn.addEventListener("click", async () => {
    const lastname = editedLastname.value;
    const id = clientId.textContent;
    editedLastname = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        lastname: `${lastname}`,
      });
      fetchLastname();
    } catch (err) {
      console.error(err);
    }
  });
}

//email
let email = document.querySelector("#client-email");
let editedEmail = document.querySelector("#input-email");
const editEmailBtn = document.querySelector("#check-email");
const deleteEmailBtn = document.querySelector("#delete-email");

async function fetchEmail() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    email.innerHTML = `${client.data.email} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editEmail() {
  editEmailBtn.addEventListener("click", async () => {
    const email = editedEmail.value;
    const id = clientId.textContent;
    editedEmail = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        email: `${email}`,
      });
      fetchEmail();
    } catch (err) {
      console.error(err);
    }
  });
}

//phonenumber
let phonenumber = document.querySelector("#client-phonenumber");
let editedPhonenumber = document.querySelector("#input-phonenumber");
const editPhonenumberBtn = document.querySelector("#check-phonenumber");
const deletePhonenumberBtn = document.querySelector("#delete-phonenumber");

async function fetchPhonenumber() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    phonenumber.innerHTML = `${client.data.phonenumber} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editPhonenumber() {
  editPhonenumberBtn.addEventListener("click", async () => {
    const phonenumber = editedPhonenumber.value;
    const id = clientId.textContent;
    editedPhonenumber = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        phonenumber: `${phonenumber}`,
      });
      fetchPhonenumber();
    } catch (err) {
      console.error(err);
    }
  });
}

//streetnumber
let streetnumber = document.querySelector("#client-streetnumber");
let editedStreetnumber = document.querySelector("#input-streetnumber");
const editStreetnumberBtn = document.querySelector("#check-streetnumber");
const deleteStreetnumberBtn = document.querySelector("#delete-streetnumber");

async function fetchStreetnumber() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    streetnumber.innerHTML = `${client.data.streetnumber} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editStreetnumber() {
  editStreetnumberBtn.addEventListener("click", async () => {
    const streetnumber = editedStreetnumber.value;
    const id = clientId.textContent;
    editedStreetnumber = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        streetnumber: `${streetnumber}`,
      });
      fetchStreetnumber();
    } catch (err) {
      console.error(err);
    }
  });
}

//street
let street = document.querySelector("#client-street");
let editedStreet = document.querySelector("#input-street");
const editStreetBtn = document.querySelector("#check-street");
const deleteStreetBtn = document.querySelector("#delete-street");

async function fetchStreet() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    street.innerHTML = `${client.data.street} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editStreet() {
  editStreetBtn.addEventListener("click", async () => {
    const street = editedStreet.value;
    const id = clientId.textContent;
    editedStreet = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        street: `${street}`,
      });
      fetchStreet();
    } catch (err) {
      console.error(err);
    }
  });
}

//zipcode
let zipcode = document.querySelector("#client-zipcode");
let editedZipcode = document.querySelector("#input-zipcode");
const editZipcodeBtn = document.querySelector("#check-zipcode");
const deleteZipcodeBtn = document.querySelector("#delete-zipcode");

async function fetchZipcode() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    zipcode.innerHTML = `${client.data.zipcode} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editZipcode() {
  editZipcodeBtn.addEventListener("click", async () => {
    const zipcode = editedZipcode.value;
    const id = clientId.textContent;
    editedZipcode = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        zipcode: `${zipcode}`,
      });
      fetchZipcode();
    } catch (err) {
      console.error(err);
    }
  });
}

//city
let city = document.querySelector("#client-city");
let editedCity = document.querySelector("#input-city");
const editCityBtn = document.querySelector("#check-city");
const deleteCityBtn = document.querySelector("#delete-city");

async function fetchCity() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    city.innerHTML = `${client.data.city} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editCity() {
  editCityBtn.addEventListener("click", async () => {
    const city = editedCity.value;
    const id = clientId.textContent;
    editedCity = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        city: `${city}`,
      });
      fetchCity();
    } catch (err) {
      console.error(err);
    }
  });
}

//country
let country = document.querySelector("#client-country");
let editedCountry = document.querySelector("#input-country");
const editCountryBtn = document.querySelector("#check-country");
const deleteCountryBtn = document.querySelector("#delete-country");

async function fetchCountry() {
  try {
    const id = clientId.textContent;
    const client = await axios.get(`/api/clients/${id}`);
    country.innerHTML = `${client.data.country} <i class="fas fa-pencil-alt">`;
  } catch (err) {
    console.error(err);
  }
}

function editCountry() {
  editCountryBtn.addEventListener("click", async () => {
    const country = editedCountry.value;
    const id = clientId.textContent;
    editedCountry = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        country: `${country}`,
      });
      fetchCountry();
    } catch (err) {
      console.error(err);
    }
  });
}

sendComment();
editFirstname();
editLastname();
editEmail();
editPhonenumber();
editStreetnumber();
editStreet();
editZipcode();
editCity();
editCountry();
