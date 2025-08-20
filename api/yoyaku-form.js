// 【APIフォルダ内yoyaku-form.js】
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycbzKQ4-J2TASlIj-1VbIxQJgjTAJ2vM30mtWdhOrCMaspeqvra99PHjvzHMgdWPxnle33A/exec";

  // FormDataを作成
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(req.body)) {
    params.append(key, value);
  }

  try {
    // Content-Typeをapplication/x-www-form-urlencodedとして送信
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: params,
    });

    const text = await gasRes.text();
    console.log("GASレスポンス:", text);

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