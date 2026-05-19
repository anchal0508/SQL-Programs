const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Expense form...');

    const { amount, details, category } = event.target;
    const newUser = {
        amount: amount.value,
        details: details.value,
        category: category.value
    };
    try {
        const response = await axios.post('http://localhost:3000/expenses/add', newUser);
        console.log(response.data.message);
        displayOnScreen(response.data.data)
        event.target.reset();
    } catch (error) {
        console.log("form can not be send to backedn: " + error.message);
    }
}



window.addEventListener('DOMContentLoaded', async () => {
    try {
        const exp = await axios.get('http://localhost:3000/expenses/allexp');
        const expense = exp.data;

        expense.forEach((ex) => {
            displayOnScreen(ex);
        })
    } catch (error) {
        console.log(error.message);
    }
});


function displayOnScreen(expense) {
    const ul = document.getElementById('exp-list');
    const content = `
    <span> ${expense.expid} </span>
    <span> ${expense.amount} </span>
    <span> ${expense.details} </span>
    <span> ${expense.category} </span>
    `
    const li = newElement('li', content, 'list-item');

    const deleteButton = newElement('button', 'Delete', 'btn', () => { deleteExp(expense, li) });
    li.appendChild(deleteButton);
    ul.appendChild(li);
}


const deleteExp = async (expense, li) => {
    li.remove();
    try {
        await axios.delete(`http://localhost:3000/expenses/delete/${expense.expid}`);
    } catch (error) {
        console.log(error.message);
    }
}

const newElement = (tagName, content, className, onclick) => {
    const element = document.createElement(tagName);
    if (content) element.innerHTML = content;
    if (className) element.className = className;
    if (typeof onclick === 'function') element.onclick = onclick;
    return element;
}
