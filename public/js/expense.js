const API_LINK = "http://localhost:3000/expenses"

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get(API_LINK);
        response.data.forEach(exp => {
            displayOnScreen(exp);
        });
    } catch (error) {
        console.log(error.message);
    }
})


const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted...");
    const { expenseOn, amount } = event.target;

    const addExpense = {
        expenseOn: expenseOn.value,
        amount: amount.value
    };
    try {
        const response = await axios.post(`${API_LINK}/add`, addExpense);
        displayOnScreen(response.data);
    } catch (error) {
        console.log(error.message);
    }
    event.target.reset();
}

function displayOnScreen(expense) {
    const ul = document.getElementById("expense-list");
    const content = `
        <span> ${expense.expenseOn} </span> 
        <span> ${expense.amount} </span> 
    `;
    const li = newElement('li', content, 'list-item');

    const deleteBtn = newElement('button', "Delete", 'list-btn', () => deleteExpense(expense.id, li));
    const editBtn = newElement('button', "Edit", 'list-btn', () => editExpense(expense.id, expense.expenseOn, expense.amount, li));




    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);

}


const newElement = (tagName, content, className, onclick) => {
    const element = document.createElement(tagName);

    if (content) element.innerHTML = content;
    if (className) element.className = className;
    if (typeof onclick === 'function') element.onclick = onclick;
    return element;
}



let editId = null;

async function deleteExpense(id, li) {
    try {
        li.remove();
        await axios.delete(`${API_LINK}/delete/${id}`);

        const liElement = document.getElementById(`expense-${id}`);
        if (liElement) liElement.remove();

        console.log("Expense deleted successfully");
    } catch (error) {
        console.log("Delete Error:", error.message);
    }
}

function editExpense(id, expenseOn, amount, li) {

    li.remove();
    document.getElementById('expenseOn').value = expenseOn;
    document.getElementById('amount').value = amount;

    editId = id;

    document.querySelector('button[type="submit"]').innerText = "Update Expense";
}