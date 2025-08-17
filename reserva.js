export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(req.body)) {
    params.append(key, value);
  }

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzKQ4-J2TASlIj-1VbIxQJgjTAJ2vM30mtWdhOrCMaspeqvra99PHjvzHMgdWPxnle33A/exec", {
      method: "POST",
      body: params,
    });

    res.status(200).json({ message: "�\�񂪑��M����܂����I" });
  } catch (error) {
    console.error("GAS���M�G���[:", error);
    res.status(500).json({ message: "���M�Ɏ��s���܂����B" });
  }
}