
document.getElementById('reminderForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const phoneNumber = document.getElementById('phoneNumber').value;
  const dateTime = document.getElementById('dateTime').value;

  try {
    const response = await fetch('/setReminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber, dateTime })
    });
    const result = await response.text();
    alert(result);
    fetchReminders(); // Fetch and display updated reminders after setting a new one
  } catch (error) {
    console.error('Error setting reminder:', error);
    alert('Error setting reminder');
  }
});

// Fetch reminders from the server and display them
async function fetchReminders() {
  try {
    const response = await fetch('/reminders');
    const reminders = await response.json();
    const remindersList = document.getElementById('remindersList');
    remindersList.innerHTML = ''; // Clear previous reminders

    reminders.forEach(reminder => {
      const listItem = document.createElement('li');
      listItem.textContent = `Phone Number: ${reminder.phoneNumber}, Date and Time: ${reminder.dateTime}`;
      remindersList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    alert('Error fetching reminders');
  }
}

// Call fetchReminders function when the page loads
window.onload = fetchReminders;
