const MOON_DATA = [
   // 2026
    { type: 'New', date: '2026-01-19', lunar: '臘月初一' }, { type: 'Full', date: '2026-02-02', lunar: '臘月十五' },
    { type: 'New', date: '2026-02-17', lunar: '正月初一' }, { type: 'Full', date: '2026-03-03', lunar: '正月十五' },
    { type: 'New', date: '2026-03-19', lunar: '二月初一' }, { type: 'Full', date: '2026-04-02', lunar: '二月十五' },
    { type: 'New', date: '2026-04-17', lunar: '三月初一' }, { type: 'Full', date: '2026-05-01', lunar: '三月十五' },
    { type: 'New', date: '2026-05-16', lunar: '四月初一' }, { type: 'Full', date: '2026-05-31', lunar: '四月十五' },
    { type: 'New', date: '2026-06-15', lunar: '五月初一' }, { type: 'Full', date: '2026-06-30', lunar: '五月十五' },
    { type: 'New', date: '2026-07-14', lunar: '六月初一' }, { type: 'Full', date: '2026-07-29', lunar: '六月十五' },
    { type: 'New', date: '2026-08-13', lunar: '七月初一' }, { type: 'Full', date: '2026-08-28', lunar: '七月十五' },
    { type: 'New', date: '2026-09-11', lunar: '八月初一' }, { type: 'Full', date: '2026-09-26', lunar: '八月十五' },
    { type: 'New', date: '2026-10-11', lunar: '九月初一' }, { type: 'Full', date: '2026-10-26', lunar: '九月十五' },
    { type: 'New', date: '2026-11-09', lunar: '十月初一' }, { type: 'Full', date: '2026-11-24', lunar: '十月十五' },
    { type: 'New', date: '2026-12-09', lunar: '十一月初一' }, { type: 'Full', date: '2026-12-24', lunar: '十一月十五' },
    // 2027
    { type: 'New', date: '2027-02-07', lunar: '正月初一' }, { type: 'Full', date: '2027-02-21', lunar: '正月十五' },
    { type: 'New', date: '2027-03-08', lunar: '二月初一' }, { type: 'Full', date: '2027-03-22', lunar: '二月十五' },
    { type: 'New', date: '2027-04-07', lunar: '三月初一' }, { type: 'Full', date: '2027-04-21', lunar: '三月十五' },
    { type: 'New', date: '2027-05-06', lunar: '四月初一' }, { type: 'Full', date: '2027-05-20', lunar: '四月十五' },
    { type: 'New', date: '2027-07-04', lunar: '六月初一' }, { type: 'Full', date: '2027-07-18', lunar: '六月十五' },
    { type: 'New', date: '2027-08-02', lunar: '七月初一' }, { type: 'Full', date: '2027-08-17', lunar: '七月十五' },
    { type: 'New', date: '2027-09-30', lunar: '九月初一' }, { type: 'Full', date: '2027-10-15', lunar: '九月十五' },
    // 2028
    { type: 'New', date: '2028-01-27', lunar: '正月初一' }, { type: 'Full', date: '2028-02-10', lunar: '正月十五' },
    { type: 'New', date: '2028-02-25', lunar: '二月初一' }, { type: 'Full', date: '2028-03-11', lunar: '二月十五' },
    { type: 'New', date: '2028-05-24', lunar: '五月初一' }, { type: 'Full', date: '2028-06-08', lunar: '五月十五' },
    { type: 'New', date: '2028-10-18', lunar: '九月初一' }, { type: 'Full', date: '2028-11-02', lunar: '九月十五' },
    // 2029
    { type: 'New', date: '2029-02-13', lunar: '正月初一' }, { type: 'Full', date: '2029-02-28', lunar: '正月十五' },
    { type: 'New', date: '2029-03-15', lunar: '二月初一' }, { type: 'Full', date: '2029-03-30', lunar: '二月十五' },
    { type: 'New', date: '2029-05-13', lunar: '四月初一' }, { type: 'Full', date: '2029-05-27', lunar: '四月十五' },
    // 2030
    { type: 'New', date: '2030-02-03', lunar: '正月初一' }, { type: 'Full', date: '2030-02-17', lunar: '正月十五' },
    { type: 'New', date: '2030-03-05', lunar: '二月初一' }, { type: 'Full', date: '2030-03-20', lunar: '二月十五' },
    { type: 'New', date: '2030-05-03', lunar: '四月初一' }, { type: 'Full', date: '2030-05-17', lunar: '四月十五' },
    { type: 'New', date: '2030-10-26', lunar: '十月初一' }, { type: 'Full', date: '2030-11-10', lunar: '十月十五' }
];

const DEFAULTS = { 
    staff: ['Ben', 'Trista', 'Janet', 'Jessie', 'Toko', 'Leo'], 
    presets: ['Fruits arrangement', 'Tidy up', 'Polish lamp', 'Vacuum & Mopping']
};

let staff = JSON.parse(localStorage.getItem('lp_staff')) || [...DEFAULTS.staff];
let tasks = JSON.parse(localStorage.getItem('lp_tasks')) || [];
let presets = JSON.parse(localStorage.getItem('lp_presets')) || [...DEFAULTS.presets];

function init() {
    updateDates();
    renderStaff();
    renderTasks();
    renderPresets();
    applyTheme();
    setupScrollFade();
}


// Moon List Functions
function showMoonList(type) {
    const today = new Date().toISOString().split('T')[0];
    const upcoming = MOON_DATA.filter(m => m.type === type && m.date >= today).slice(0, 5);
    const list = document.getElementById('moon-modal-list');
    
    document.getElementById('moon-modal-title').innerText = `Next 5 ${type} Moons`;
    
    list.innerHTML = upcoming.map(m => {
        const dayName = new Date(m.date).toLocaleDateString('en-US', { weekday: 'long' });
        return `<li><strong>${m.date}</strong> <span style="font-size:0.8em; opacity:0.7;">${dayName}</span> <span>${m.lunar}</span></li>`;
    }).join('');
    
    document.getElementById('moon-modal').style.display = 'flex';
}

function closeMoonModal(e) { if (e.target.id === 'moon-modal') e.target.style.display = 'none'; }

// Preset Management
function renderPresets() {
    const select = document.getElementById('task-presets');
    const adminList = document.getElementById('preset-manager-list');
    
    // Update Dropdown
    select.innerHTML = `<option value="">-- Presets --</option>` + 
        presets.map(p => `<option value="${p}">${p}</option>`).join('');
    
    // Update Admin Manager
    adminList.innerHTML = presets.map((p, i) => `
        <div class="admin-item">
            <span>${p}</span>
            <button onclick="removePreset(${i})" class="delete-btn">✕</button>
        </div>
    `).join('');
    
    localStorage.setItem('lp_presets', JSON.stringify(presets));
}

function addPreset() {
    const val = document.getElementById('new-preset').value.trim();
    if (val) { presets.push(val); document.getElementById('new-preset').value = ''; renderPresets(); }
}

function removePreset(i) { presets.splice(i, 1); renderPresets(); }

// Admin Verification
function verifyAdmin() {
    if (document.getElementById('admin-pass').value === 'ben') {
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('verify-btn').style.display = 'none';
    } else { alert("Wrong Password"); }
}

// Standard Functions
function renderStaff() {
    const container = document.getElementById('staff-tags');
    const select = document.getElementById('staff-select');
    container.innerHTML = ''; 
    select.innerHTML = '';
    
    staff.forEach((s, i) => {
        // Updated to use the new 'tag' class
        container.innerHTML += `<div class="tag" onclick="removeStaff(${i})">${s}</div>`;
        select.innerHTML += `<option value="${s}">${s}</option>`;
    });
    localStorage.setItem('lp_staff', JSON.stringify(staff));
}

// Ensure the Enter key works in Admin Password box
document.getElementById('admin-pass').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyAdmin();
});

function addTask() {
    const name = document.getElementById('task-custom').value || document.getElementById('task-presets').value;
    const s = document.getElementById('staff-select').value;
    if (name) { tasks.push({ name, staff: s }); renderTasks(); document.getElementById('task-custom').value=''; }
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = tasks.map((t, i) => `
        <li class="task-item glass">
            <div class="task-info">
                <strong>${t.name}</strong>
                <span>${t.staff}</span>
            </div>
            <button class="delete-btn" onclick="removeTask(${i})">✕</button>
        </li>
    `).join('');
    localStorage.setItem('lp_tasks', JSON.stringify(tasks));
}

function removeTask(i) { tasks.splice(i, 1); renderTasks(); }
function removeStaff(i) { if(confirm("Remove?")) { staff.splice(i, 1); renderStaff(); } }
function addStaff() { 
    const val = document.getElementById('new-staff').value.trim(); 
    if(val) { staff.push(val); document.getElementById('new-staff').value=''; renderStaff(); } 
}

function toggleTheme() {
    const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('lp_theme', t);
    document.getElementById('theme-icon').innerText = t === 'dark' ? '☀️' : '🌙';
}

function applyTheme() {
    const t = localStorage.getItem('lp_theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.getElementById('theme-icon').innerText = t === 'dark' ? '☀️' : '🌙';
}

function updateDates() {
    const now = new Date();
    document.getElementById('today-solar').innerText = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const todayStr = now.toISOString().split('T')[0];
    const nNew = MOON_DATA.find(m => m.type === 'New' && m.date >= todayStr);
    const nFull = MOON_DATA.find(m => m.type === 'Full' && m.date >= todayStr);

    if (nNew) {
        const newMoonDay = new Date(nNew.date).toLocaleDateString('en-US', { weekday: 'short' });
        document.getElementById('next-new-moon').innerText = `${nNew.date} (${newMoonDay})`;
    }
    
    if (nFull) {
        const fullMoonDay = new Date(nFull.date).toLocaleDateString('en-US', { weekday: 'short' });
        document.getElementById('next-full-moon').innerText = `${nFull.date} (${fullMoonDay})`;
    }
}

function toggleAdminModal() { 
    const m = document.getElementById('admin-modal'); 
    m.style.display = m.style.display === 'none' ? 'flex' : 'none';
    document.getElementById('admin-controls').style.display = 'none';
    document.getElementById('verify-btn').style.display = 'block';
    document.getElementById('admin-pass').value = '';
}

function checkAdminReset() {
    if(confirm("This will wipe all custom staff and tasks. Continue?")) {
        localStorage.clear(); location.reload();
    }
}

function syncTaskInput(v) { if(v) document.getElementById('task-custom').value = v; }

init();
function toggleFocusMode() {
    const isActive = document.body.classList.toggle('focus-active');
    const btn = document.getElementById('focus-btn');
    
    if (isActive) {
        btn.innerText = "Exit View";
        // Snap to top to ensure tasks are visible
        document.querySelector('.scroll-area').scrollTop = 0;
    } else {
        btn.innerText = "Show All";
    }
}
// Add these listeners to your script
function setupAdminListeners() {
    // 1. Enter key for Admin Login
    const adminPassInput = document.getElementById('admin-pass');
    adminPassInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            verifyAdmin();
        }
    });

    // 2. Enter key for Adding Presets inside Admin
    const newPresetInput = document.getElementById('new-preset');
    newPresetInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addPreset();
        }
    });
}

// Call this function inside your main init()
setupAdminListeners();

// Small fix to verifyAdmin to focus on the preset input after login
function verifyAdmin() {
    if (document.getElementById('admin-pass').value === 'ben') {
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('login-zone').style.display = 'none';
        document.getElementById('verify-btn').style.display = 'none';
        
        // Auto-focus the preset input for fast typing
        setTimeout(() => document.getElementById('new-preset').focus(), 100);
    } else {
        alert("Incorrect Password");
    }
}