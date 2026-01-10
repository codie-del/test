# Contrarian Thinking - CEO Dashboard

A beautiful, real-time business intelligence dashboard tracking revenue, expenses, profit, and social media followers for Contrarian Thinking.

## 🎯 2026 Goals

- **Revenue:** $45,000,000
- **Followers:** 18,000,000 across all platforms

## ✨ Features

### Current Features (Phase 1 - Mock Data)
- ✅ Financial overview (Revenue, Expenses, Profit, Bank Balance)
- ✅ Year-over-year comparisons
- ✅ Interactive revenue vs expenses chart
- ✅ Social media follower tracking (Instagram, YouTube, TikTok, Twitter/X, LinkedIn, Facebook)
- ✅ Follower growth trend visualization
- ✅ Goal progress tracking with on/off-track indicators
- ✅ Projected vs actual calculations
- ✅ Month/year selector
- ✅ Contrarian Thinking brand styling
- ✅ Responsive design

### Coming Soon (Phase 2 - API Integration)
- 🔄 Live Stripe revenue data
- 🔄 Real-time Chase Bank balance via Plaid
- 🔄 Automated social media follower counts
- 🔄 Historical data storage
- 🔄 Auto-refresh functionality
- 🔄 Excel/CSV upload option

## 🚀 Quick Start

### Option 1: Simple HTTP Server
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

### Option 2: Live Development Server
```bash
npm run dev
```

## 📊 Current Data (Mock)

The dashboard currently displays mock data based on realistic projections:

**Starting Point (January 2026):**
- Total Followers: ~11.67M (based on Notion screenshot)
- Monthly Revenue: ~$3.2M
- Bank Balance: $8.75M

**Platforms:**
- Instagram: 2.85M followers
- TikTok: 4.68M followers
- YouTube: 1.42M followers
- Twitter/X: 1.25M followers
- LinkedIn: 890K followers
- Facebook: 580K followers

## 🔌 Phase 2: API Integration Guide

### 1. Stripe API (Revenue Data)

**Steps:**
1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Secret Key** (starts with `sk_live_...`)
4. Store securely in `.env` file:
   ```
   STRIPE_SECRET_KEY=sk_live_your_key_here
   ```

**API Documentation:** https://stripe.com/docs/api

**What we'll pull:**
- Total revenue by month
- Revenue breakdown by product
- Payment trends

---

### 2. Chase Bank API via Plaid

**Steps:**
1. Sign up at [Plaid](https://plaid.com)
2. Create a free account (sandbox mode available)
3. Get your API credentials:
   - Client ID
   - Secret
   - Public Key
4. Add to `.env`:
   ```
   PLAID_CLIENT_ID=your_client_id
   PLAID_SECRET=your_secret
   PLAID_PUBLIC_KEY=your_public_key
   PLAID_ENV=sandbox  # or production
   ```

**Alternative:**
- Export monthly statements from Chase as Excel/CSV
- Upload to `data/` folder

**API Documentation:** https://plaid.com/docs/

**What we'll pull:**
- Current account balance (real-time)
- Transaction history for expense tracking

---

### 3. Social Media APIs

#### Instagram
**Requirements:**
- Facebook Developer Account
- Instagram Business Account
- Access to Instagram Graph API

**Steps:**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create an app → Choose "Business"
3. Add **Instagram Graph API**
4. Get Access Token
5. Add to `.env`:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_token
   INSTAGRAM_BUSINESS_ID=your_account_id
   ```

**API Docs:** https://developers.facebook.com/docs/instagram-api

**What we'll pull:**
- Follower count
- Engagement metrics
- Growth trends

---

#### YouTube
**Requirements:**
- Google Cloud Account
- YouTube Data API v3

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Add to `.env`:
   ```
   YOUTUBE_API_KEY=your_api_key
   YOUTUBE_CHANNEL_ID=your_channel_id
   ```

**API Docs:** https://developers.google.com/youtube/v3

**What we'll pull:**
- Subscriber count
- Video views
- Channel analytics

---

#### TikTok
**Requirements:**
- TikTok for Developers account
- Business/Creator account

**Steps:**
1. Go to [TikTok for Developers](https://developers.tiktok.com)
2. Create an app
3. Request display API access
4. Get Client Key and Secret
5. Add to `.env`:
   ```
   TIKTOK_CLIENT_KEY=your_client_key
   TIKTOK_CLIENT_SECRET=your_client_secret
   ```

**API Docs:** https://developers.tiktok.com/doc/display-api-getting-started

**What we'll pull:**
- Follower count
- Video performance
- Engagement data

---

#### Twitter/X
**Requirements:**
- Twitter Developer Account
- Elevated access (may require approval)

**Steps:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create an app
3. Apply for Elevated access
4. Get API keys
5. Add to `.env`:
   ```
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   ```

**API Docs:** https://developer.twitter.com/en/docs/twitter-api

**What we'll pull:**
- Follower count
- Tweet impressions
- Engagement metrics

---

#### LinkedIn
**Requirements:**
- LinkedIn Developer Account
- Company/Personal Page access

**Steps:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
2. Create an app
3. Request Marketing Developer Platform access
4. Get Client ID and Secret
5. Add to `.env`:
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   LINKEDIN_PAGE_ID=your_page_id
   ```

**API Docs:** https://docs.microsoft.com/en-us/linkedin/

**What we'll pull:**
- Follower count
- Post analytics
- Page statistics

---

#### Facebook
**Requirements:**
- Facebook Developer Account
- Facebook Page

**Steps:**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create app → Business
3. Add **Facebook Login** and **Page Insights**
4. Get Page Access Token
5. Add to `.env`:
   ```
   FACEBOOK_ACCESS_TOKEN=your_token
   FACEBOOK_PAGE_ID=your_page_id
   ```

**API Docs:** https://developers.facebook.com/docs/graph-api

**What we'll pull:**
- Page likes/followers
- Post reach
- Engagement metrics

---

## 📁 Alternative: Excel/CSV Upload Method

**If API setup is too complex, you can:**

1. Create a spreadsheet with this structure:

```csv
Month,Revenue,Expenses,Instagram,YouTube,TikTok,Twitter,LinkedIn,Facebook
Jan 2026,3200000,2100000,2850000,1420000,4680000,1250000,890000,580000
Feb 2026,3450000,2150000,3020000,1510000,4960000,1325000,945000,615000
```

2. Save as `data/monthly_metrics.csv`
3. Upload to the dashboard
4. Data will auto-update

**Benefits:**
- No API setup needed
- Full control over data
- Easy to update manually
- Works offline

## 🎨 Customization

### Update Goals
Edit `data.js`:
```javascript
goals: {
    revenue: 45000000,      // Change to your revenue goal
    followers: 18000000     // Change to your follower goal
}
```

### Update Colors
Edit `styles.css`:
```css
:root {
    --primary: #52130C;     // Main brand color
    --secondary: #713718;   // Secondary color
    --accent: #B5605A;      // Accent color
    ...
}
```

### Update Logo
Replace the SVG in `index.html` at line ~31, or add an image:
```html
<img src="your-logo.png" alt="CT Logo" width="60">
```

## 📱 Mobile Responsive

The dashboard is fully responsive and works on:
- Desktop (1920x1080+)
- Laptop (1366x768+)
- Tablet (768x1024+)
- Mobile (375x667+)

## 🔒 Security Notes

**IMPORTANT:** Never commit API keys to GitHub!

1. Create `.env` file (already in `.gitignore`)
2. Store all sensitive keys there
3. Use environment variables in production
4. Rotate keys regularly

## 🛠 Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Charts:** Chart.js 4.4.1
- **Styling:** Custom CSS with Contrarian Thinking branding
- **Fonts:** Playfair Display (headings), Inter (body)
- **Future Backend:** Node.js/Express (for API integration)

## 📈 Roadmap

### Phase 1: ✅ COMPLETE
- Mock data dashboard
- Beautiful UI with CT branding
- All visualizations and metrics

### Phase 2: 🔄 IN PROGRESS
- API integrations
- Real-time data
- Database setup

### Phase 3: 🔮 PLANNED
- Email reports
- Slack/Discord notifications
- Mobile app
- Advanced analytics
- Team member access

## 🐛 Troubleshooting

**Charts not loading?**
- Check browser console for errors
- Ensure Chart.js CDN is accessible
- Try hard refresh (Ctrl+Shift+R)

**Data not updating?**
- Click the refresh button
- Check month/year selectors
- Verify data.js is loaded

**Styling issues?**
- Clear browser cache
- Check if styles.css is loaded
- Try different browser

## 📞 Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Contact development team

## 📄 License

Proprietary - Contrarian Thinking © 2026

---

**Built with ❤️ for Contrarian Thinking**
