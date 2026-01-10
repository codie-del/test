// Mock Data for Contrarian Thinking Dashboard
// Based on real goals: 18M followers and $45M revenue in 2026

const DATA = {
    // 2026 Goals
    goals: {
        revenue: 45000000,      // $45M
        followers: 18000000     // 18M
    },

    // Current as of January 2026 (based on Notion screenshot showing ~11.6M followers)
    currentFollowers: {
        instagram: 2850000,     // ~2.85M
        youtube: 1420000,       // ~1.42M
        tiktok: 4680000,        // ~4.68M
        twitter: 1250000,       // ~1.25M
        linkedin: 890000,       // ~890K
        facebook: 580000        // ~580K
    },

    // Financial data for 2026 (January through December)
    financial2026: {
        // Monthly revenue (scaled to reach ~$45M if growth continues)
        revenue: [
            3200000,  // Jan: $3.2M
            3450000,  // Feb: $3.45M
            3680000,  // Mar: $3.68M
            3850000,  // Apr: $3.85M
            3920000,  // May: $3.92M
            4100000,  // Jun: $4.1M
            4250000,  // Jul: $4.25M
            4380000,  // Aug: $4.38M
            4520000,  // Sep: $4.52M
            4680000,  // Oct: $4.68M
            4850000,  // Nov: $4.85M
            5020000   // Dec: $5.02M
        ],
        // Monthly expenses
        expenses: [
            2100000,  // Jan: $2.1M
            2150000,  // Feb: $2.15M
            2280000,  // Mar: $2.28M
            2380000,  // Apr: $2.38M
            2420000,  // May: $2.42M
            2550000,  // Jun: $2.55M
            2680000,  // Jul: $2.68M
            2750000,  // Aug: $2.75M
            2880000,  // Sep: $2.88M
            2950000,  // Oct: $2.95M
            3020000,  // Nov: $3.02M
            3100000   // Dec: $3.1M
        ]
    },

    // Financial data for 2025 (for year-over-year comparison)
    financial2025: {
        revenue: [
            2800000,  // Jan: $2.8M
            2900000,  // Feb: $2.9M
            3100000,  // Mar: $3.1M
            3050000,  // Apr: $3.05M
            3200000,  // May: $3.2M
            3350000,  // Jun: $3.35M
            3500000,  // Jul: $3.5M
            3450000,  // Aug: $3.45M
            3680000,  // Sep: $3.68M
            3750000,  // Oct: $3.75M
            3850000,  // Nov: $3.85M
            3920000   // Dec: $3.92M
        ],
        expenses: [
            2200000,  // Jan: $2.2M
            2250000,  // Feb: $2.25M
            2400000,  // Mar: $2.4M
            2380000,  // Apr: $2.38M
            2500000,  // May: $2.5M
            2620000,  // Jun: $2.62M
            2750000,  // Jul: $2.75M
            2700000,  // Aug: $2.7M
            2880000,  // Sep: $2.88M
            2920000,  // Oct: $2.92M
            3000000,  // Nov: $3M
            3050000   // Dec: $3.05M
        ]
    },

    // Follower growth for 2026 (by month)
    followers2026: {
        instagram: [
            2850000, 3020000, 3180000, 3350000, 3520000, 3690000,
            3860000, 4030000, 4200000, 4370000, 4540000, 4710000
        ],
        youtube: [
            1420000, 1510000, 1600000, 1690000, 1780000, 1870000,
            1960000, 2050000, 2140000, 2230000, 2320000, 2410000
        ],
        tiktok: [
            4680000, 4960000, 5240000, 5520000, 5800000, 6080000,
            6360000, 6640000, 6920000, 7200000, 7480000, 7760000
        ],
        twitter: [
            1250000, 1325000, 1400000, 1475000, 1550000, 1625000,
            1700000, 1775000, 1850000, 1925000, 2000000, 2075000
        ],
        linkedin: [
            890000, 945000, 1000000, 1055000, 1110000, 1165000,
            1220000, 1275000, 1330000, 1385000, 1440000, 1495000
        ],
        facebook: [
            580000, 615000, 650000, 685000, 720000, 755000,
            790000, 825000, 860000, 895000, 930000, 965000
        ]
    },

    // Follower growth for 2025 (for comparison)
    followers2025: {
        instagram: [
            1850000, 1950000, 2050000, 2150000, 2250000, 2350000,
            2450000, 2550000, 2650000, 2750000, 2800000, 2850000
        ],
        youtube: [
            920000, 980000, 1040000, 1100000, 1160000, 1220000,
            1280000, 1310000, 1340000, 1370000, 1390000, 1420000
        ],
        tiktok: [
            2680000, 2880000, 3080000, 3280000, 3480000, 3680000,
            3880000, 4080000, 4280000, 4380000, 4480000, 4680000
        ],
        twitter: [
            850000, 900000, 950000, 1000000, 1050000, 1100000,
            1130000, 1160000, 1190000, 1210000, 1230000, 1250000
        ],
        linkedin: [
            590000, 625000, 660000, 695000, 730000, 765000,
            790000, 815000, 840000, 860000, 875000, 890000
        ],
        facebook: [
            480000, 495000, 510000, 525000, 540000, 555000,
            560000, 565000, 570000, 575000, 578000, 580000
        ]
    },

    // Bank balance (current)
    bankBalance: 8750000,  // $8.75M current balance

    // Month labels
    monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

// Helper function to format currency
function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(1) + 'K';
    }
    return '$' + value.toLocaleString();
}

// Helper function to format followers
function formatFollowers(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString();
}

// Helper function to calculate total followers for a month
function getTotalFollowers(month, year) {
    const data = year === 2026 ? DATA.followers2026 : DATA.followers2025;
    return data.instagram[month] +
           data.youtube[month] +
           data.tiktok[month] +
           data.twitter[month] +
           data.linkedin[month] +
           data.facebook[month];
}

// Helper function to calculate YoY change
function calculateYoYChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

// Helper function to get current month index (0-11)
function getCurrentMonth() {
    return new Date().getMonth();
}

// Helper function to calculate year-to-date sum
function getYTDSum(array, endMonth) {
    return array.slice(0, endMonth + 1).reduce((sum, val) => sum + val, 0);
}
