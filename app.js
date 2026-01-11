// Contrarian Thinking Dashboard - Enhanced Application Logic with Pacing & Goals

// Global variables
let revenueExpensesChart = null;
let followerGrowthChart = null;
let currentMonth = getCurrentMonth();
let currentYear = 2026;
let currentView = 'projections'; // 'actuals', 'projections', or 'scenarios'
let selectedScenario = 'base'; // 'conservative', 'base', or 'upside'

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

    // Update month progress in header
    updateMonthProgress();

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

    // View toggle listeners
    const viewToggles = document.querySelectorAll('.view-toggle');
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentView = this.getAttribute('data-view');
            switchView(currentView);
        });
    });

    // Scenario card listeners
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            scenarioCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedScenario = this.getAttribute('data-scenario');
            updateDashboardWithScenario();
        });
    });
}

// Update month progress percentage
function updateMonthProgress() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), month + 1, 0).getDate();
    const percentThrough = ((day / daysInMonth) * 100).toFixed(1);

    document.getElementById('monthProgress').textContent = `${percentThrough}% through ${DATA.monthLabels[month]}`;
}

// Update entire dashboard
function updateDashboard() {
    updateMonthlyFinancialSummary();
    updateYearlyFinancialSummary();
    updateFollowerMetrics();
    updateRevenueExpensesChart();
    updateFollowerGrowthChart();
    updateGoalsTracker();
    updateCurrentMonthYear();
}

// Switch view between Actuals, Projections, and Scenarios
function switchView(view) {
    const scenariosSection = document.getElementById('scenariosSection');
    const monthlySummary = document.querySelector('.summary-section.monthly');
    const yearlySummary = document.querySelector('.summary-section.yearly');
    const followersSection = document.querySelector('.summary-section.followers');
    const chartsRow = document.querySelector('.charts-row');
    const goalsSection = document.querySelector('.goals-section');
    const accountsSection = document.querySelector('.accounts-section');

    if (view === 'scenarios') {
        // Show scenarios, hide everything else
        scenariosSection.style.display = 'block';
        monthlySummary.style.display = 'none';
        yearlySummary.style.display = 'none';
        followersSection.style.display = 'none';
        chartsRow.style.display = 'none';
        goalsSection.style.display = 'none';
        accountsSection.style.display = 'none';
    } else {
        // Show normal dashboard, hide scenarios
        scenariosSection.style.display = 'none';
        monthlySummary.style.display = 'block';
        yearlySummary.style.display = 'block';
        followersSection.style.display = 'block';
        chartsRow.style.display = 'grid';
        goalsSection.style.display = 'block';
        accountsSection.style.display = 'block';

        if (view === 'actuals') {
            // Show only actual data (Jan 2026)
            updateDashboardForActuals();
        } else {
            // Show projections (default)
            updateDashboard();
        }
    }
}

// Update dashboard with actual data only (no projections)
function updateDashboardForActuals() {
    // For now, just show January data
    // In the future, this would show only confirmed actuals up to current date
    const savedMonth = currentMonth;
    currentMonth = 0; // January only
    updateDashboard();
    currentMonth = savedMonth;
}

// Update dashboard based on selected scenario
function updateDashboardWithScenario() {
    // This would update the charts to show the selected scenario data
    // For now, just refresh the revenue chart with scenario data
    updateRevenueExpensesChartWithScenario();
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

// Update current month/year display
function updateCurrentMonthYear() {
    document.getElementById('currentMonthYear').textContent = `${DATA.monthLabels[currentMonth]} ${currentYear}`;
}

// Update Monthly Financial Summary
function updateMonthlyFinancialSummary() {
    const revenue = currentYear === 2026 ? DATA.financial2026.revenue[currentMonth] : DATA.financial2025.revenue[currentMonth];
    const expenses = currentYear === 2026 ? DATA.financial2026.expenses[currentMonth] : DATA.financial2025.expenses[currentMonth];
    const profit = revenue - expenses;
    const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

    // Revenue
    document.getElementById('monthlyRevenueValue').textContent = formatCurrency(revenue);

    // Calculate pacing for revenue (comparing to monthly target)
    const monthlyRevenueTarget = DATA.goals.revenue / 12;
    const revenuePacingPercent = ((revenue / monthlyRevenueTarget) * 100).toFixed(1);
    const revenuePacing = getPacingStatus(revenue, monthlyRevenueTarget);
    document.getElementById('monthlyRevenuePacing').textContent = revenuePacing.text;
    document.getElementById('monthlyRevenuePacing').className = `pacing ${revenuePacing.class}`;

    const revenueToGoal = ((revenue / monthlyRevenueTarget) * 100).toFixed(1);
    document.getElementById('monthlyRevenueToGoal').textContent = `${revenueToGoal}% of monthly target`;

    const revenueProgress = Math.min((revenue / monthlyRevenueTarget) * 100, 100);
    document.getElementById('monthlyRevenueProgress').style.width = `${revenueProgress}%`;

    // Expenses
    document.getElementById('monthlyExpensesValue').textContent = formatCurrency(expenses);

    // Compare to last year same month
    const expensesLastYear = currentYear === 2026 ? DATA.financial2025.expenses[currentMonth] : 0;
    const expensesChange = expensesLastYear > 0 ? calculateYoYChange(expenses, expensesLastYear) : 0;
    const expensesChangeText = expensesChange >= 0 ? `↑ ${Math.abs(expensesChange).toFixed(1)}% YoY` : `↓ ${Math.abs(expensesChange).toFixed(1)}% YoY`;
    document.getElementById('monthlyExpensesChange').textContent = expensesChangeText;

    const expensesProgress = revenue > 0 ? Math.min((expenses / revenue) * 100, 100) : 0;
    document.getElementById('monthlyExpensesProgress').style.width = `${expensesProgress}%`;

    // Profit
    document.getElementById('monthlyProfitValue').textContent = formatCurrency(profit);
    document.getElementById('profitMargin').textContent = `${profitMargin}% margin`;

    const profitProgress = revenue > 0 ? Math.min((profit / revenue) * 100, 100) : 0;
    document.getElementById('monthlyProfitProgress').style.width = `${profitProgress}%`;

    // Bank Balance
    document.getElementById('bankBalanceValue').textContent = formatCurrency(DATA.bankBalance);
}

// Update Yearly Financial Summary
function updateYearlyFinancialSummary() {
    const ytdRevenue = getYTDSum(DATA.financial2026.revenue, currentMonth);
    const ytdExpenses = getYTDSum(DATA.financial2026.expenses, currentMonth);
    const ytdProfit = ytdRevenue - ytdExpenses;
    const ytdProfitMargin = ytdRevenue > 0 ? ((ytdProfit / ytdRevenue) * 100).toFixed(1) : 0;

    // YTD Revenue
    document.getElementById('ytdRevenueValue').textContent = formatCurrency(ytdRevenue);

    // Calculate expected revenue based on time elapsed
    const monthsElapsed = currentMonth + 1;
    const expectedRevenue = (DATA.goals.revenue / 12) * monthsElapsed;
    const revenuePacing = getPacingStatus(ytdRevenue, expectedRevenue);
    document.getElementById('ytdRevenuePacing').textContent = revenuePacing.text;
    document.getElementById('ytdRevenuePacing').className = `pacing ${revenuePacing.class}`;

    const ytdRevenueToGoal = ((ytdRevenue / DATA.goals.revenue) * 100).toFixed(1);
    document.getElementById('ytdRevenueToGoal').textContent = `${ytdRevenueToGoal}% to $45M goal`;

    document.getElementById('ytdRevenueProgressBar').style.width = `${Math.min(parseFloat(ytdRevenueToGoal), 100)}%`;

    // YTD Expenses
    document.getElementById('ytdExpensesValue').textContent = formatCurrency(ytdExpenses);

    const ytdExpensesLastYear = getYTDSum(DATA.financial2025.expenses, currentMonth);
    const ytdExpensesChange = calculateYoYChange(ytdExpenses, ytdExpensesLastYear);
    const ytdExpensesChangeText = ytdExpensesChange >= 0 ? `↑ ${Math.abs(ytdExpensesChange).toFixed(1)}% vs 2025` : `↓ ${Math.abs(ytdExpensesChange).toFixed(1)}% vs 2025`;
    document.getElementById('ytdExpensesVsLast').textContent = ytdExpensesChangeText;

    // YTD Profit
    document.getElementById('ytdProfitValue').textContent = formatCurrency(ytdProfit);
    document.getElementById('ytdProfitMargin').textContent = `${ytdProfitMargin}% margin`;

    const ytdProfitLastYear = getYTDSum(DATA.financial2025.revenue, currentMonth) - getYTDSum(DATA.financial2025.expenses, currentMonth);
    const ytdProfitChange = ytdProfitLastYear > 0 ? calculateYoYChange(ytdProfit, ytdProfitLastYear) : 0;
    const ytdProfitChangeText = ytdProfitChange >= 0 ? `↑ ${Math.abs(ytdProfitChange).toFixed(1)}% vs 2025` : `↓ ${Math.abs(ytdProfitChange).toFixed(1)}% vs 2025`;
    document.getElementById('ytdProfitVsLast').textContent = ytdProfitChangeText;
}

// Update Follower Metrics
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
        document.getElementById(platform + 'Growth').textContent = '↑ ' + formatFollowers(Math.abs(change));

        // Calculate percent to individual platform goal (proportional)
        const platformGoalPortion = (DATA.goals.followers / 6); // Simplified: equal distribution
        const platformPercent = ((count2026 / platformGoalPortion) * 100).toFixed(1);
        document.getElementById(platform + 'ToGoal').textContent = `${platformPercent}%`;
    });

    // Total followers
    document.getElementById('totalFollowers').textContent = formatFollowers(total2026);

    // Calculate pacing for followers
    const monthsElapsed = currentMonth + 1;
    const expectedFollowers = (DATA.goals.followers / 12) * monthsElapsed;
    const followersPacing = getPacingStatus(total2026, expectedFollowers);
    document.getElementById('followersPacing').textContent = followersPacing.text;
    document.getElementById('followersPacing').className = `pacing ${followersPacing.class}`;

    const followersToGoal = ((total2026 / DATA.goals.followers) * 100).toFixed(1);
    document.getElementById('followersToGoal').textContent = `${followersToGoal}% to 18M`;

    document.getElementById('followersProgressBar').style.width = `${Math.min(parseFloat(followersToGoal), 100)}%`;
}

// Get pacing status (ahead, on-track, behind)
function getPacingStatus(actual, expected) {
    const diff = ((actual - expected) / expected) * 100;

    if (diff >= 10) {
        return { text: '🚀 Ahead of Pace', class: 'ahead' };
    } else if (diff >= -10) {
        return { text: '✓ On Track', class: 'on-track' };
    } else {
        return { text: '⚠️ Behind Pace', class: 'behind' };
    }
}

// Helper function to calculate YoY change
function calculateYoYChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
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
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        },
        {
            label: '2026 Expenses',
            data: DATA.financial2026.expenses,
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
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
            borderColor: '#86efac',
            backgroundColor: 'rgba(134, 239, 172, 0.05)',
            borderWidth: 2,
            tension: 0.4,
            borderDash: [2, 2]
        });
        datasets.push({
            label: '2025 Expenses',
            data: DATA.financial2025.expenses,
            borderColor: '#fca5a5',
            backgroundColor: 'rgba(252, 165, 165, 0.05)',
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
                            size: 10,
                            weight: '600'
                        },
                        padding: 10,
                        usePointStyle: true,
                        boxWidth: 6
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
                            size: 9
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
                            size: 9
                        }
                    }
                }
            }
        }
    });
}

// Update Revenue vs Expenses Chart with Scenario Data
function updateRevenueExpensesChartWithScenario() {
    const ctx = document.getElementById('revenueExpensesChart').getContext('2d');

    // Destroy existing chart if it exists
    if (revenueExpensesChart) {
        revenueExpensesChart.destroy();
    }

    const scenario = DATA.scenarios[selectedScenario];

    // Calculate monthly target line (linear progression to goal)
    const monthlyTarget = DATA.goals.revenue / 12;
    const targetLine = Array(12).fill(monthlyTarget);

    const datasets = [
        {
            label: `${scenario.name} Revenue`,
            data: scenario.revenue,
            borderColor: selectedScenario === 'conservative' ? '#f97316' :
                         selectedScenario === 'upside' ? '#16a34a' : '#2563eb',
            backgroundColor: selectedScenario === 'conservative' ? 'rgba(249, 115, 22, 0.1)' :
                             selectedScenario === 'upside' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        },
        {
            label: `${scenario.name} Expenses`,
            data: scenario.expenses,
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            borderDash: [5, 5]
        },
        {
            label: 'Monthly Target',
            data: targetLine,
            borderColor: '#6b7280',
            backgroundColor: 'transparent',
            borderWidth: 1,
            tension: 0,
            borderDash: [10, 5],
            pointRadius: 0
        }
    ];

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
                            size: 10,
                            weight: '600'
                        },
                        padding: 10,
                        usePointStyle: true,
                        boxWidth: 6
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
                            size: 9
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
                            size: 9
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
                    borderColor: '#ea580c',
                    backgroundColor: 'rgba(234, 88, 12, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#ea580c',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2
                },
                {
                    label: '2025 Total Followers',
                    data: total2025,
                    borderColor: '#fdba74',
                    backgroundColor: 'rgba(253, 186, 116, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    borderDash: [5, 5],
                    pointRadius: 2,
                    pointHoverRadius: 4
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
                            size: 10,
                            weight: '600'
                        },
                        padding: 10,
                        usePointStyle: true,
                        boxWidth: 6
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
                            size: 9
                        }
                    },
                    grid: {
                        color: 'rgba(234, 88, 12, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 9
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
    const avgFollowerGrowthPerMonth = monthsElapsed > 0 ? (ytdFollowers - getTotalFollowers(0, 2025)) / monthsElapsed : 0;

    const projectedRevenue = ytdRevenue + (avgRevenuePerMonth * monthsRemaining);
    const projectedFollowers = ytdFollowers + (avgFollowerGrowthPerMonth * monthsRemaining);

    // Revenue goal
    const revenuePercent = (ytdRevenue / DATA.goals.revenue) * 100;
    const revenueNeededPerMonth = monthsRemaining > 0 ? (DATA.goals.revenue - ytdRevenue) / monthsRemaining : 0;

    document.getElementById('revenueGoalCurrent').textContent = formatCurrency(ytdRevenue);
    document.getElementById('revenueGoalPercent').textContent = revenuePercent.toFixed(1) + '%';
    document.getElementById('revenueGoalProgress').style.width = Math.min(revenuePercent, 100) + '%';
    document.getElementById('revenueProjected').textContent = formatCurrency(projectedRevenue);
    document.getElementById('revenueNeeded').textContent = formatCurrency(Math.max(0, revenueNeededPerMonth));

    // Set status
    const revenueStatus = getGoalStatus(revenuePercent, monthsElapsed);
    const revenueStatusEl = document.getElementById('revenueGoalStatus');
    revenueStatusEl.textContent = revenueStatus.text;
    revenueStatusEl.className = 'status ' + revenueStatus.class;

    // Follower goal
    const followerPercent = (ytdFollowers / DATA.goals.followers) * 100;
    const followerNeededPerMonth = monthsRemaining > 0 ? (DATA.goals.followers - ytdFollowers) / monthsRemaining : 0;

    document.getElementById('followerGoalCurrent').textContent = formatFollowers(ytdFollowers);
    document.getElementById('followerGoalPercent').textContent = followerPercent.toFixed(1) + '%';
    document.getElementById('followerGoalProgress').style.width = Math.min(followerPercent, 100) + '%';
    document.getElementById('followerProjected').textContent = formatFollowers(Math.round(projectedFollowers));
    document.getElementById('followerNeeded').textContent = formatFollowers(Math.round(Math.max(0, followerNeededPerMonth)));

    // Set status
    const followerStatus = getGoalStatus(followerPercent, monthsElapsed);
    const followerStatusEl = document.getElementById('followerGoalStatus');
    followerStatusEl.textContent = followerStatus.text;
    followerStatusEl.className = 'status ' + followerStatus.class;
}

// Determine goal status based on progress vs time elapsed
function getGoalStatus(percentComplete, monthsElapsed) {
    const expectedPercent = (monthsElapsed / 12) * 100;
    const diff = percentComplete - expectedPercent;

    if (diff >= 5) {
        return { text: '✓ Ahead of Schedule', class: 'on-track' };
    } else if (diff >= -10) {
        return { text: '⚠️ Slightly Behind', class: 'behind' };
    } else {
        return { text: '🚨 Significantly Behind', class: 'behind' };
    }
}
