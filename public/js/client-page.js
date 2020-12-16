//comments
const writeComment = document.querySelector("#write-comment");
const commentBtn = document.querySelector("#comments-btn");
let commentsList = document.querySelector("#comments-table tbody");
const clientId = document.querySelector("#client-id");
const id = clientId.textContent;

function displayComments(array) {
  commentsList.innerHTML = "";
  array.forEach((element) => {
    commentsList.innerHTML += `<tr><td>${element} <i class="fas fa-trash" id="trash-comment"></td></tr>`;
  });
  trashComment();
}

async function fetchComments() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    const comments = client.data.comments;
    displayComments(comments);
  } catch (err) {
    console.error(err);
  }
}

function sendComment() {
  commentBtn.addEventListener("click", async () => {
    const commentContent = writeComment.value;
    console.log(commentContent);
    writeComment.value = "";
    try {
      await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
        $push: { comments: `${commentContent}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  });
}

function trashComment() {
  document
    .querySelector(".trash-comment")
    .addEventListener("click", async () => {
      let removedComment = document.querySelectorAll(".comment");
      console.log(removedComment);
      try {
        await axios.patch(`http://localhost:4848/api/edit/clients/${id}`, {
          $pull: { comments: `${removedComment}` },
        });
        fetchFComments();
      } catch (err) {
        console.error(err);
      }
    });
}

//firstname
let firstnameArea = document.querySelector("#firstname");

async function fetchFirstname() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    firstnameArea.innerHTML = `<td>Firstname</td> <td id="client-firstname">${client.data.firstname} <i class="fas fa-pencil-alt" id="edit-firstname"></i></td>`;
    openFirstnameEditor();
  } catch (err) {
    console.error(err);
  }
}

function openFirstnameEditor() {
  try {
    document
      .querySelector("#edit-firstname")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        firstnameArea.innerHTML = `<td>Firstname</td>
       <td id="input-firstname"><input type="text" name="firstname" value="${client.data.firstname}">
        <i class="fas fa-check check-firstname"></i>
        <i class="fas fa-times erase-firstname"></i>
        </td>`;
        editFirstname();
        deleteFirstnameInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editFirstname() {
  document
    .querySelector(".check-firstname")
    .addEventListener("click", async () => {
      let editedFirstname = document.querySelector("#input-firstname input");
      const firstname = editedFirstname.value;
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

function deleteFirstnameInput() {
  document
    .querySelector(".erase-firstname")
    .addEventListener("click", async () => {
      let editedFirstname = document.querySelector("#input-firstname input");
      editedFirstname.value = "";
    });
}

//lastname
let lastnameArea = document.querySelector("#lastname");

async function fetchLastname() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    lastnameArea.innerHTML = `<td>Lastname</td> <td id="client-lastname">${client.data.lastname} <i class="fas fa-pencil-alt" id="edit-lastname"></i></td>`;
    openLastnameEditor();
  } catch (err) {
    console.error(err);
  }
}

function openLastnameEditor() {
  try {
    document
      .querySelector("#edit-lastname")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        lastnameArea.innerHTML = `<td>Lastname</td>
       <td id="input-lastname"><input type="text" name="lastname" value="${client.data.lastname}">
        <i class="fas fa-check check-lastname"></i>
        <i class="fas fa-times erase-lastname"></i>
        </td>`;
        editLastname();
        deleteLastnameInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editLastname() {
  document
    .querySelector(".check-lastname")
    .addEventListener("click", async () => {
      let editedLastname = document.querySelector("#input-lastname input");
      const lastname = editedLastname.value;
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

function deleteLastnameInput() {
  document
    .querySelector(".erase-lastname")
    .addEventListener("click", async () => {
      let editedLastname = document.querySelector("#input-lastname input");
      editedLastname.value = "";
    });
}

//Email
let emailArea = document.querySelector("#email");

async function fetchEmail() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    emailArea.innerHTML = `<td>Email</td> <td id="client-email">${client.data.email} <i class="fas fa-pencil-alt" id="edit-email"></i></td>`;
    openEmailEditor();
  } catch (err) {
    console.error(err);
  }
}

function openEmailEditor() {
  try {
    document
      .querySelector("#edit-email")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        emailArea.innerHTML = `<td>Email</td>
       <td id="input-email"><input type="text" name="email" value="${client.data.email}">
        <i class="fas fa-check check-email"></i>
        <i class="fas fa-times erase-email"></i>
        </td>`;
        editEmail();
        deleteEmailInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editEmail() {
  document.querySelector(".check-email").addEventListener("click", async () => {
    let editedEmail = document.querySelector("#input-email input");
    const email = editedEmail.value;
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

function deleteEmailInput() {
  document.querySelector(".erase-email").addEventListener("click", async () => {
    let editedEmail = document.querySelector("#input-email input");
    editedEmail.value = "";
  });
}

//phonenumber
let phonenumberArea = document.querySelector("#phonenumber");

async function fetchPhonenumber() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    phonenumberArea.innerHTML = `<td>Phonenumber</td> <td id="client-phonenumber">${client.data.phonenumber} <i class="fas fa-pencil-alt" id="edit-phonenumber"></i></td>`;
    openPhonenumberEditor();
  } catch (err) {
    console.error(err);
  }
}

function openPhonenumberEditor() {
  try {
    document
      .querySelector("#edit-phonenumber")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        phonenumberArea.innerHTML = `<td>Phonenumber</td>
       <td id="input-phonenumber"><input type="text" name="phonenumber" value="${client.data.phonenumber}">
        <i class="fas fa-check check-phonenumber"></i>
        <i class="fas fa-times erase-phonenumber"></i>
        </td>`;
        editPhonenumber();
        deletePhonenumberInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editPhonenumber() {
  document
    .querySelector(".check-phonenumber")
    .addEventListener("click", async () => {
      let editedPhonenumber = document.querySelector(
        "#input-phonenumber input"
      );
      const phonenumber = editedPhonenumber.value;
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

function deletePhonenumberInput() {
  document
    .querySelector(".erase-phonenumber")
    .addEventListener("click", async () => {
      let editedPhonenumber = document.querySelector(
        "#input-phonenumber input"
      );
      editedPhonenumber.value = "";
    });
}

//streetnumber
let streetnumberArea = document.querySelector("#streetnumber");

async function fetchStreetnumber() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    streetnumberArea.innerHTML = `<td>Streetnumber</td> <td id="client-streetnumber">${client.data.streetnumber} <i class="fas fa-pencil-alt" id="edit-streetnumber"></i></td>`;
    openStreetnumberEditor();
  } catch (err) {
    console.error(err);
  }
}

function openStreetnumberEditor() {
  try {
    document
      .querySelector("#edit-streetnumber")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        streetnumberArea.innerHTML = `<td>Streetnumber</td>
       <td id="input-streetnumber"><input type="text" name="streetnumber" value="${client.data.streetnumber}">
        <i class="fas fa-check check-streetnumber"></i>
        <i class="fas fa-times erase-streetnumber"></i>
        </td>`;
        editStreetnumber();
        deleteStreetnumberInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editStreetnumber() {
  document
    .querySelector(".check-streetnumber")
    .addEventListener("click", async () => {
      let editedStreetnumber = document.querySelector(
        "#input-streetnumber input"
      );
      const streetnumber = editedStreetnumber.value;
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

function deleteStreetnumberInput() {
  document
    .querySelector(".erase-streetnumber")
    .addEventListener("click", async () => {
      let editedStreetnumber = document.querySelector(
        "#input-streetnumber input"
      );
      editedStreetnumber.value = "";
    });
}

//street
let streetArea = document.querySelector("#street");

async function fetchStreet() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    streetArea.innerHTML = `<td>Street</td> <td id="client-street">${client.data.street} <i class="fas fa-pencil-alt" id="edit-street"></i></td>`;
    openStreetEditor();
  } catch (err) {
    console.error(err);
  }
}

function openStreetEditor() {
  try {
    document
      .querySelector("#edit-street")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        streetArea.innerHTML = `<td>Street</td>
       <td id="input-street"><input type="text" name="street" value="${client.data.street}">
        <i class="fas fa-check check-street"></i>
        <i class="fas fa-times erase-street"></i>
        </td>`;
        editStreet();
        deleteStreetInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editStreet() {
  document
    .querySelector(".check-street")
    .addEventListener("click", async () => {
      let editedStreet = document.querySelector("#input-street input");
      const street = editedStreet.value;
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

function deleteStreetInput() {
  document
    .querySelector(".erase-street")
    .addEventListener("click", async () => {
      let editedStreet = document.querySelector("#input-street input");
      editedStreet.value = "";
    });
}

//zipcode
let zipcodeArea = document.querySelector("#zipcode");

async function fetchZipcode() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    zipcodeArea.innerHTML = `<td>Zipcode</td> <td id="client-zipcode">${client.data.zipcode} <i class="fas fa-pencil-alt" id="edit-zipcode"></i></td>`;
    openZipcodeEditor();
  } catch (err) {
    console.error(err);
  }
}

function openZipcodeEditor() {
  try {
    document
      .querySelector("#edit-zipcode")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        zipcodeArea.innerHTML = `<td>Zipcode</td>
       <td id="input-zipcode"><input type="text" name="zipcode" value="${client.data.zipcode}">
        <i class="fas fa-check check-zipcode"></i>
        <i class="fas fa-times erase-zipcode"></i>
        </td>`;
        editZipcode();
        deleteZipcodeInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editZipcode() {
  document
    .querySelector(".check-zipcode")
    .addEventListener("click", async () => {
      let editedZipcode = document.querySelector("#input-zipcode input");
      const zipcode = editedZipcode.value;
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

function deleteZipcodeInput() {
  document
    .querySelector(".erase-zipcode")
    .addEventListener("click", async () => {
      let editedZipcode = document.querySelector("#input-zipcode input");
      editedZipcode.value = "";
    });
}

//city
let cityArea = document.querySelector("#city");

async function fetchCity() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    cityArea.innerHTML = `<td>City</td> <td id="client-city">${client.data.city} <i class="fas fa-pencil-alt" id="edit-city"></i></td>`;
    openCityEditor();
  } catch (err) {
    console.error(err);
  }
}

function openCityEditor() {
  try {
    document.querySelector("#edit-city").addEventListener("click", async () => {
      const client = await axios.get(`/api/clients/${id}`);
      cityArea.innerHTML = `<td>City</td>
       <td id="input-city"><input type="text" name="city" value="${client.data.city}">
        <i class="fas fa-check check-city"></i>
        <i class="fas fa-times erase-city"></i>
        </td>`;
      editCity();
      deleteCityInput();
    });
  } catch (err) {
    console.error(err);
  }
}

function editCity() {
  document.querySelector(".check-city").addEventListener("click", async () => {
    let editedCity = document.querySelector("#input-city input");
    const city = editedCity.value;
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

function deleteCityInput() {
  document.querySelector(".erase-city").addEventListener("click", async () => {
    let editedCity = document.querySelector("#input-city input");
    editedCity.value = "";
  });
}

//country
let countryArea = document.querySelector("#country");

async function fetchCountry() {
  try {
    const client = await axios.get(`/api/clients/${id}`);
    countryArea.innerHTML = `<td>Country</td> <td id="client-city">${client.data.country} <i class="fas fa-pencil-alt" id="edit-country"></i></td>`;
    openCountryEditor();
  } catch (err) {
    console.error(err);
  }
}

function openCountryEditor() {
  try {
    document
      .querySelector("#edit-country")
      .addEventListener("click", async () => {
        const client = await axios.get(`/api/clients/${id}`);
        countryArea.innerHTML = `<td>Country</td>
       <td id="input-country"><input type="text" name="country" value="${client.data.country}">
        <i class="fas fa-check check-country"></i>
        <i class="fas fa-times erase-country"></i>
        </td>`;
        editCountry();
        deleteCountryInput();
      });
  } catch (err) {
    console.error(err);
  }
}

function editCountry() {
  document
    .querySelector(".check-country")
    .addEventListener("click", async () => {
      let editedCountry = document.querySelector("#input-country input");
      const country = editedCountry.value;
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

function deleteCountryInput() {
  document
    .querySelector(".erase-country")
    .addEventListener("click", async () => {
      let editedCountry = document.querySelector("#input-country input");
      editedCountry.value = "";
    });
}

openFirstnameEditor();
openLastnameEditor();
openEmailEditor();
openPhonenumberEditor();
openStreetnumberEditor();
openStreetEditor();
openZipcodeEditor();
openCityEditor();
openCountryEditor();

sendComment();
