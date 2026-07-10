const API_KEY = "YOUR_PRIVATE_API_KEY";
const LIST_ID = "YOUR_LIST_ID";

const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Klaviyo-API-Key ${API_KEY}`,
  Revision: "2024-10-15",
};

function createProfilePayload(contact, answers) {
  return {
    data: {
      type: "profile",
      attributes: {
        email: contact.email,
        first_name: contact.name,
        phone_number: contact.phone,
        properties: {
          ...answers,
        },
      },
    },
  };
}

function createListPayload(contact) {
  return {
    data: [
      {
        type: "profile",
        attributes: {
          email: contact.email,
        },
      },
    ],
  };
}

async function createProfile(payload) {
  console.log("%cKLAVIYO PROFILE", "color:#6C2BD9;font-weight:bold", payload);

  // Uncomment for real credentials
  /*
  return fetch("https://a.klaviyo.com/api/profiles/", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload),
  });
  */
}

async function subscribeProfileToList(payload) {
  console.log("%cKLAVIYO LIST", "color:#6C2BD9;font-weight:bold", payload);

  // Uncomment for real credentials
  /*
  return fetch(
    `https://a.klaviyo.com/api/lists/${LIST_ID}/relationships/profiles`,
    {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(payload),
    }
  );
  */
}

export async function subscribeToKlaviyo(contact, answers) {
  try {
    const profilePayload = createProfilePayload(contact, answers);
    await createProfile(profilePayload);

    const listPayload = createListPayload(contact);
    await subscribeProfileToList(listPayload);

    console.log("%cKlaviyo Success", "color:green;font-weight:bold");
  } catch (error) {
    console.error("Klaviyo Error:", error);
  }
}