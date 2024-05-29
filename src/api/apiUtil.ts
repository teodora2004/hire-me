import { ChildData } from "../interfaces";

export const fetchChildren = async (
  accessToken: string,
  groupId: string,
  institutionId: string
) => {
  try {
    const response = await fetch(
      `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching children: ${response.statusText}`);
    }

    const data = await response.json();

    // only return the necessary data
    const children = data.children.map((child: ChildData) => ({
      childId: child.childId,
      name: child.name,
      image: child.image.small,
      checkedIn: child.checkedIn,
      checkinTime: child.checkinTime,
    }));

    return children;
  } catch (error) {
    console.error("Error fetching children:", error);
    throw error;
  }
};

export const checkInChild = async (
  accessToken: string,
  childId: string,
  checkInTime: string
) => {
  try {
    const response = await fetch(
      `https://app.famly.co/api/v2/children/${childId}/checkins`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, pickupTime: checkInTime }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error checking in: ${response.statusText}.`);
    }
  } catch (error) {
    console.error("Error checking in child:", error);
    throw error;
  }
};

export const checkOutChild = async (
  accessToken: string,
  childId: string,
  checkOutTime: string
) => {
  try {
    const response = await fetch(
      `https://app.famly.co/api/v2/children/${childId}/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, pickupTime: checkOutTime }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error checking out: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error checking out child:", error);
    throw error;
  }
};
