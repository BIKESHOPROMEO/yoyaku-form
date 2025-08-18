export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwspV-0AlfTcuB3PlTMKmzot-a0b9h0Kv3zRyMpmJZWvRWorbfaNBVxNwvXm2DXMasO/exec"; // ←あなたのGAS URL

  try {
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // ?? ここで text() で受けてログ確認
    const text = await gasRes.text();
    console.log("GASレスポンス:", text);

    // JSONとして返せるか試す
    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "GASからのレスポンスがJSONではありません",
        raw: text,
      });
    }
  } catch (err) {
    console.error("Vercel Functionsエラー:", err);
    return res.status(500).json({ message: "Vercel Functionsエラー", error: err.message });
  }
}