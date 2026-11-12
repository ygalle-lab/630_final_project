
let events = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Eventure: Async data loading ready!');
    
    const loadButton = document.querySelector('#load-data-button');
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    

    loadButton.addEventListener('click', async function() {
        updateStatus('loading','Loading events data, please wait.');
        loadButton.disabled = true;
        
        try {
            const response = await fetch('events.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            events = data;

            displayEvents(events);

            const categorySelect = document.querySelector('#category-select');
            categorySelect.addEventListener('change', function() {
                const selectedCategory = categorySelect.value;
        
                if (selectedCategory === 'all') {
                    displayEvents(events);
                } else {
                    const filteredEvents = events.filter(event => event.category === selectedCategory);
                    displayEvents(filteredEvents);
                }
            });

            updateStatus('success',`Loaded ${events.length} events.`);
        } catch (error) {
            updateStatus('error','Cannot load event data. Please try again.');
            console.error('Load failed:', error);
            loadButton.disabled = false;
        }
    });
    
    function displayEvents(events) {
        const eventList = document.querySelector("#eventList");
        eventList.innerHTML = "";

        if (events.length === 0) {
            eventList.innerHTML = '<p class="placeholder">No events found.</p>';
            return;
        }

        events.forEach(function (event) {
            eventList.innerHTML += `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p>${event.category}</p>
                <p>${event.location}</p>
                <p>${event.date}</p>
                <p>${event.time}</p>
            </div>
        `;
    });
    }

});


function updateStatus(state, message) {
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    statusDisplay.classList.remove('loading', 'success', 'error');
    
    if (state !== 'ready') {
        statusDisplay.classList.add(state);
    }
    
    statusMessage.textContent = message;
}

