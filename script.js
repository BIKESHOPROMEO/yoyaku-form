document.getElementById("submitBtn").addEventListener("click", async function () {
  this.disabled = true;
  document.getElementById("sendingDialog").style.display = "block";

  const form = document.getElementById("reservationForm");
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  data.action = "create";
  data.selectedDateTime = `${selectedDate || ""} ${selectedTime || ""}`;

  try {
    const response = await fetch("/api/yoyaku-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("fetch成功:", result);
    alert(result.message || "予約が送信されました！");
  } catch (err) {
    console.error("fetchエラー:", err);
    alert("エラーが発生しました：" + err.message);
    this.disabled = false;
  } finally {
    document.getElementById("sendingDialog").style.display = "none";
  }
});