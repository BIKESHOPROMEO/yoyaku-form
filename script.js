// URLパラメータから選択日時を取得
const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date");
const selectedTime = params.get("time");

// 表示に反映
if (selectedDate && selectedTime) {
  document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
}

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