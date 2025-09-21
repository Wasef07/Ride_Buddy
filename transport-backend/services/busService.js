// services/busService.js
let buses = require("../data/buses");

// Function for smooth interpolation movement
function moveBuses() {
  buses = buses.map((bus) => {
    let nextIndex = bus.currentIndex + bus.direction;

    if (nextIndex >= bus.route.length) {
      bus.direction = -1;
      nextIndex = bus.route.length - 2;
      bus.progress = 0;
    }
    if (nextIndex < 0) {
      bus.direction = 1;
      nextIndex = 1;
      bus.progress = 0;
    }

    const [lat1, lon1] = bus.route[bus.currentIndex];
    const [lat2, lon2] = bus.route[nextIndex];

    // 🔹 Increase progress slowly for smooth motion
    bus.progress += 0.01; // smaller = smoother, adjust speed
    if (bus.progress >= 1) {
      bus.progress = 0;
      bus.currentIndex = nextIndex;
    }

    // 🔹 Interpolated position
    const lat = lat1 + (lat2 - lat1) * bus.progress;
    const lon = lon1 + (lon2 - lon1) * bus.progress;

    return { ...bus, lat, lon };
  });

  return buses;
}

function getBuses() {
  return buses;
}

// In busService.js
function applyDelays(buses) {
  return buses.map((bus) => {
    const isDelayed = Math.random() < 0.3; // 30% buses delayed
    const delayMinutes = isDelayed ? Math.floor(Math.random() * 10) + 5 : 0; 

    return {
      ...bus,
      status: isDelayed ? "Delayed" : "On Time",
      delayMinutes,
    };
  });
}

function getBusesWithDelays() {
  return applyDelays(buses);
}

module.exports = { moveBuses, getBuses: getBusesWithDelays };

