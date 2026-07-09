const API_KEY = "YOUR_PRIVATE_API_KEY";
const LIST_ID = "YOUR_LIST_ID";

export async function subscribeToKlaviyo(contact, answers) {
    const profilePayload = {
        data: {
            type: "profile",
            attributes: {
                email: contact.email,
                first_name: contact.firstName,
                phone_number: contact.phone,
                properties: {
                    ...answers
                }
            }
        }
    };

    //Creating Klaviyo profile
    console.log(profilePayload);

    /*
    await fetch("https://a.klaviyo.com/api/profiles/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Klaviyo-API-Key ${API_KEY}`,
            Revision: "2024-10-15"
        },
        body: JSON.stringify(profilePayload)
    });
    */

    const listPayload = {
        data: [
            {
                type: "profile",
                attributes: {
                    email: contact.email
                }
            }
        ]
    };

    // Subscribing profile to list
    console.log(listPayload);

    /*
    await fetch(`https://a.klaviyo.com/api/lists/${LIST_ID}/relationships/profiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Klaviyo-API-Key ${API_KEY}`,
                Revision: "2024-10-15"
            },
            body: JSON.stringify(listPayload)
        }
    );
    */
}