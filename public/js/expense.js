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
        <button onclick="editExpense('${expense.id}', '${expense.expenseOn}', ${expense.amount} , ${li})">Edit</button>
        <button onclick="deleteExpense('${expense.id}, ${li}')">Delete</button>
    `;
    const li = newElement('li', content, 'list-item');
    ul.appendChild(li);

}


const newElement = (tagName, content, className) => {
    const element = document.createElement(tagName);
 
    if (content) element.innerHTML = content;
    if (className) element.className = className;
    return element;
}



let editId = null;

async function deleteExpense(id, li) {
    try {
      
        await axios.delete(`${API_LINK}/delete/${id}`);
        
        const liElement = document.getElementById(`expense-${id}`);
        if (liElement) liElement.remove();
        
        console.log("Expense deleted successfully");
    } catch (error) {
        console.log("Delete Error:", error.message);
    }
    location.reload(); 
}

function editExpense(id, expenseOn, amount, li) {
  
    document.getElementById('expenseOn').value = expenseOn;
    document.getElementById('amount').value = amount;
    
    editId = id; 
    
    document.querySelector('button[type="submit"]').innerText = "Update Expense";
    location.reload(); 
}