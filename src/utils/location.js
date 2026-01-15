export const getLocationInfo = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      ip: data.ip || "Unknown",
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      isp: data.org || "Unknown",
    };
  } catch {
    return { ip: "Unknown", country: "Unknown", city: "Unknown", region: "Unknown", isp: "Unknown" };
  }
};
