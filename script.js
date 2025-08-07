// 仮の選択日時（カレンダーUIから取得する値に置き換えてください）
const selectedDate = "2025年8月10日";
const selectedTime = "14:00";

// 表示に反映
document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;

// 送信処理
document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  formData.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

  fetch("YOUR_SCRIPT_URL_HERE", {
    method: "POST",
    body: formData
  })
  .then(res => res.ok ? alert("予約を送信しました！") : alert("送信に失敗しました"))
  .catch(err => alert("エラーが発生しました"));
});