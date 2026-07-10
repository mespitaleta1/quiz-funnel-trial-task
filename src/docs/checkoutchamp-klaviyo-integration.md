## CheckoutChamp → Klaviyo Integration Plan

Although this technical assessment focuses on the quiz implementation, below is the approach I would follow to configure the CheckoutChamp → Klaviyo integration so customers are automatically subscribed to the appropriate Klaviyo list after completing a purchase.

### 1. Configure the Klaviyo Plugin

In CheckoutChamp:

1. Navigate to **Admin → Plugins → Email Service Providers → Klaviyo**.
2. Activate the Klaviyo plugin.
3. Enter the required credentials:
   - Klaviyo Private API Key
   - API Revision
4. Enable any optional settings required by the business (custom fields, coupons, sales URL, etc.).

This establishes the connection between CheckoutChamp and Klaviyo. :contentReference[oaicite:0]{index=0}

---

### 2. Configure Campaign Routing

Campaign Routing determines **which CheckoutChamp campaign adds customers to which Klaviyo list**.

Example:

| CheckoutChamp Campaign | Klaviyo List |
|------------------------|--------------|
| Weight Loss Funnel | Weight Loss Customers |
| GLP-1 Funnel | GLP-1 Customers |
| Supplements Funnel | Supplement Customers |

Within the Klaviyo plugin:

1. Open **Campaign Routing**.
2. Click **Route +**.
3. Select:
   - CheckoutChamp Campaign
   - Target Klaviyo List
4. Save the route.

This allows different funnels to populate different Klaviyo audiences automatically instead of sending every customer to the same list. :contentReference[oaicite:1]{index=1}

---

### 3. Select the Appropriate Event Type

For this use case, I would trigger the integration using the **Placed Order** server-side event.

Reason:

- The customer has successfully completed checkout.
- Payment has already been processed.
- The customer should now enter post-purchase email flows.

CheckoutChamp also supports additional events such as:

- Started Checkout
- Ordered Product
- Fulfilled Order
- Cancelled Order
- Refunded Order

For list subscription after a completed purchase, **Placed Order** is the most appropriate trigger. :contentReference[oaicite:2]{index=2}

---

### 4. Pass Customer Information

The profile sent to Klaviyo should include:

- Email
- First Name
- Phone Number
- Order ID
- Campaign
- Purchased Products
- Any custom checkout fields required by marketing

Enabling **Send Custom Fields** allows CheckoutChamp custom fields to become Klaviyo profile properties. :contentReference[oaicite:3]{index=3}

---

### 5. Handling Multiple Products

If a customer purchases multiple products in a single order, I would avoid creating duplicate profiles or subscribing the customer to multiple unrelated lists.

Instead, I would:

- Create a single customer profile.
- Subscribe the customer to the campaign-specific list.
- Use the **Ordered Product** event data (product IDs/SKUs) to build product-specific automations inside Klaviyo.

For example:

- Purchased Product A → Send Flow A
- Purchased Product B → Send Flow B
- Purchased Products A + B → Use flow filters or conditional splits so the customer receives the relevant post-purchase experience for each product without duplicating profile creation. :contentReference[oaicite:4]{index=4}

---

### Overall Flow

```text
Customer completes purchase
            │
            ▼
CheckoutChamp
            │
            ▼
Placed Order Event
            │
            ▼
Campaign Routing
            │
            ▼
Correct Klaviyo List
            │
            ▼
Customer Profile Updated
            │
            ▼
Post-Purchase Flows Triggered
```

### Production Considerations

In a production environment I would:

- Store API credentials securely (never expose private keys in client-side code).
- Validate successful profile creation before list subscription.
- Log API failures for monitoring and retries.
- Use CheckoutChamp Campaign Routing to keep marketing audiences segmented without requiring additional custom logic.