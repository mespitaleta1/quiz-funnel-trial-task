export function trackQuizStep({ step,questionId,answer,answers}) {
    window.dataLayer = window.dataLayer || [];
    const payload = {
        event: `quiz_step_${step}`,
        step,
        question: questionId,
        answer,
        answers
    };

    window.dataLayer.push(payload);
    console.log("%cGTM EVENT","color:green;font-weight:bold",payload);
}

export function trackLead(contact, answers) {
    const payload = {
        email: contact.email,
        first_name: contact.name,
        phone: contact.phone,
        ...answers,
    };

    if (window.fbq) {
        window.fbq("track", "Lead", payload);
    }

    console.log("%cMETA PIXEL", "color:#1877F2;font-weight:bold", payload);
}