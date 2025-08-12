document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  if (!submitBtn) {
    console.error("submitBtn が見つかりませんでした");
    return;
  }

  // URLパラメータから選択された日時を取得
  const params = new URLSearchParams(window.location.search);
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");

  console.log("selectedDate:", selectedDate);
  console.log("selectedTime:", selectedTime);

  const formatDate = (isoDateStr) => {
    const [year, month, day] = isoDateStr.split("-");
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    const days = ["日","月","火","水","木","金","土"];
    return `${month}/${day}(${days[d.getDay()]})`;
  };

  if (selectedDate && selectedTime) {
    const formatted = `${formatDate(selectedDate)} ${selectedTime}`;
    document.getElementById("selectedDateTime").textContent = formatted;
  }

  // ? ここが唯一のイベントリスナー定義！
  submitBtn.addEventListener("click", function() {
    this.disabled = true;
    document.getElementById("sendingDialog").style.display = "block";

    const form = document.getElementById("reservationForm");
    const formData = new FormData(form);

    if (!selectedDate || !selectedTime) {
      alert("日付と時間が選択されていません");
      this.disabled = false;
      document.getElementById("sendingDialog").style.display = "none";
      return;
    }

    const form = document.getElementById("reservationForm");
const formData = new FormData(form);
formData.append("action", "create");
formData.append("selectedDateTime", `${selectedDate} ${selectedTime}`);

fetch("https://script.google.com/macros/s/AKfycbyE1-J7AqYT9v5SwHZtcC-SjH73CI11KG8jR0dES6fOkEMnZhvsx9gMplEHatxVNRaFaw/exec", {
  method: "POST",
  body: formData
})
.then(async res => {
  const text = await res.text();
  const result = JSON.parse(text);
  alert(result.message);
})
.catch(err => {
  alert("通信エラー：" + err.message);
});