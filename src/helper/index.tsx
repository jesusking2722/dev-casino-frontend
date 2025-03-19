import axios from "axios";

export const formatDate = (date: string | number | Date): string => {
  const givenDate = new Date(date);
  const now = new Date();
  const diff = Math.abs(now.getTime() - givenDate.getTime()) / 1000; // Difference in seconds

  const days = Math.floor(diff / (3600 * 24));
  const hours = Math.floor((diff % (3600 * 24)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  return `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const formatUpercaseLetter = (value: string) => {
  return value.toUpperCase();
};

export const getCountryWithGeoPlugin = async () => {
  try {
    const response = await axios.get("http://www.geoplugin.net/json.gp");
    const countryCode = response.data.geoplugin_countryCode;
    console.log(countryCode);
    return countryCode;
  } catch (error) {
    console.error("Error detecting country code:", error);
    return null;
  }
};
