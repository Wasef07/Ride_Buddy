const express = require("express");
const axios = require("axios");
const { getBuses } = require("../services/busService");

const router = express.Router();

/**
 * @route GET /api/buses
 * @desc  Get all active buses
 */
router.get("/", (req, res) => {
  res.json(getBuses());
});

/**
 * @route GET /api/buses/eta
 * @desc  Get ETA from bus to stop (using ORS if available, fallback to haversine)
 * @query busLat, busLon, stopLat, stopLon
 */
router.get("/eta", async (req, res) => {
  const { busLat, busLon, stopLat, stopLon } = req.query;

  // Validate inputs
  if (!busLat || !busLon || !stopLat || !stopLon) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  const orsKey = process.env.ORS_API_KEY;

  try {
    if (orsKey) {
      // 🔹 Use OpenRouteService
      const response = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key: orsKey,
            start: `${busLon},${busLat}`, // ORS requires lon,lat order
            end: `${stopLon},${stopLat}`,
          },
          timeout: 8000,
        }
      );

      const durationSeconds =
        response.data?.features?.[0]?.properties?.segments?.[0]?.duration;

      if (!durationSeconds) throw new Error("Invalid ORS response");

      let etaMinutes = Math.round(durationSeconds / 60);

      // 🔹 Simulate delays
      const status = Math.random() < 0.3 ? "delayed" : "on-time";
      if (status === "delayed") {
        etaMinutes += Math.floor(Math.random() * 10) + 5; // +5–15 mins
      }

      return res.json({
        etaMinutes,
        status,
        source: "ors",
      });
    }

    throw new Error("ORS API key missing");
  } catch (error) {
    console.error("[/eta] error:", error.response?.data || error.message);

    // 🔹 Fallback: haversine formula
    const haversineKm = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth radius in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const distKm = haversineKm(
      parseFloat(busLat),
      parseFloat(busLon),
      parseFloat(stopLat),
      parseFloat(stopLon)
    );

    const avgSpeed = 30; // km/h
    let etaMinutes = Math.max(1, Math.round((distKm / avgSpeed) * 60));

    const status = Math.random() < 0.3 ? "delayed" : "on-time";
    if (status === "delayed") {
      etaMinutes += Math.floor(Math.random() * 10) + 5;
    }

    return res.json({
      etaMinutes,
      status,
      source: "haversine",
    });
  }
});

module.exports = router;
