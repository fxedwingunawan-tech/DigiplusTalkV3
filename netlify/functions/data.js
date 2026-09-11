const { connectLambda, getStore } = require("@netlify/blobs");

// Samakan nilai ini dengan API_KEY di index.html
const API_KEY = "digiplus2026";
const STORE_NAME = "digiplus-talk";
const BLOB_KEY = "data";

exports.handler = async (event) => {
  connectLambda(event);

  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (key !== API_KEY) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  const store = getStore(STORE_NAME);

  try {
    if (event.httpMethod === "GET") {
      const data = await store.get(BLOB_KEY, { type: "json" });
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data || null),
      };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "null");
      await store.setJSON(BLOB_KEY, body);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: String(err) }),
    };
  }
};
