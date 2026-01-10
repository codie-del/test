// Contrarian Thinking Dashboard - Main Application Logic

// Global variables
let revenueExpensesChart = null;
let followerGrowthChart = null;
let currentMonth = getCurrentMonth();
let currentYear = 2026;

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
});

// Initialize dashboard with data
function initializeDashboard() {
    // Set current month and year in selectors
    document.getElementById('monthSelector').value = currentMonth;
    document.getElementById('yearSelector').value = currentYear;

    // Update last updated time
    updateLastUpdatedTime();

    // Load all dashboard data
    updateDashboard();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('monthSelector').addEventListener('change', function(e) {
        currentMonth = parseInt(e.target.value);
        updateDashboard();
    });

    document.getElementById('yearSelector').addEventListener('change', function(e) {
        currentYear = parseInt(e.target.value);
        updateDashboard();
    });

    document.getElementById('refreshBtn').addEventListener('click', function() {
        updateDashboard();
        updateLastUpdatedTime();
    });

    document.getElementById('compareYearCheckbox').addEventListener('change', function() {
        updateRevenueExpensesChart();
    });
}

// Update entire dashboard
function updateDashboard() {
    updateFinancialMetrics();
    updateFollowerMetrics();
    updateRevenueExpensesChart();
    updateFollowerGrowthChart();
    updateGoalsTracker();
}

// Update last updated timestamp
function updateLastUpdatedTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('lastUpdated').textContent = formatted;
}

// Update financial metrics cards
function updateFinancialMetrics() {
    const revenue2026 = DATA.financial2026.revenue[currentMonth];
    const expenses2026 = DATA.financial2026.expenses[currentMonth];
    const profit2026 = revenue2026 - expenses2026;

    const revenue2025 = DATA.financial2025.revenue[currentMonth];
    const expenses2025 = DATA.financial2025.expenses[currentMonth];
    const profit2025 = revenue2025 - expenses2025;

    // Revenue
    document.getElementById('revenueValue').textContent = formatCurrency(revenue2026);
    const revenueChange = calculateYoYChange(revenue2026, revenue2025);
    updateChangeDisplay('revenueChange', revenueChange);

    // Expenses
    document.getElementById('expensesValue').textContent = formatCurrency(expenses2026);
    const expensesChange = calculateYoYChange(expenses2026, expenses2025);
    updateChangeDisplay('expensesChange', expensesChange, true); // Reverse colors for expenses

    // Profit
    document.getElementById('profitValue').textContent = formatCurrency(profit2026);
    const profitChange = calculateYoYChange(profit2026, profit2025);
    updateChangeDisplay('profitChange', profitChange);

    // Bank Balance
    document.getElementById('bankValue').textContent = formatCurrency(DATA.bankBalance);
}

// Update follower metrics cards
function updateFollowerMetrics() {
    const platforms = ['instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook'];
    let total2026 = 0;
    let total2025 = 0;

    platforms.forEach(platform => {
        const count2026 = DATA.followers2026[platform][currentMonth];
        const count2025 = DATA.followers2025[platform][currentMonth];

        total2026 += count2026;
        total2025 += count2025;

        const change = count2026 - count2025;

        document.getElementById(platform + 'Count').textContent = formatFollowers(count2026);
        document.getElementById(platform + 'Change').textContent =
            '↑ ' + formatFollowers(change) + ' from last year';
        document.getElementById(platform + 'Change').className = 'follower-change positive';
    });

    // Total followers
    document.getElementById('totalFollowers').textContent = formatFollowers(total2026);
    const totalChange = total2026 - total2025;
    document.getElementById('totalFollowersChange').textContent =
        '↑ ' + formatFollowers(totalChange) + ' from last year';
}

// Update change display helper
function updateChangeDisplay(elementId, changePercent, reverseColors = false) {
    const element = document.getElementById(elementId);
    const isPositive = reverseColors ? changePercent < 0 : changePercent > 0;
    const arrow = isPositive ? '↑' : '↓';
    const className = isPositive ? 'metric-change positive' : 'metric-change negative';

    element.textContent = arrow + ' ' + Math.abs(changePercent).toFixed(1) + '% YoY';
    element.className = className;
}

// Update Revenue vs Expenses Chart
function updateRevenueExpensesChart() {
    const ctx = document.getElementById('revenueExpensesChart').getContext('2d');
    const compareYear = document.getElementById('compareYearCheckbox').checked;

    // Destroy existing chart if it exists
    if (revenueExpensesChart) {
        revenueExpensesChart.destroy();
    }

    const datasets = [
        {
            label: '2026 Revenue',
            data: DATA.financial2026.revenue,
            borderColor: '#52130C',
            backgroundColor: 'rgba(82, 19, 12, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        },
        {
            label: '2026 Expenses',
            data: DATA.financial2026.expenses,
            borderColor: '#713718',
            backgroundColor: 'rgba(113, 55, 24, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            borderDash: [5, 5]
        }
    ];

    if (compareYear) {
        datasets.push({
            label: '2025 Revenue',
            data: DATA.financial2025.revenue,
            borderColor: '#B5605A',
            backgroundColor: 'rgba(181, 96, 90, 0.05)',
            borderWidth: 2,
            tension: 0.4,
            borderDash: [2, 2]
        });
        datasets.push({
            label: '2025 Expenses',
            data: DATA.financial2025.expenses,
            borderColor: '#B5C0C3',
            backgroundColor: 'rgba(181, 192, 195, 0.05)',
            borderWidth: 2,
            tension: 0.4,
            borderDash: [2, 2]
        });
    }

    revenueExpensesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: DATA.monthLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        },
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(82, 19, 12, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Update Follower Growth Chart
function updateFollowerGrowthChart() {
    const ctx = document.getElementById('followerGrowthChart').getContext('2d');

    // Destroy existing chart if it exists
    if (followerGrowthChart) {
        followerGrowthChart.destroy();
    }

    // Calculate total followers per month
    const total2026 = DATA.monthLabels.map((_, i) => getTotalFollowers(i, 2026));
    const total2025 = DATA.monthLabels.map((_, i) => getTotalFollowers(i, 2025));

    followerGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: DATA.monthLabels,
            datasets: [
                {
                    label: '2026 Total Followers',
                    data: total2026,
                    borderColor: '#616F9D',
                    backgroundColor: 'rgba(97, 111, 157, 0.2)',
                    borderWidth: 4,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#616F9D',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2
                },
                {
                    label: '2025 Total Followers',
                    data: total2025,
                    borderColor: '#B5C0C3',
                    backgroundColor: 'rgba(181, 192, 195, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    borderDash: [5, 5],
                    pointRadius: 3,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatFollowers(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return formatFollowers(value);
                        },
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(97, 111, 157, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Update Goals Tracker
function updateGoalsTracker() {
    // Calculate year-to-date totals
    const ytdRevenue = getYTDSum(DATA.financial2026.revenue, currentMonth);
    const ytdFollowers = getTotalFollowers(currentMonth, 2026);

    // Calculate projections based on current pace
    const monthsElapsed = currentMonth + 1;
    const monthsRemaining = 12 - monthsElapsed;
    const avgRevenuePerMonth = ytdRevenue / monthsElapsed;
    const avgFollowerGrowthPerMonth = (ytdFollowers - getTotalFollowers(0, 2025)) / monthsElapsed;

    const projectedRevenue = ytdRevenue + (avgRevenuePerMonth * monthsRemaining);
    const projectedFollowers = ytdFollowers + (avgFollowerGrowthPerMonth * monthsRemaining);

    // Revenue goal
    const revenuePercent = (ytdRevenue / DATA.goals.revenue) * 100;
    const revenueNeededPerMonth = (DATA.goals.revenue - ytdRevenue) / monthsRemaining;

    document.getElementById('revenueGoalCurrent').textContent = formatCurrency(ytdRevenue);
    document.getElementById('revenueGoalProgress').style.width = Math.min(revenuePercent, 100) + '%';
    document.getElementById('revenueGoalPercent').textContent = revenuePercent.toFixed(1) + '%';
    document.getElementById('revenueProjected').textContent = formatCurrency(projectedRevenue);
    document.getElementById('revenueNeeded').textContent = formatCurrency(Math.max(0, revenueNeededPerMonth));

    // Set status
    const revenueStatus = getGoalStatus(revenuePercent, monthsElapsed);
    const revenueStatusEl = document.getElementById('revenueGoalStatus');
    revenueStatusEl.textContent = revenueStatus.text;
    revenueStatusEl.className = 'goal-status ' + revenueStatus.class;

    // Follower goal
    const followerPercent = (ytdFollowers / DATA.goals.followers) * 100;
    const followerNeededPerMonth = (DATA.goals.followers - ytdFollowers) / monthsRemaining;

    document.getElementById('followerGoalCurrent').textContent = formatFollowers(ytdFollowers);
    document.getElementById('followerGoalProgress').style.width = Math.min(followerPercent, 100) + '%';
    document.getElementById('followerGoalPercent').textContent = followerPercent.toFixed(1) + '%';
    document.getElementById('followerProjected').textContent = formatFollowers(Math.round(projectedFollowers));
    document.getElementById('followerNeeded').textContent = formatFollowers(Math.round(Math.max(0, followerNeededPerMonth)));

    // Set status
    const followerStatus = getGoalStatus(followerPercent, monthsElapsed);
    const followerStatusEl = document.getElementById('followerGoalStatus');
    followerStatusEl.textContent = followerStatus.text;
    followerStatusEl.className = 'goal-status ' + followerStatus.class;
}

// Determine goal status based on progress vs time elapsed
function getGoalStatus(percentComplete, monthsElapsed) {
    const expectedPercent = (monthsElapsed / 12) * 100;
    const diff = percentComplete - expectedPercent;

    if (diff >= -5) {
        return { text: '✓ ON TRACK', class: 'on-track' };
    } else if (diff >= -15) {
        return { text: '⚠️ SLIGHTLY BEHIND', class: 'slightly-behind' };
    } else {
        return { text: '⚠️ NEEDS ATTENTION', class: 'behind' };
    }
}
