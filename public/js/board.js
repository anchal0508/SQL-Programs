const showList = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/expenses/allexpLeader', {
            headers: { "Authorization": token }
        });

        const sortedData = response.data.sort((a, b) => {
            return (b.amount || b.total_cost || 0) - (a.amount || a.total_cost || 0);
        });

        sortedData.forEach((ex) => displayOnScreen(ex));

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}


function displayOnScreen(expense) {
    const ul = document.getElementById('leader-list');
    const totalCost = expense.total_cost || 0; 
    const content = `
    <td> ${expense.name} </td>
    <td> ${totalCost} </td>
    `;

    console.log("------------------",content);

    const li = newElement('tr', content, 'list-item');

    const deleteButton = newElement('button', 'Delete Expense', 'btn', () => { deleteExp(expense, li) });
    li.appendChild(deleteButton);
    ul.appendChild(li);
}


const deleteExp = async (expense, li) => {
    li.remove();
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/expenses/delete/${expense.id}`, {
            headers: { "Authorization": token }
        });
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