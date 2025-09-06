// js/calendar.js

export function initCalendar() {
    const calendarDaysContainer = document.getElementById('calendar-days');
    const monthYearEl = document.getElementById('month-year');
    
    if (!calendarDaysContainer || !monthYearEl) return;

    // ... a teljes generateCalendar logika ide jön ...
    // (a kód nem változott, csak bekerült ebbe a funkcióba)
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    
    monthYearEl.textContent = `${currentYear}. ${monthNames[currentMonth]}`;
    calendarDaysContainer.innerHTML = '';
    
    for (let i = 0; i < startDayIndex; i++) {
        calendarDaysContainer.innerHTML += `<div class="day empty"></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let dayClass = 'day available';
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayClass += ' today';
        }
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayClass = 'day unavailable';
        }
        calendarDaysContainer.innerHTML += `<div class="${dayClass}">${i}</div>`;
    }
}