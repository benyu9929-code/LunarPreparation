/**
 * LUNAR PREPARATION - Core Logic
 * Includes Moon Phase Data 2026-2030 (Taiwan UTC+8)
 * Admin: ben / ben
 */

// 1. ASTRONOMICAL DATASET (2026 - 2030)
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
    { type: 'New', date: '2026-09-11', lunar: '八月初一' }, { type: 'Full', date: '2026-10-26', lunar: '八月十五' },
    { type: 'New', date: '2026-11-09', lunar: '十月初一' }, { type: 'Full', date: '2026-11-24', lunar: '十月十五' },
    { type: 'New', date: '2026-12-09', lunar: '十一月初一' }, { type: 'Full', date: '2026-12-24', lunar: '十一月十五' },

    // 2027
    { type: 'New', date: '2027-02-07', lunar: '正月初一' }, { type: 'Full', date: '2027-02-21', lunar: '正月十五' },
    { type: 'New', date: '2027-03-08', lunar: '二月初一' }, { type: 'Full', date: '2027-03-22', lunar: '二月十五' },
    { type: 'New', date: '2027-08-02', lunar: '七月初一' }, { type: 'Full', date: '2027-08-17', lunar: '七月十五' },
    { type: 'New', date: '2027-09-30', lunar: '八月初一' }, { type: 'Full', date: '2027-10-15', lunar: '八月十五' },

    // 2028
    { type: 'New', date: '2028-01-27', lunar: '正月初一' }, { type: 'Full', date: '2028-02-10', lunar: '正月十五' },
    { type: 'New', date: '2028-08-20', lunar: '七月初一' }, { type: 'Full', date: '2028-09-04', lunar: '七月十五' },
    { type: 'New', date: '2028-09-19', lunar: '八月初一' }, { type: 'Full', date: '2028-10-03', lunar: '八月十五' },

    // 2029
    { type: 'New', date: '2029-02-13', lunar: '正月初一' }, { type: 'Full', date: '2029-02-28', lunar: '正月十五' },
    { type: 'New', date: '2029-08-10', lunar: '七月初一' }, { type: 'Full', date: '2029-08-24', lunar: '七月十五' },
    { type: 'New', date: '2029-09-08', lunar: '八月初一' }, { type: 'Full', date: '2029-09-22', lunar: '八月十五' },

    // 2030
    { type: 'New', date: '2030-02-03', lunar: '正月初一' }, { type: 'Full', date: '2030-02-17', lunar: '正月十五' },
    { type: 'New', date: '2030-07-30', lunar: '七月初一' }, { type: 'Full', date: '2030-08-14', lunar: '七月十五' },
    { type: 'New', date: '2030-08-28', lunar: '八月初一' }, { type: 'Full', date: '2030-09-12', lunar: '八月十五' }
];

// 2. APP STATE & DEFAULTS
const DEFAULTS = {
    staff: ['Ben', 'Trista', 'Janet', 'Jessie', 'Toko', 'Leo'],
    tasks: [] 
};

let staff = JSON.parse(localStorage.getItem('lp_staff')) || [...DEFAULTS.staff];
let tasks = JSON.parse(localStorage.getItem('lp_tasks')) || [...DEFAULTS.tasks];

// 3. INITIALIZATION
function init() {
    updateDates();
    renderStaff();
    renderTasks();
    applySavedTheme();
}

// 4. DATE & MOON LOGIC
function updateDates() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('today-solar').innerText = now.toLocaleDateString('en-US', options);
    
    // Format YYYY-MM-DD for comparison
    const todayStr = now.toISOString().split('T')[0];

    const nNew = MOON_DATA.find(m => m.type === 'New' && m.date >= todayStr);
    const nFull = MOON_DATA.find(m => m.type === 'Full' && m.date >= todayStr);

    document.getElementById('next-new-moon').innerText = nNew ? `${nNew.date} (${nNew.lunar})` : "TBA";
    document.getElementById('next-full-moon').innerText = nFull ? `${nFull.date} (${nFull.lunar})` : "TBA";
}

// 5. STAFF MANAGEMENT
function renderStaff() {
    const container = document.getElementById('staff-tags');
    const select = document.getElementById('staff-select');
    container.innerHTML = ''; select.innerHTML = '';
    
    staff.forEach((name, index) => {
        // Render Tags
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerText = name;
        tag.onclick = () => removeStaff(index);
        container.appendChild(tag);

        // Render Dropdown Options
        const opt = document.createElement('option');
        opt.value = name;
        opt.innerText = name;
        select.appendChild(opt);
    });
    localStorage.setItem('lp_staff', JSON.stringify(staff));
}

function addStaff() {
    const input = document.getElementById('new-staff');
    const name = input.value.trim();
    if (name && !staff.includes(name)) {
        staff.push(name);
        input.value = '';
        renderStaff();
    }
}

function removeStaff(index) {
    if (confirm(`Remove ${staff[index]} from the list?`)) {
        staff.splice(index, 1);
        renderStaff();
    }
}

// 6. TASK MANAGEMENT
function syncTaskInput(val) {
    if (val) document.getElementById('task-custom').value = val;
}

function addTask() {
    const taskInput = document.getElementById('task-custom');
    const staffSelect = document.getElementById('staff-select');
    
    const taskName = taskInput.value.trim();
    const staffName = staffSelect.value;

    if (!taskName) {
        alert("Please enter or select a task.");
        return;
    }

    // Duplicate Check Warning
    const isDuplicate = tasks.some(t => t.name.toLowerCase() === taskName.toLowerCase() && t.staff === staffName);
    if (isDuplicate) {
        if (!confirm(`${staffName} is already assigned to "${taskName}". Assign anyway?`)) return;
    }

    tasks.push({ name: taskName, staff: staffName });
    taskInput.value = '';
    document.getElementById('task-presets').value = '';
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        list.innerHTML += `
            <li class="task-item glass">
                <div class="task-info">
                    <strong>${task.name}</strong>
                    <span>${task.staff}</span>
                </div>
                <button class="delete-btn" onclick="removeTask(${index})">Remove</button>
            </li>`;
    });
    localStorage.setItem('lp_tasks', JSON.stringify(tasks));
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 7. THEME & UI LOGIC
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    document.getElementById('theme-icon').innerText = target === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('lp_theme', target);
}

function applySavedTheme() {
    const saved = localStorage.getItem('lp_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-icon').innerText = saved === 'dark' ? '☀️' : '🌙';
}

// 8. ADMIN FUNCTIONS
function toggleAdminModal() {
    const modal = document.getElementById('admin-modal');
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
}

function checkAdminReset() {
    const passInput = document.getElementById('admin-pass');
    if (passInput.value === 'ben') {
        if (confirm("Restore everything to default staff and clear all tasks?")) {
            staff = [...DEFAULTS.staff];
            tasks = [];
            renderStaff();
            renderTasks();
            passInput.value = '';
            toggleAdminModal();
            alert("System has been reset.");
        }
    } else {
        alert("Incorrect password.");
    }
}

// Run App
init();