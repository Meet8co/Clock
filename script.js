let is12HourFormat = false;
let alarmTime = null;
let alarmTimeout = null;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format if enabled
  if (is12HourFormat) {
    hours = hours % 12 || 12;
  }

  // Update the clock display
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  document.getElementById('ampm').textContent = is12HourFormat ? ` ${ampm}` : '';

  // Update the date display
  const date = now.toDateString();
  document.getElementById('date').textContent = date;

  // Check alarm
  if (alarmTime && hours === alarmTime.hours && minutes === alarmTime.minutes && seconds === 0) {
    alert('Alarm!');
    document.getElementById('alarm-status').textContent = 'Alarm ringing!';
    clearAlarm();
  }
}

// Set Alarm
document.getElementById('set-alarm').addEventListener('click', () => {
  const alarmTimeValue = document.getElementById('alarm-time').value;
  if (!alarmTimeValue) {
    alert('Please set a valid time for the alarm.');
    return;
  }

  const [alarmHours, alarmMinutes] = alarmTimeValue.split(':').map(Number);
  alarmTime = { hours: alarmHours, minutes: alarmMinutes };

  document.getElementById('alarm-status').textContent = `Alarm set for ${String(alarmHours).padStart(2, '0')}:${String(alarmMinutes).padStart(2, '0')}`;
});

// Clear Alarm
document.getElementById('clear-alarm').addEventListener('click', () => {
  clearAlarm();
});

function clearAlarm() {
  alarmTime = null;
  document.getElementById('alarm-status').textContent = 'No alarm set.';
}

// Update Time Manually
document.getElementById('update-time').addEventListener('click', () => {
  const hourInput = parseInt(document.getElementById('hour-input').value, 10);
  const minuteInput = parseInt(document.getElementById('minute-input').value, 10);
  const secondInput = parseInt(document.getElementById('second-input').value, 10);

  if (isNaN(hourInput) || isNaN(minuteInput) || isNaN(secondInput) {
    alert('Please enter valid numbers for hours, minutes, and seconds.');
    return;
  }

  const now = new Date();
  now.setHours(hourInput);
  now.setMinutes(minuteInput);
  now.setSeconds(secondInput);

  // Update the clock display
  updateClock();
});

// Toggle 12-Hour Format
document.getElementById('12-hour-toggle').addEventListener('change', (event) => {
  is12HourFormat = event.target.checked;
  updateClock();
});

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();
