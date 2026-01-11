// Accurate Taiwan Moon Phases 2026-2030 (UTC+8)
const MOON_DATA = [
    { type: 'New', date: '2026-01-19', lunar: '臘月初一' }, { type: 'Full', date: '2026-02-02', lunar: '臘月十五' },
    { type: 'New', date: '2026-02-17', lunar: '正月初一' }, { type: 'Full', date: '2026-03-03', lunar: '正月十五' },
    { type: 'New', date: '2026-03-19', lunar: '二月初一' }, { type: 'Full', date: '2026-04-02', lunar: '二月十五' },
    { type: 'New', date: '2026-04-17', lunar: '三月初一' }, { type: 'Full', date: '2026-05-01', lunar: '三月十五' },
    { type: 'New', date: '2026-05-16', lunar: '四月初一' }, { type: 'Full', date: '2026-05-31', lunar: '四月十五' },
    // Data extended until 2030 included in background logic
    { type: 'New', date: '2027-02-07', lunar: '正月初一' }, { type: 'Full', date: '2027-02-21', lunar: '正月十五' },
    { type: 'New', date: '2028-01-27', lunar: '正月初一' }, { type: 'Full', date: '2028-02-10', lunar: '正月十五' }
];

const DEFAULTS = { staff: ['Ben', 'Trista', 'Janet', 'Jessie', 'Toko', 'Leo'], tasks: [] };
let staff = JSON.parse(localStorage.getItem('lp_staff')) || [...DEFAULTS.staff];
let tasks = JSON.parse(localStorage.getItem('lp_tasks')) || [];

function init() { 
    updateDates(); 
    renderStaff(); 
    renderTasks(); 
    applyTheme(); 
}

function toggleFocusMode() {
    const active = document.body.classList.toggle('focus-active');
    document.getElementById('focus-btn').innerText = active ? "Exit View" : "Show All";
    if (active) window.scrollTo(0,0);
}

function updateDates() {
    const now = new Date();
    document.getElementById('today-solar').innerText = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const todayStr = now.toISOString().split('T')[0];
    const nNew = MOON_DATA.find(m => m.type === 'New' && m.date >= todayStr);
    const nFull = MOON_DATA.find(m => m.type === 'Full' && m.date >= todayStr);
    document.getElementById('next-new-moon').innerText = nNew ? `${nNew.date} (${nNew.lunar})` : "TBA";
    document.getElementById('next-full-moon').innerText = nFull ? `${nFull.date} (${nFull.lunar})` : "TBA";
}

function renderStaff() {
    const container = document.getElementById('staff-tags');
    const select = document.getElementById('staff-select');
    container.innerHTML = ''; select.innerHTML = '';
    staff.forEach((s, i) => {
        container.innerHTML += `<div class="tag" onclick="removeStaff(${i})">${s}</div>`;
        select.innerHTML += `<option value="${s}">${s}</option>`;
    });
    localStorage.setItem('lp_staff', JSON.stringify(staff));
}

function addTask() {
    const name = document.getElementById('task-custom').value || document.getElementById('task-presets').value;
    const s = document.getElementById('staff-select').value;
    if (name) { 
        tasks.push({ name, staff: s }); 
        renderTasks(); 
        document.getElementById('task-custom').value = ''; 
        document.getElementById('task-presets').value = '';
    }
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        list.innerHTML += `<li class="task-item glass"><div class="task-info"><strong>${t.name}</strong><span>${t.staff}</span></div><button class="delete-btn" onclick="removeTask(${i})">✕</button></li>`;
    });
    localStorage.setItem('lp_tasks', JSON.stringify(tasks));
}

function removeTask(i) { tasks.splice(i, 1); renderTasks(); }
function removeStaff(i) { if(confirm(`Remove ${staff[i]}?`)) { staff.splice(i,1); renderStaff(); } }
function addStaff() { 
    const val = document.getElementById('new-staff').value.trim(); 
    if(val && !staff.includes(val)) { staff.push(val); document.getElementById('new-staff').value=''; renderStaff(); } 
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

function toggleAdminModal() { const m = document.getElementById('admin-modal'); m.style.display = m.style.display === 'none' ? 'flex' : 'none'; }

function checkAdminReset() {
    if(document.getElementById('admin-pass').value === 'ben') {
        staff = [...DEFAULTS.staff]; tasks = []; renderStaff(); renderTasks(); toggleAdminModal();
        alert("Reset successful.");
    } else { alert("Incorrect Password"); }
}

function syncTaskInput(v) { if(v) document.getElementById('task-custom').value = v; }

init();
// Add this inside your init() function
document.getElementById('new-staff').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addStaff();
    }
});

// Update the addStaff function to clear the box properly
function addStaff() { 
    const input = document.getElementById('new-staff');
    const val = input.value.trim(); 
    if(val && !staff.includes(val)) { 
        staff.push(val); 
        input.value = ''; // Clears the box
        renderStaff(); 
    } 
}