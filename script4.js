let totalExpense = 0;

let savedExpenses = JSON.parse(localStorage.getItem("expenses"));
let expenses = savedExpenses || [];

if (savedExpenses) {
  for (let expense of savedExpenses) {
    let newExpense = document.createElement("div");

    newExpense.innerText =
      `${expense.name} - Rs ${expense.amount} - ${expense.category} - ${expense.date}`;

    newExpense.classList.add("expense-item");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    newExpense.appendChild(deleteBtn);

    document.getElementById("expense-list").prepend(newExpense);

    totalExpense += Number(expense.amount);

    deleteBtn.addEventListener("click", function () {
      expenses = expenses.filter(
        (item) =>
          !(
            item.name === expense.name &&
            item.amount === expense.amount &&
            item.category === expense.category &&
            item.date === expense.date
          )
      );

      localStorage.setItem("expenses", JSON.stringify(expenses));

      totalExpense -= Number(expense.amount);

      document.getElementById(
        "total"
      ).innerText = `Total Expense: Rs ${totalExpense}`;

      newExpense.remove();
    });
  }
}

document.getElementById(
  "total"
).innerText = `Total Expense: Rs ${totalExpense}`;

document.getElementById("addBtn").addEventListener("click", function () {
  let expenseName = document.getElementById("expenseName").value.trim();
  let expenseAmount = document.getElementById("expenseAmount").value;
  let category = document.getElementById("category").value;
  let expenseDate = document.getElementById("expenseDate").value;
  let error = document.getElementById("error");

  if (
    expenseName === "" ||
    expenseAmount === "" ||
    expenseDate === ""
  ) {
    error.innerText = "Please fill in all fields.";
    return;
  }

  if (!isNaN(expenseName)) {
    error.innerText = "Expense name cannot contain only numbers.";
    return;
  }

  if (Number(expenseAmount) <= 0) {
    error.innerText = "Please enter a valid expense amount.";
    return;
  }

  error.innerText = "";

  let expense = {
    name: expenseName,
    amount: expenseAmount,
    category: category,
    date: expenseDate,
  };

  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  totalExpense += Number(expenseAmount);

  document.getElementById(
    "total"
  ).innerText = `Total Expense: Rs ${totalExpense}`;

  let newExpense = document.createElement("div");

  newExpense.innerText =
    `${expenseName} - Rs ${expenseAmount} - ${category} - ${expenseDate}`;

  newExpense.classList.add("expense-item");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  newExpense.appendChild(deleteBtn);

  document.getElementById("expense-list").prepend(newExpense);

  deleteBtn.addEventListener("click", function () {
    totalExpense -= Number(expenseAmount);

    document.getElementById(
      "total"
    ).innerText = `Total Expense: Rs ${totalExpense}`;

    expenses = expenses.filter(
      (item) =>
        !(
          item.name === expenseName &&
          item.amount === expenseAmount &&
          item.category === category &&
          item.date === expenseDate
        )
    );

    localStorage.setItem("expenses", JSON.stringify(expenses));

    newExpense.remove();
  });

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDate").value = "";
  document.getElementById("category").selectedIndex = 0;
});