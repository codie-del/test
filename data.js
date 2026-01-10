// REAL DATA for Contrarian Thinking Dashboard
// Updated with actual revenue and follower counts (January 2026)
// Data sources: Revenue spreadsheets + scraped social media follower counts

const DATA = {
    // 2026 Goals
    goals: {
        revenue: 45000000,      // $45M goal for 2026
        followers: 18000000     // 18M followers goal for 2026
    },

    // Current as of January 2026 (REAL DATA from web scraping)
    currentFollowers: {
        instagram: 3125000,     // 3.125M (@codiesanchez: 3M + @bigdeal.podcast: 98K + @contrarianthinking: 27K)
        youtube: 2060000,       // 2.06M (@CodieSanchezCT: 2.01M + @PodcastBigDeal: 50K est.)
        tiktok: 2000000,        // 2M (@realcodiesanchez)
        twitter: 660737,        // 660.7K (@Codie_Sanchez: 657.5K + @CTVentureCap: 3.2K)
        linkedin: 550000,       // 550K (estimated)
        facebook: 95000         // 95K (codiesanchezbiz)
    },

    // Financial data for 2026 (PROJECTED - starting from actual Jan 2026: $182K)
    financial2026: {
        // Monthly revenue projections (starting from real Jan data, scaling to $45M goal)
        revenue: [
            182136,   // Jan: $182K (ACTUAL from spreadsheet)
            2500000,  // Feb: $2.5M
            3200000,  // Mar: $3.2M
            3500000,  // Apr: $3.5M
            3700000,  // May: $3.7M
            3900000,  // Jun: $3.9M
            4100000,  // Jul: $4.1M
            4300000,  // Aug: $4.3M
            4500000,  // Sep: $4.5M
            4700000,  // Oct: $4.7M
            5000000,  // Nov: $5M
            5400000   // Dec: $5.4M
        ],
        // Monthly expenses projections (starting from real Jan data)
        expenses: [
            71041,    // Jan: $71K (ACTUAL from spreadsheet)
            1800000,  // Feb: $1.8M
            2300000,  // Mar: $2.3M
            2500000,  // Apr: $2.5M
            2600000,  // May: $2.6M
            2700000,  // Jun: $2.7M
            2850000,  // Jul: $2.85M
            2950000,  // Aug: $2.95M
            3100000,  // Sep: $3.1M
            3200000,  // Oct: $3.2M
            3350000,  // Nov: $3.35M
            3500000   // Dec: $3.5M
        ]
    },

    // Financial data for 2025 (ACTUAL DATA from revenue spreadsheet)
    financial2025: {
        revenue: [
            1516838,  // Jan: $1.52M (ACTUAL)
            3454530,  // Feb: $3.45M (ACTUAL)
            1326965,  // Mar: $1.33M (ACTUAL)
            996559,   // Apr: $997K (ACTUAL)
            1707492,  // May: $1.71M (ACTUAL)
            1409293,  // Jun: $1.41M (ACTUAL)
            1086772,  // Jul: $1.09M (ACTUAL)
            1587896,  // Aug: $1.59M (ACTUAL)
            4189190,  // Sep: $4.19M (ACTUAL)
            1356769,  // Oct: $1.36M (ACTUAL)
            2478247,  // Nov: $2.48M (ACTUAL)
            1279718   // Dec: $1.28M (ACTUAL)
        ],
        expenses: [
            1048103,  // Jan: $1.05M (ACTUAL)
            1356484,  // Feb: $1.36M (ACTUAL)
            1353672,  // Mar: $1.35M (ACTUAL)
            1433859,  // Apr: $1.43M (ACTUAL)
            1878827,  // May: $1.88M (ACTUAL)
            1447681,  // Jun: $1.45M (ACTUAL)
            1256364,  // Jul: $1.26M (ACTUAL)
            1924823,  // Aug: $1.92M (ACTUAL)
            1876885,  // Sep: $1.88M (ACTUAL)
            2225640,  // Oct: $2.23M (ACTUAL)
            1660487,  // Nov: $1.66M (ACTUAL)
            1009495   // Dec: $1.01M (ACTUAL)
        ]
    },

    // Follower growth for 2026 (REAL current + PROJECTED growth to 18M)
    followers2026: {
        // Instagram growth from 3.125M to ~5.5M
        instagram: [
            3125000, 3325000, 3525000, 3725000, 3925000, 4125000,
            4325000, 4525000, 4725000, 4925000, 5125000, 5325000
        ],
        // YouTube growth from 2.06M to ~3.2M
        youtube: [
            2060000, 2160000, 2260000, 2360000, 2460000, 2560000,
            2660000, 2760000, 2860000, 2960000, 3060000, 3160000
        ],
        // TikTok growth from 2M to ~4.5M (fastest growing platform)
        tiktok: [
            2000000, 2250000, 2500000, 2750000, 3000000, 3250000,
            3500000, 3750000, 4000000, 4200000, 4350000, 4500000
        ],
        // Twitter growth from 660K to ~1.5M
        twitter: [
            660737, 730000, 800000, 870000, 940000, 1010000,
            1080000, 1150000, 1220000, 1290000, 1360000, 1430000
        ],
        // LinkedIn growth from 550K to ~1.2M
        linkedin: [
            550000, 605000, 660000, 715000, 770000, 825000,
            880000, 935000, 990000, 1045000, 1100000, 1155000
        ],
        // Facebook growth from 95K to ~300K
        facebook: [
            95000, 115000, 135000, 155000, 175000, 195000,
            215000, 235000, 255000, 270000, 285000, 300000
        ]
    },

    // Follower growth for 2025 (ESTIMATED - ending at current Jan 2026 numbers)
    followers2025: {
        instagram: [
            1850000, 2000000, 2150000, 2300000, 2450000, 2600000,
            2650000, 2700000, 2800000, 2900000, 3000000, 3125000
        ],
        youtube: [
            920000, 1020000, 1120000, 1220000, 1320000, 1420000,
            1520000, 1620000, 1720000, 1820000, 1920000, 2060000
        ],
        tiktok: [
            680000, 800000, 920000, 1040000, 1160000, 1280000,
            1400000, 1520000, 1640000, 1760000, 1880000, 2000000
        ],
        twitter: [
            450000, 480000, 510000, 540000, 560000, 580000,
            590000, 600000, 610000, 625000, 640000, 660737
        ],
        linkedin: [
            280000, 310000, 340000, 370000, 400000, 430000,
            450000, 470000, 490000, 510000, 530000, 550000
        ],
        facebook: [
            50000, 55000, 60000, 65000, 70000, 75000,
            78000, 81000, 84000, 87000, 90000, 95000
        ]
    },

    // Bank balance (ACTUAL as of 1/8/2026 from spreadsheet)
    bankBalance: 3664551,  // $3.66M available cash balance (Chase: $1.67M + Morgan Stanley: $2.80M)

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
