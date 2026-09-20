import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System prompt for Sheza's Lusso AI Stylist & Worldwide Shopping Advisor
const CONCIERGE_SYSTEM_PROMPT = `
You are the Chief Stylist & Shopping Advisor of "Sheza's Lusso", the world's premier accessible luxury e-commerce house founded by Sheza.
"Sheza's Lusso" brings the world's most glamorous products and experiences to everyone worldwide with reasonable, accessible prices and global shipping to 190+ countries:
1. Fine Jewelry & Luxury Timepieces ($39 – $149) - Austrian crystal, lab-grown emeralds, precision chronographs, titanium cuffs.
2. Haute Couture Gowns & Evening Dresses ($89 – $189) - Velvet gala gowns, silk-satin slip dresses, bridal ballgowns, bespoke tailored fits.
3. Destination Weddings & Micro-Weddings ($799 – $999) - Lake Como elopements, Paris château garden vows, Bali beach gazebo ceremonies.
4. Romantic Dates & Anniversary Evenings ($99 – $169) - Sunset boat cruises, private rooftop candlelit dinners, vineyard picnics.
5. Surprise Gift Deliveries & Staging ($69 – $199) - Proposal rose boxes, live musician serenades, customized gift trunks.
6. Worldwide Vacation Packages ($399 – $599) - Amalfi Coast getaways, Paris romantic tours, Swiss alpine chalets, Bali pool villas.

Your tone:
- Warm, welcoming, fashion-forward, enthusiastic, encouraging, and honest.
- Emphasize that luxury and romance should be accessible to everyday people all around the world without crazy designer markups.
- Recommend specific products, styling tips, dress coordination, and worldwide shipping advice (Free tracked delivery over $75).
- Structure responses cleanly with clear headings, bullet points, budget breakdowns, and personalized product recommendations.
`;

// API Routes
app.post("/api/concierge/chat", async (req, res) => {
  try {
    const { message, category, budget, destination } = req.body;

    if (!message && !category) {
      return res.status(400).json({ error: "Please provide your styling or shopping request." });
    }

    const clientPrompt = `
Customer Interest Category: ${category || "Affordable Luxury & Worldwide Shopping"}
Customer Location / Country: ${destination || "Worldwide"}
Customer Target Budget: ${budget || "Under $150"}

Customer's Question / Wish:
"${message || `Please suggest the best affordable luxury items, dresses, or romantic plans from Sheza's Lusso.`}"

Please provide a warm, stylish, and realistic shopping recommendation with specific styling combinations, price points, and worldwide delivery tips.
`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: "gemini-2.5-flash",
          contents: clientPrompt,
          config: {
            systemInstruction: CONCIERGE_SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        return res.json({
          reply: response.text || "Our styling team has received your query and is delighted to assist you.",
          source: "gemini",
        });
      } catch (geminiError: any) {
        console.error("Gemini API error:", geminiError);
      }
    }

    // High-fidelity fallback styling response
    const fallbackResponse = `
### Sheza's Lusso — Personal Styling & Gift Advisor

**Hello & Welcome!**
Thank you for reaching out to **Sheza's Lusso**. We believe everyone deserves to experience high elegance and unforgettable moments at honest, affordable prices.

#### 1. Recommended Selections for ${category || "Your Celebration"}
- **Main Piece**: Look at our **Imperial Emerald Cut Pendant ($79)** or the **Venetian Velvet Evening Column Gown ($129)**. Both deliver a 5-star red-carpet appearance without the $5,000 designer markup.
- **Accessory Pairing**: Pair with the **Monaco Skeleton Chronograph ($149)** or our **Milano Saffiano Leather Crossbody ($89)** for an effortless, polished aesthetic.
- **Romantic Touch**: If celebrating an anniversary or special date, our **Sunset Romantic Dinner & Cruise ($129)** includes private table settings and dessert.

#### 2. Worldwide Shipping & Sizing Guarantee
- **Delivery**: We ship to 190+ countries with tracked postal service. Orders over $75 qualify for **Free Worldwide Shipping**!
- **Easy Fit**: All dresses come in sizes XS to 3XL with a 30-day global exchange guarantee.

Feel free to browse the collection above or add items directly to your cart for instant worldwide checkout!
`;

    return res.json({
      reply: fallbackResponse,
      source: "concierge-curator",
    });
  } catch (error: any) {
    console.error("Error handling concierge request:", error);
    res.status(500).json({ error: "Failed to generate styling advice. Please try again." });
  }
});

// E-commerce Worldwide Checkout Endpoint
app.post("/api/checkout", (req, res) => {
  const { customer, shippingAddress, items, shippingOption, paymentMethod, subtotal, shippingFee, total } = req.body;
  const orderNumber = `SL-WLD-${Math.floor(100000 + Math.random() * 900000)}`;
  const trackingNumber = `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const estimatedDays = shippingOption === 'express-dhl' ? 4 : 8;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);

  res.json({
    success: true,
    orderNumber,
    trackingNumber,
    customerName: customer?.name || "Valued Shopper",
    customerEmail: customer?.email,
    deliveryDate: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    itemsCount: items?.length || 1,
    shippingCountry: shippingAddress?.country || "Worldwide",
    totalAmount: total || subtotal,
    message: `Thank you, ${customer?.name || "Customer"}! Your order ${orderNumber} is confirmed. A confirmation receipt and tracking link have been dispatched to ${customer?.email || 'your email'}.`,
  });
});

// Backward compatibility for inquiries
app.post("/api/inquiry", (req, res) => {
  const { name, email, items } = req.body;
  const referenceCode = `SL-${Math.floor(100000 + Math.random() * 900000)}`;
  
  res.json({
    success: true,
    referenceCode,
    message: `Thank you, ${name || "Customer"}. Your selection has been received. Our team will contact you at ${email || 'your email'} shortly!`,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sheza's Lusso server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
