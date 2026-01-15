export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac/i.test(ua)) os = "MacOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  return {
    device: isMobile ? "📱 Mobile" : "💻 Desktop",
    os,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
  };
};
