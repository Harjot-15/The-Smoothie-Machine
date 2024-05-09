// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Grab important elements from the document
    const form = document.getElementById('smoothieForm');
    const newOrderButton = document.getElementById('newOrderButton');
    const ordersTableBody = document.getElementById('ordersTable').querySelector('tbody');
    const orderSummary = document.getElementById('orderSummary');
    const orderSummaryText = orderSummary.querySelector('p'); // Get the paragraph element for updating later

    // Hide the 'Create New Order' button on initial load
    newOrderButton.style.display = 'none';

    // Set the initial color for the order summary text
    orderSummaryText.style.color = '#ec9689';

    // Attach event listener for form submission
    form.addEventListener('submit', handleFormSubmit);

    // Attach event listener for 'Create New Order' button
    newOrderButton.addEventListener('click', createNewOrder);

    // Attach change event listeners to all input elements for real-time updates
    document.querySelectorAll('input[name="base"], input[name="ingredient"], input[name="extra"]').forEach(input => {
        input.addEventListener('change', updateRealTimeSummary);
    });

    // Define the form submission handler
    function handleFormSubmit(event) {
        event.preventDefault();

        // Retrieve the selected values or provide default text if none are selected
        const base = document.querySelector('input[name="base"]:checked')?.value || 'No Base';
        const ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(el => el.value).join(', ') || 'Not Added';
        const extras = Array.from(document.querySelectorAll('input[name="extra"]:checked')).map(el => el.value).join(', ') || 'Not Added';

        // Construct the final message and update the order summary
        const finalMessage = `Your smoothie with ${base}, ingredients: ${ingredients}, and extras: ${extras} is ready!`;
        updateOrderSummary(finalMessage);

        // Add the order details to the table
        addOrderToTable(base, ingredients, extras);

        // Reveal the 'Create New Order' button after submission
        newOrderButton.style.display = 'block';

        // Change the order summary text color after submission
        orderSummaryText.style.color = '#4a7c59';
    }

    // Function to update the real-time summary based on user selection
    function updateRealTimeSummary() {
        const base = document.querySelector('input[name="base"]:checked')?.value || 'None';
        const ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(el => el.value).join(', ') || 'None';
        const extras = Array.from(document.querySelectorAll('input[name="extra"]:checked')).map(el => el.value).join(', ') || 'None';

        // Update the text content of the real-time summary elements
        document.getElementById('realTimeBase').innerHTML = `<span class="label">Base</span><span class="colon">:</span> ${base}`;
        document.getElementById('realTimeIngredients').innerHTML = `<span class="label">Ingredients</span><span class="colon">:</span> ${ingredients}`;
        document.getElementById('realTimeExtras').innerHTML = `<span class="label">Extras</span><span class="colon">:</span> ${extras}`;
    }

    // Function to update the order summary text after order submission
    function updateOrderSummary(message) {
        orderSummaryText.textContent = message;
        // Ensure the order summary text is visible
        orderSummary.style.display = 'block';
    }

    // Function to handle creating a new order
    function createNewOrder() {
        // Reset the form and update the summary to reflect the new order state
        form.reset();
        updateRealTimeSummary();
        updateOrderSummary("Your new smoothie details will appear here after ordering.");

        // Hide the 'Create New Order' button again
        newOrderButton.style.display = 'none';

        // Reset the color of the order summary text for new orders
        orderSummaryText.style.color = '#ec9689';
    }

    // Function to add a new order to the orders table
    function addOrderToTable(base, ingredients, extras) {
        // Create a new row with the order details and a remove button
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${base}</td>
            <td>${ingredients}</td>
            <td>${extras}</td>
            <td><button onclick="removeOrder(this)">Remove</button></td>
        `;
        // Append the new row to the table body
        ordersTableBody.appendChild(row);
    }

    // Global function to remove an order from the table
    window.removeOrder = function(button) {
        // Remove the parent row of the button from the table
        button.closest('tr').remove();
    };
});
