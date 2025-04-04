document.addEventListener("DOMContentLoaded", function () {
  addEvent(); //add an event
  displayEvent(); //display all events
  btnScroll();
});

//This function adds an event to the database
function addEvent() {
  const form = document.querySelector("#myForm");
  console.log(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("clicked");

    const name = document.getElementById("eventName").value;
    const Category = document.getElementById("category").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const organizer = document.getElementById("eventOrganiser").value;
    const capacity = document.getElementById("eventCapacity").value;
    const location = document.getElementById("eventLocation").value;
    const description = document.getElementById("eventDescription").value;
    const image = document.getElementById("eventImage").value;

    //create a new event\
    const newEvent = {
      name,
      Category,
      date,
      time,
      organizer,
      capacity,
      location,
      description,
      image,
      comments: [],
      reviews: [],
    };

    console.log("sending event data", newEvent);
    fetch("http://localhost:3001/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((event) => {
        alert("event added successfuly");
        console.log("event saved", event);
        form.reset(); //reset the form
        displayEvent(); //display all events
      });
  });
}
function displayEvent() {
  fetch("http://localhost:3001/events")
    .then((res) => res.json())
    .then((events) => {
      const eventContainer = document.querySelector(".eventsContainer");
      console.log(`This are my events${events}`);

      //   eventCard.innerHTML = "";
      eventContainer.innerHTML = ""; //clear the event container

      events.forEach((event) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("eventCard");
        console.log(eventCard);
        eventCard.innerHTML += `
        <div class="eventCard">
            <img src="${event.image}" alt="Event Image" />
          <div class="eventContent">
            <h3>${event.name}</h3>

            <div class="eventInfo">
              <i class="far fa-calendar"></i>
              <span>${event.date || "No date"} • ${event.time || ""}</span>
            </div>

            <div class="eventInfo">
              <i class="fas fa-map-marker-alt"></i>
              <span>${event.location}</span>
            </div>
            <div class="eventInfo">
              <i class="fas fa-user"></i>
              <span>${event.organizer || "No organisers"}</span>
            </div>
            <div class="eventInfo">
              <i class="fas fa-users"></i>
              <span>${event.capacity} people</span>
            </div>
            <div class="eventInfo">
              <i class="fas fa-tags"></i>
              <span>${event.Category || "No Category Chosen"}</span>
            </div>
            <p class="eventDescription">
              ${event.description || "No description"}
            </p>

            <div class="eventActions">
              <button class="editBtn" data-id="${event.id}">Edit Event</button>
              <button class="deleteBtn" data-id="${
                event.id
              }">Delete Event</button>
            </div>
          </div>

        `;

        eventContainer.appendChild(eventCard);
        const editBtn = eventCard.querySelector(".editBtn");
        console.log(editBtn);
        editBtn.addEventListener("click", () => {
          editEvent(event.id, event);
          console.log("edit button clicked");
        });
        const deleteBtn = eventCard.querySelector(".deleteBtn");
        console.log(deleteBtn);
        deleteBtn.addEventListener("click", () => {
          deleteEvent(event.id);
          console.log("delete button clicked");
        });
      });
    });
}

function editEvent(id, eventData) {
  const btn = document.querySelector(".editBtn");
  console.log(btn);

  //propmt user to update the event
  const updatedName = prompt("Enter new event name", eventData.name);
  const updatedCategory = prompt(
    "Enter new event category",
    eventData.Category
  );
  // this one ensures  it updates the event with the new name and category or leve it if nothing is changed
  const updatedEvent = {
    ...eventData,
    name: updatedName || eventData.name,
    Category: updatedCategory || eventData.Category,
  };

  console.log("editbutton clicked");
  fetch(`http://localhost:3001/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  })
    .then((res) => res.json())
    .then((events) => {
      alert("event updated successfuly");
      console.log("event updated");
      displayEvent();
    });
}

function deleteEvent(id) {
  const confirmDelete = confirm("Are you sure you want to delete this event?"); //propmt user to confirm delete
  //if user cancels delete it stops if ok it continues
  if (!confirmDelete) {
    return;
  }
  fetch(`http://localhost:3001/events/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      alert("event deleted successfuly");
      console.log("event deleted");
      displayEvent();
    }
  });
}
//button scroll
function btnScroll() {
  const scrollBtn = document.getElementById("goEvent");
  scrollBtn.addEventListener("click", () => {
    const section = document.getElementById("addEvent");
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    console.log("scroll button clicked");
  });
}
