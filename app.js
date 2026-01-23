
// State
const state = {
    file: null,
    data: [], // Original data {headers: [], rows: []}
    filteredData: [], // Current view
    filters: [], // Array of {column, type, value, id}
    sort: { column: null, direction: 'asc' }, // {column, direction}
    columns: [],
    settings: {
        limit: 100
    }
};

// DOM Elements
const elements = {
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('fileInput'),
    // Sections
    uploadSection: document.getElementById('uploadSection'),
    controlsSection: document.getElementById('controlsSection'),
    // Controls
    filterSelect: document.getElementById('filterColumn'),
    filterInput: document.getElementById('filterValue'),
    sortSelect: document.getElementById('sortColumn'),
    metricSelect: document.getElementById('metricColumn'),
    metricType: document.getElementById('metricType'),
    // Table
    tableHead: document.getElementById('tableHead'),
    tableBody: document.getElementById('tableBody'),
    statusText: document.getElementById('statusText'),
    // Displays
    metricResult: document.getElementById('metricResult'),
    chipsContainer: document.getElementById('chipsContainer')
};

// Initialize
function init() {
    setupEventListeners();
    updateUI();
}

function setupEventListeners() {
    // File Upload
    elements.dropzone.addEventListener('click', () => elements.fileInput.click());
    elements.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.dropzone.classList.add('dragover');
    });
    elements.dropzone.addEventListener('dragleave', () => elements.dropzone.classList.remove('dragover'));
    elements.dropzone.addEventListener('drop', handleDrop);
    elements.fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    // Actions
    document.getElementById('btnApplyFilter').addEventListener('click', addFilter);
    document.getElementById('btnApplySort').addEventListener('click', applySort);
    document.getElementById('btnCompute').addEventListener('click', computeMetric);
    document.getElementById('btnReset').addEventListener('click', resetAll);
    document.getElementById('btnExport').addEventListener('click', exportCSV);
    document.getElementById('btnLoadSample').addEventListener('click', loadSampleData);
}

// File Handling
function handleDrop(e) {
    e.preventDefault();
    elements.dropzone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
}

function handleFile(file) {
    if (!file) return;

    // Show loading?

    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'csv') {
        parseCSV(file);
    } else if (['xlsx', 'xls'].includes(extension)) {
        parseExcel(file);
    } else {
        alert('Unsupported file format. Please use CSV or Excel.');
    }
}

// Parsing Logic
function parseCSV(file) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            loadData(results.data, results.meta.fields, file.name);
        },
        error: (err) => {
            console.error(err);
            alert('Error parsing CSV');
        }
    });
}

function parseExcel(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Extract headers and rows
        if (jsonData.length > 0) {
            const headers = jsonData[0];
            const rows = jsonData.slice(1).map(row => {
                const obj = {};
                headers.forEach((h, i) => obj[h] = row[i]);
                return obj;
            });
            loadData(rows, headers, file.name);
        }
    };
    reader.readAsArrayBuffer(file);
}

// Data Handling
function loadData(rows, headers, filename) {
    state.rawRows = rows;
    state.data = { rows, headers };
    state.columns = headers;
    state.filteredData = [...rows];
    state.file = { name: filename, rows: rows.length };

    // Reset controls
    state.filters = [];
    state.sort = { column: null, direction: 'asc' };

    populateDropdowns();
    renderTable();
    updateUI();
    updateStatus();

    // Switch view
    document.getElementById('welcomeState').style.display = 'none';
    document.getElementById('dataState').style.display = 'flex';
}

function populateDropdowns() {
    const options = state.columns.map(c => `<option value="${c}">${c}</option>`).join('');

    elements.filterSelect.innerHTML = options;
    elements.sortSelect.innerHTML = options;
    elements.metricSelect.innerHTML = options;

    // Add date columns to period comparison (logic to detect date cols later)
}

// Table Rendering
function renderTable() {
    // Headers
    elements.tableHead.innerHTML = `
        <tr>
            ${state.columns.map(c => `<th>${c}</th>`).join('')}
        </tr>
    `;

    // Body (Virtualization or Limit)
    const displayRows = state.filteredData.slice(0, state.settings.limit);

    elements.tableBody.innerHTML = displayRows.map(row => `
        <tr>
            ${state.columns.map(c => `<td>${formatValue(row[c])}</td>`).join('')}
        </tr>
    `).join('');
}

function formatValue(val) {
    if (val === null || val === undefined) return '';
    if (typeof val === 'number') return val.toLocaleString();
    return val;
}

// Logic: Filtering
function addFilter() {
    const column = elements.filterSelect.value;
    const value = elements.filterInput.value;
    if (!value) return;

    const filter = {
        id: Date.now(),
        column,
        value,
        type: 'contains' // Default for MVP
    };

    state.filters.push(filter);
    applyFilters();
    elements.filterInput.value = '';
}

function applyFilters() {
    let result = [...state.data.rows];

    state.filters.forEach(f => {
        result = result.filter(row => {
            const cell = row[f.column];
            return String(cell).toLowerCase().includes(f.value.toLowerCase());
        });
    });

    state.filteredData = result;
    renderChips();
    renderTable();
    updateStatus();
}

function removeFilter(id) {
    state.filters = state.filters.filter(f => f.id !== id);
    applyFilters();
}

function renderChips() {
    elements.chipsContainer.innerHTML = state.filters.map(f => `
        <div class="chip">
            <span>${f.column}: "${f.value}"</span>
            <button onclick="removeFilter(${f.id})">&times;</button>
        </div>
    `).join('');
}

// Logic: Sorting
function applySort() {
    const column = elements.sortSelect.value;
    // Toggle direction if same column
    if (state.sort.column === column) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        state.sort.column = column;
        state.sort.direction = 'asc';
    }

    const dir = state.sort.direction === 'asc' ? 1 : -1;

    state.filteredData.sort((a, b) => {
        const valA = a[column];
        const valB = b[column];

        if (valA < valB) return -1 * dir;
        if (valA > valB) return 1 * dir;
        return 0;
    });

    renderTable();
}

// Logic: Metrics
function computeMetric() {
    const column = elements.metricSelect.value;
    const type = elements.metricType.value;

    // Get numeric values
    const values = state.filteredData
        .map(r => Number(r[column]))
        .filter(v => !isNaN(v));

    let result = 0;

    if (type === 'sum') {
        result = values.reduce((a, b) => a + b, 0);
    } else if (type === 'avg') {
        result = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    } else if (type === 'max') {
        result = Math.max(...values);
    } else if (type === 'min') {
        result = Math.min(...values);
    } else if (type === 'count') {
        result = values.length;
    }

    elements.metricResult.innerHTML = `
        <div class="panel-section" style="margin-top: 1rem; text-align: center;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">${type.toUpperCase()} of ${column}</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${values.length} rows used</div>
        </div>
    `;
}

// Utils
function updateStatus() {
    elements.statusText.innerText = `Loaded: ${state.file.name} | Rows: ${state.filteredData.length} (Total: ${state.data.rows.length}) | Columns: ${state.columns.length}`;
}

function updateUI() {
    // Show/Hide controls based on state
    if (!state.file) {
        elements.controlsSection.style.opacity = '0.5';
        elements.controlsSection.style.pointerEvents = 'none';
    } else {
        elements.controlsSection.style.opacity = '1';
        elements.controlsSection.style.pointerEvents = 'auto';
    }
}

function resetAll() {
    window.location.reload();
}

function loadSampleData() {
    // Generate simple sample data
    const headers = ['Date', 'Product', 'Category', 'Amount', 'Units'];
    const rows = [];
    const categories = ['Electronics', 'Clothing', 'Home', 'Books'];

    for (let i = 0; i < 50; i++) {
        rows.push({
            'Date': new Date(2023, 0, i + 1).toLocaleDateString(),
            'Product': `Item ${i}`,
            'Category': categories[Math.floor(Math.random() * categories.length)],
            'Amount': (Math.random() * 100).toFixed(2),
            'Units': Math.floor(Math.random() * 10) + 1
        });
    }

    loadData(rows, headers, 'Sample_Data.csv');
}

function exportCSV() {
    if (!state.filteredData.length) return;
    const csv = Papa.unparse(state.filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `datamate_export_${Date.now()}.csv`;
    link.click();
}

// Expose to window for inline onclicks if needed
window.removeFilter = removeFilter;

// Run
init();
