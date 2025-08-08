// URLパラメータから選択日時を取得
const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date");
const selectedTime = params.get("time");

// 表示に反映
if (selectedDate && selectedTime) {
  document.getElementById("selectedDateTime").textContent = `${selectedDate} ${selectedTime}`;
}

// 送信処理（Content-Typeを明示）
document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = new URLSearchParams();

  // FormDataの各項目をURLSearchParamsに変換
  for (const [key, value] of formData.entries()) {
    data.append(key, value);
  }

  // 選択日時を追加
  data.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

  fetch("https://script.google.com/macros/s/AKfycbx0kN0NxO5GqX2lXchSGpSJZv8hL0QdmL07zc2Fyq3EGyhquG7LdkagneoShTOpSJzFxQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString()
  })
  .then(res => {
    if (res.ok) {
      alert("予約を送信しました！");
      form.reset();
      document.getElementById("selectedDateTime").textContent = "未選択";
    } else {
      alert("送信に失敗しました");
    }
  })
  .catch(err => {
    console.error("送信エラー:", err);
    alert("エラーが発生しました");
  });
});