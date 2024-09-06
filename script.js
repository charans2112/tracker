// Local storage keys
const MANTRAS_KEY = 'mantras';
const LOGS_KEY = 'logs';

// Add Mantra Function
function addMantra() {
    const mantra = document.getElementById('mantra-input').value.trim();
    if (mantra) {
        let mantras = JSON.parse(localStorage.getItem(MANTRAS_KEY)) || [];
        if (!mantras.includes(mantra)) {
            mantras.push(mantra);
            localStorage.setItem(MANTRAS_KEY, JSON.stringify(mantras));
            document.getElementById('mantra-input').value = '';
            loadMantras();
        } else {
            alert('Mantra already exists.');
        }
    }
}

// Remove Mantra Function
function removeMantra() {
    const selectedMantra = document.getElementById('remove-mantra-select').value;
    
    if (selectedMantra) {
        let mantras = JSON.parse(localStorage.getItem(MANTRAS_KEY)) || [];
        let logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};

        // Remove the mantra from the list of mantras
        mantras = mantras.filter(m => m !== selectedMantra);
        localStorage.setItem(MANTRAS_KEY, JSON.stringify(mantras));

        // Remove logs related to the selected mantra for each date
        for (const date in logs) {
            logs[date] = logs[date].filter(log => log.mantra !== selectedMantra);
            
            // If no logs are left for this date, remove the date entry
            if (logs[date].length === 0) {
                delete logs[date];
            }
        }

        // Save the updated logs after deletion
        localStorage.setItem(LOGS_KEY, JSON.stringify(logs));

        // Reload mantras, logs, and stats to reflect the changes
        loadMantras();
        loadLogs();
        updateStats();
    } else {
        alert('Please select a mantra to remove.');
    }
}

// Log Japa Mala Function
function logJapa() {
    const date = document.getElementById('log-date').value;
    const count = parseInt(document.getElementById('log-count').value, 10);
    const mantra = document.getElementById('log-mantra-select').value;

    if (date && count > 0 && mantra) {
        let logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};
        if (!logs[date]) {
            logs[date] = [];
        }
        logs[date].push({ mantra, count });
        localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
        document.getElementById('log-date').value = '';
        document.getElementById('log-count').value = '';
        loadLogs();
        updateStats();
    } else {
        alert('Please fill out all fields for logging.');
    }
}

// Delete Log by Mantra Function
function deleteLog() {
    const date = document.getElementById('delete-log-date').value;
    const mantra = document.getElementById('delete-log-mantra').value;
    
    if (date && mantra) {
        let logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};
        
        if (logs[date]) {
            // Filter out the specific mantra's log for the date
            logs[date] = logs[date].filter(log => log.mantra !== mantra);
            
            // If there are no more logs for that date, remove the date entry
            if (logs[date].length === 0) {
                delete logs[date];
            }

            localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
            document.getElementById('delete-log-date').value = '';
            loadLogs();
            updateStats();
        } else {
            alert('No logs found for the selected date.');
        }
    } else {
        alert('Please fill out both the date and mantra fields.');
    }
}

// Load Mantras Function
function loadMantras() {
    const mantras = JSON.parse(localStorage.getItem(MANTRAS_KEY)) || [];
    const removeSelect = document.getElementById('remove-mantra-select');
    const logSelect = document.getElementById('log-mantra-select');
    const deleteSelect = document.getElementById('delete-log-mantra');
    
    removeSelect.innerHTML = '';
    logSelect.innerHTML = '';
    deleteSelect.innerHTML = '';

    if (mantras.length > 0) {
        mantras.forEach(mantra => {
            const option = document.createElement('option');
            option.value = mantra;
            option.textContent = mantra;
            removeSelect.appendChild(option);
            logSelect.appendChild(option);
            deleteSelect.appendChild(option);
        });
    } else {
        const placeholder = document.createElement('option');
        placeholder.textContent = 'No mantras available';
        removeSelect.appendChild(placeholder);
        logSelect.appendChild(placeholder);
        deleteSelect.appendChild(placeholder);
    }
}

// Load Logs Function
function loadLogs() {
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};
    const logsTable = document.getElementById('logs-table');
    logsTable.innerHTML = '';  // Clear previous logs

    for (const date in logs) {
        logs[date].forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${date}</td><td>${entry.mantra}</td><td>${entry.count}</td>`;
            logsTable.appendChild(row);
        });
    }
}

// Update Stats Function
function updateStats() {
    let totalMalas = 0;
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};

    for (const date in logs) {
        logs[date].forEach(entry => {
            totalMalas += entry.count || 0;
        });
    }

    document.getElementById('total-malas').textContent = totalMalas;
}

// Initialize the app
function initializeApp() {
    loadMantras();
    loadLogs();
    updateStats();
}

// Call initialization when the page loads
initializeApp();
