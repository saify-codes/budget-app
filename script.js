var budget = document.querySelector("#total_budget");
var expense = document.querySelector("#expense");
var balance = document.querySelector("#balance");
var budgetInput = document.querySelector("#budget_input");
var dueDateInput = document.querySelector("#due_date");
var totalAmountInput = document.querySelector("#total_amount");
var amountInput = document.querySelector("#amount");
var taxInput = document.querySelector("#tax");
var categoryInput = document.querySelector("#category");
var button = document.querySelector("#set_budget");
var button2 = document.querySelector("#add_expense");
var wrapper = document.querySelector(".wrapper");

var totalBudget = (totalExpense = totalBalance = 0);

button.addEventListener("click", () => {
  let _budget = +budgetInput.value;
  if (_budget <= 0) {
    alert("Budget must be greater then 0");
    return;
  }
  totalBudget = _budget;
  totalBalance = totalBudget - totalExpense;
  budget.innerText = _budget;
  balance.innerText = totalBalance;
  budgetInput.value = "";
});

amountInput.addEventListener("change", setTotal);
amountInput.addEventListener("keyup", setTotal);
taxInput.addEventListener("change", setTotal);
taxInput.addEventListener("keyup", setTotal);

button2.addEventListener("click", () => {
  let inputFields = document.querySelectorAll("input:not(#budget_input)");
  for (const input of inputFields) {
    if (input.value == "") {
      alert("Fill all the fields");
      return;
    }
  }
  if (+totalAmountInput.value > 0) {
    calculate();
  } else {
    alert("Amount value cannot be 0");
    return;
  }
});

function setTotal() {
  let tax = taxInput.value;
  console.log((amountInput.value * tax) / 100);
  totalAmountInput.value = +amountInput.value + (amountInput.value * tax) / 100;
}

function calculate() {
  if (totalBudget > 0) {
    totalExpense += +totalAmountInput.value;
    totalBalance = totalBudget - totalExpense;
    expense.innerText = totalExpense;
    balance.innerText = totalBalance;
    addRecord(+totalAmountInput.value);
    dueDateInput.value = ""
    totalAmountInput.value=0
    amountInput.value = 0
    taxInput.value = 0

  } else {
    alert("Set the budget first");
  }
}

function addRecord(amount) {
  let color, background, icon;

  switch (categoryInput.value) {
    case "Restaurent & Cafe":
      color = "#ecec08";
      background = "#fcfcb8";
      icon = "fa-mug-saucer";
      break;
    case "Cloths & Shopping":
      color = "#800080";
      background = "#80008055";
      icon = "fa-tag";
      break;
    case "Credit & Loans":
      color = "#00ff62";
      background = "#00ff6255";
      icon = "fa-credit-card";
      break;
    case "Gifts Card":
      color = "#00aeff";
      background = "#00aeff55";
      icon = "fa-gift";
      break;
  }
  let html = `
    <div class="item">
        <div>
            <div class="icon" style="color:${color}; background:${background};">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div>
                <h4>${categoryInput.value}</h4>
                <small>${new Date(dueDateInput.value).toDateString()}</small>
            </div>
        </div>
        <strong>${amount}</strong>
    </div>
    `;

  wrapper.insertAdjacentHTML("afterbegin", html);
}
