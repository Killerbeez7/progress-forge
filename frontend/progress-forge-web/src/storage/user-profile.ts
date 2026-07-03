export const getUserProfile = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const userString = localStorage.getItem("user");

  if (!userString) {
    console.log("No user found.");
    return null;
  }

  try {
    const user = JSON.parse(userString);
    return user;
  } catch (error) {
    console.error("Error parsing user data", error);
    return null;
  }
};

export const saveUserProfile = (username: string) => {
  const user = {
    displayName: username,
    totalXp: 0,
    level: 1,
    currentLevelXp: 0,
    nextLevelXp: 100,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const clearUserProfile = () => {
  localStorage.removeItem("user");
};
