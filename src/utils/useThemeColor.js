export const useThemeColors = (isDarkEnabled) => {
    return {
      primary: isDarkEnabled ? "#040836" : "#FFFFFF",
      secondary: isDarkEnabled ? "#EAEDF6" : "#3C4E6D",
      // background: isDarkEnabled ? "#040836" : "#111827",
      background: isDarkEnabled ? "#101c44" : "#fefefe",
      secondbackground: isDarkEnabled ? "#040836" : "#FFFF",
      layoutbg: isDarkEnabled ? "#040836" : "#070a68",
      layoutbottombg: isDarkEnabled ? "#040836" : "#f4f6f8",
      text: isDarkEnabled ? "#D3D3D3" : "#3C4E6D",
      shadowColor: isDarkEnabled ? "gray" : "gray",
      borderColor: isDarkEnabled ? "#1f2937" : "#e5e7eb",
      cardBg:isDarkEnabled ? "#101c44" : "#fff",
      secondCardBg:isDarkEnabled ? "#010844" : "#ffffff",
      thirdCardBg: isDarkEnabled ? "#101c44" : "#fff",
      inputBackground: isDarkEnabled ? "#101c44" : "#fff", 
      editbg: isDarkEnabled ? "#0d012d":"#e5f2ff",
      edittext: isDarkEnabled ? "#fff":"#131069",
      text2: isDarkEnabled ? "#fff":"#53105b",
    };
  };