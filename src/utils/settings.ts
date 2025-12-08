/**
 * Global settings that affect the possible setting for the mission
 * are saved to the browser cookies.
 */

export let minSpeed = 1; // m/s
export let maxSpeed = 15; // m/s
export let minAltitude = 10; // Meters
export let maxAltitude = 100; // Meters
export let minVertical = 2; // Meters
export let maxVertical = 5; // Meters
export let minHorizontal = 2; // Meters
export let maxHorizontal = 5; // Meters

// Max speed (Default: 1 m/s)
export const saveMinSpeed = (newValue: number) => {
  minSpeed = newValue;
}
// Max speed (Default: 15 m/s)
export const saveMaxSpeed = (newValue: number) => {
  maxSpeed = newValue;
}
// Min altitude (Default: 10 m)
export const saveMinAltitude = (newValue: number) => {
  minAltitude = newValue;
}
// Max altitude (Default: 100m)
export const saveMaxAltitude = (newValue: number) => {
  maxAltitude = newValue;
}
// Min vertical separation between the drones (Default: 2m)
export const saveMinVertical = (newValue: number) => {
  minVertical = newValue;
}
// Max vertical separation between the drones (Default: 5m)
export const saveMaxVertical= (newValue: number) => {
  maxVertical = newValue;
}
// Min horizontal separation between the drones (Default: 2m)
export const saveMinHorizontal = (newValue: number) => {
  minHorizontal = newValue;
}
// Max horizontal separation between the drones (Default: 5m)
export const saveMaxHorizontal = (newValue: number) => {
  maxHorizontal = newValue;
}

// Save system settings
export const saveSettings = () => {
  sessionStorage.setItem("min_speed", minSpeed.toString());
  sessionStorage.setItem("max_speed", maxSpeed.toString());
  sessionStorage.setItem("min_altitude", minAltitude.toString());
  sessionStorage.setItem("max_altitude", maxAltitude.toString());
  sessionStorage.setItem("min_vertical", minVertical.toString());
  sessionStorage.setItem("min_vertical", maxVertical.toString());
  sessionStorage.setItem("min_horizontal", minHorizontal.toString());
  sessionStorage.setItem("min_horizontal", maxHorizontal.toString());
}

// Load system settings on load
export const loadSettings = () => {
  minSpeed = +(sessionStorage.getItem("min_speed") ?? minSpeed);
  maxSpeed = +(sessionStorage.getItem("max_speed") ?? maxSpeed);
  minAltitude = +(sessionStorage.getItem("min_altitude") ?? minAltitude);
  maxAltitude = +(sessionStorage.getItem("max_altitude") ?? maxAltitude);
  minVertical = +(sessionStorage.getItem("min_vertical") ?? minVertical);
  maxVertical = +(sessionStorage.getItem("min_vertical") ?? maxVertical);
  minHorizontal = +(sessionStorage.getItem("min_horizontal") ?? minHorizontal);
  maxHorizontal = +(sessionStorage.getItem("min_horizontal") ?? maxHorizontal);
}