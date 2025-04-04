document.addEventListener("DOMContentLoaded", function () {
  addEvent(); //add an event
  displayEvent(); //display all events
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
    const organiser = document.getElementById("eventOrganiser").value;
    const capacity = document.getElementById("eventCapacity").value;
    const location = document.getElementById("eventLocation").value;
    const description = document.getElementById("eventDescription").value;

    //create a new event\
    const newEvent = {
      name,
      Category,
      date,
      organiser,
      capacity,
      location,
      description,
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
              <span>${event.organizer}</span>
            </div>
            <div class="eventInfo">
              <i class="fas fa-users"></i>
              <span>${event.capacity} people</span>
            </div>
            <div class="eventInfo">
              <i class="fas fa-tags"></i>
              <span>${event.Category || "No organiser"}</span>
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
        eventContainer.innerHTML += eventCard.innerHTML;
        console.log(eventCard.innerHTML);
        editButton();
        // eventContainer.appendChild(eventCard);
      });
    });
}
function editButton() {
  const btn = document.querySelector(".editBtn");
  console.log(btn);

  btn.addEventListener("click", () => {
    console.log("editbutton clicked");
    fetch("http://localhost:3001/events", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        Category,
        date,
        organiser,
        capacity,
        location,
        description,
      }),
    })
      .then((res) => res.json())
      .then((events) => {
        alert("event updated successfuly");
        console.log("event updated");
      });
  });
}
