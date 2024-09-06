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
        }
    }
}

// Remove Mantra Function
function removeMantra() {
    const selectedMantra = document.getElementById('remove-mantra-select').value;
    if (selectedMantra) {
        let mantras = JSON.parse(localStorage.getItem(MANTRAS_KEY)) || [];
        mantras = mantras.filter(m => m !== selectedMantra);
        localStorage.setItem(MANTRAS_KEY, JSON.stringify(mantras));
        loadMantras();
    }
}

// Log Japa Mala Function
function logJapa() {
    const date = document.getElementById('log-date').value;
    const count = parseInt(document.getElementById('log-count').value, 10);
    const mantra = document.getElementById('log-mantra-select').value;

    if (date && count && mantra) {
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
        }
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
    
    mantras.forEach(mantra => {
        const option = document.createElement('option');
        option.value = mantra;
        option.textContent = mantra;
        removeSelect.appendChild(option);
        logSelect.appendChild(option);
        deleteSelect.appendChild(option);
    });
}

// Load Logs Function
function loadLogs() {
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || {};
    // Display logs in a table or other format
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
    // Update mantra-specific stats
}

// Initialize app
function initializeApp() {
    loadMantras();
    loadLogs();
    updateStats();
}

initializeApp();
