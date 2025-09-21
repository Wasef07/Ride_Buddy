// Bus DATASET (20+ buses across WB)
// ----------------------------------------------------------------------
let buses = [
  // --- Kolkata City ---
  {
    id: 1,
    name: "Route 101 🚌 Esplanade → Salt Lake",
    lat: 22.5726,
    lon: 88.3639,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.5726, 88.3639], // Esplanade
      [22.5769, 88.3460], // Shyambazar
      [22.5892, 88.3746], // Sealdah
      [22.5958, 88.4031], // Salt Lake
    ],
  },
  {
    id: 2,
    name: "Route 102 🚌 Park Street → Jadavpur",
    lat: 22.5600,
    lon: 88.3700,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.5600, 88.3700], // Park Street
      [22.5455, 88.3654], // Gariahat
      [22.5320, 88.3468], // Tollygunge
      [22.5100, 88.3420], // Jadavpur
    ],
  },
  {
    id: 3,
    name: "Route 103 🚌 Howrah → Dharmatala",
    lat: 22.58,
    lon: 88.39,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.5800, 88.3900], // Howrah Station
      [22.5750, 88.3600], // Burrabazar
      [22.5726, 88.3639], // Esplanade
    ],
  },
  {
    id: 4,
    name: "Route 104 🚌 Kalighat → Shyambazar",
    lat: 22.55,
    lon: 88.35,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.5500, 88.3500], // Kalighat
      [22.5600, 88.3600], // Rashbehari
      [22.5769, 88.3460], // Shyambazar
    ],
  },
  {
    id: 5,
    name: "Route 105 🚌 Dum Dum → Salt Lake",
    lat: 22.62,
    lon: 88.42,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.6200, 88.4200], // Dum Dum
      [22.5958, 88.4031], // Salt Lake
    ],
  },

  // --- Siliguri ---
  {
    id: 6,
    name: "Route 201 🚌 NJP → Siliguri Junction",
    lat: 26.6760,
    lon: 88.4310,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [26.6760, 88.4310], // NJP
      [26.7271, 88.3953], // Siliguri Junction
    ],
  },
  {
    id: 7,
    name: "Route 202 🚌 Siliguri → Bagdogra",
    lat: 26.7271,
    lon: 88.3953,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [26.7271, 88.3953], // Siliguri
      [26.6996, 88.3110], // Bagdogra
    ],
  },

  // --- Durgapur ---
  {
    id: 8,
    name: "Route 301 🚌 City Center → Benachity",
    lat: 23.5500,
    lon: 87.3200,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [23.5500, 87.3200], // City Center
      [23.5400, 87.3000], // Benachity
    ],
  },
  {
    id: 9,
    name: "Route 302 🚌 Durgapur → Andal",
    lat: 23.5200,
    lon: 87.2800,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [23.5200, 87.2800], // Durgapur
      [23.6000, 87.2000], // Andal
    ],
  },

  // --- Asansol ---
  {
    id: 10,
    name: "Route 401 🚌 Asansol → Raniganj",
    lat: 23.6800,
    lon: 86.9900,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [23.6800, 86.9900], // Asansol
      [23.6200, 87.1300], // Raniganj
    ],
  },
  {
    id: 11,
    name: "Route 402 🚌 Asansol → Durgapur",
    lat: 23.6800,
    lon: 86.9900,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [23.6800, 86.9900], // Asansol
      [23.5200, 87.2800], // Durgapur
    ],
  },

  // --- Malda ---
  {
    id: 12,
    name: "Route 501 🚌 Malda Town → English Bazar",
    lat: 25.0000,
    lon: 88.1500,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [25.0000, 88.1500], // Malda Town
      [25.0100, 88.1400], // English Bazar
    ],
  },

  // --- Kharagpur ---
  {
    id: 13,
    name: "Route 601 🚌 Kharagpur Station → IIT KGP",
    lat: 22.3300,
    lon: 87.3200,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.3300, 87.3200], // Kharagpur
      [22.3200, 87.3000], // IIT Kharagpur
    ],
  },
  {
    id: 14,
    name: "Route 602 🚌 Kharagpur → Midnapore",
    lat: 22.3300,
    lon: 87.3200,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.3300, 87.3200], // Kharagpur
      [22.4200, 87.3200], // Midnapore
    ],
  },

  // --- Bardhaman ---
  {
    id: 15,
    name: "Route 701 🚌 Bardhaman → Kalna",
    lat: 23.2400,
    lon: 87.8600,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [23.2400, 87.8600], // Bardhaman
      [23.2000, 88.3700], // Kalna
    ],
  },

  // --- Haldia ---
  {
    id: 16,
    name: "Route 801 🚌 Haldia → Nandakumar",
    lat: 22.0667,
    lon: 88.0690,
    currentIndex: 0,
    direction: 1,
    progress: 0,
    route: [
      [22.0667, 88.0690], // Haldia
      [22.0500, 87.9700], // Nandakumar
    ],
  },
];

module.exports = buses;