document.addEventListener("DOMContentLoaded", function () {
  displayEvent();
  pastEvents(); //display all events
});

function displayEvent() {
  fetch("http://localhost:3001/events")
    .then((res) => res.json())
    .then((events) => {
      const currentDate = new Date();
      console.log("Current date:", currentDate);

      const eventContainer = document.querySelector(".eventsContainer");

      if (!eventContainer) {
        console.error("No container with class .eventsContainer found!");
        return;
      }

      eventContainer.innerHTML = ""; // Clear once before loop

      events.forEach((event) => {
        const eventDate = new Date(event.date);
        console.log("Event date:", eventDate);

        // Only show upcoming events (future or today)
        if (eventDate >= currentDate) {
          const eventCard = document.createElement("div");
          eventCard.classList.add("eventCard");

          eventCard.innerHTML = `
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
                  <span>${event.category || "No Category Chosen"}</span>
                </div>
                <p class="eventDescription">
                  ${event.description || "No description"}
                </p>
                <div class="eventActions">
                  <button class="editBtn">Book Event</button>
                </div>
                <div class="moreContent" style="display: none;">
                  <form class="myForm">
                    <input type="text" placeholder="Enter your name" />
                    <input type="email" placeholder="Enter your email" />
                    <input type="text" placeholder="Enter your phone number" />
                    <input type="number" placeholder="Enter number of tickets" />
                    <label for="terms">I agree to the terms and conditions</label><br />
                    <input type="checkbox" id="terms" required />
                    <input type="submit" value="Book Event" />
                  </form>
                </div>
              </div>
            `;

          console.log("Appending event card:", eventCard);
          eventContainer.appendChild(eventCard);
        }
      });

      bookfn();
    });
}

function bookfn() {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("editBtn")) {
      const eventCard = event.target.closest(".eventCard");
      const moreContent = eventCard.querySelector(".moreContent");

      if (moreContent) {
        const isVisible = moreContent.style.display === "block";
        moreContent.style.display = isVisible ? "none" : "block";
        console.log("Toggled booking form");
      }
    }
  });
}

function pastEvents() {
  fetch("http://localhost:3001/events")
    .then((res) => res.json())
    .then((events) => {
      const currentDate = new Date();
      console.log("currentDate:", currentDate);

      events.forEach((event) => {
        const eventDate = new Date(event.date);
        console.log("event date", eventDate);

        if (eventDate < currentDate) {
          console.log("Past event found:", event);
          const eventContainer = document.querySelector(".pastEventContainer");
          console.log(eventContainer);

          const eventCard = document.createElement("div");
          eventCard.classList.add("pastEventCard");

          eventCard.innerHTML = `
          
              <img src="${event.image}" alt="Event Image" />
            <div class="pastEventContent">
              <h3>${event.name}</h3>
  
              <div class="pastEventInfo">
                <i class="far fa-calendar"></i>
                <span>${event.date || "No date"} •   ${event.time || ""}</span>
              </div>
  
              <div class="pastEventInfo">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.location}</span>
              </div>
              <div class="pastEventInfo">
                <i class="fas fa-user"></i>
                <span>${event.organizer || "No organisers"}</span>
              </div>
              <div class="pastEventInfo">
                <i class="fas fa-users"></i>
                <span>${event.capacity} people</span>
              </div>
              <div class="pastEventInfo">
                <i class="fas fa-tags"></i>
                <span>${event.category || "No Category Chosen"}</span>
              </div>
              <p class="pastEventDescription">
                ${event.description || "No description"}
              </p>
              </div>
          `;
          console.log("Appending card:", eventCard);

          eventContainer.appendChild(eventCard);
        }
      });
    });
}
//button scroll
