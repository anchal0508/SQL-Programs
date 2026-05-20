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
    const content = `
    <td> ${expense.id} </td>
    <td> ${expense.amount} </td>
    <td> ${expense.details} </td>
    <td> ${expense.category} </td>  <td>
    `
    const li = newElement('tr', content, 'list-item');

    const deleteButton = newElement('button', 'Delete', 'btn', () => { deleteExp(expense, li) });
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