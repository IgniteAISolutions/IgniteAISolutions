# AI Readiness Scorecard | Ignite AI Solutions

A comprehensive AI readiness assessment tool that helps UK SMEs evaluate their organizational capability across 6 critical dimensions.

**Live App:** https://scorecard.igniteaisolutions.co.uk/

## 📊 What It Does

70-85% of AI initiatives fail due to organizational readiness—not technology. This scorecard helps businesses:

- **Assess AI Maturity**: Get a clear score across 6 dimensions that predict AI success
- **Identify Blind Spots**: Discover your organization's strengths and weaknesses
- **Prioritize Actions**: Receive actionable recommendations for your weakest area
- **Track Leads**: Automatically capture and score prospects in Notion

## 🎯 Assessment Dimensions

1. **Leadership Gravity** (20%) - Executive buy-in and strategic alignment
2. **Cultural Resilience** (20%) - Change readiness and adaptability
3. **Skill Visibility** (15%) - Data and AI capabilities
4. **Champion Density** (15%) - Internal advocates and expertise
5. **Governance Confidence** (15%) - Risk management and compliance
6. **Capacity Direction** (15%) - Resources and strategic focus

## 🚀 Features

- **3-Minute Assessment**: 11 carefully designed questions
- **Instant Results**: Visual radar chart and detailed breakdown
- **Lead Capture**: Integrated with GoHighLevel and Notion
- **SEO Optimized**: Full Open Graph, Twitter Cards, and JSON-LD support
- **Print-Friendly**: Optimized for PDF export
- **Mobile Responsive**: Works perfectly on all devices
- **UTM Tracking**: Automatic campaign attribution

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd IgniteAISolutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional - for Notion integration)
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Notion Integration Token:
   ```
   VITE_NOTION_TOKEN=secret_your_token_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔗 Integrations

### GoHighLevel (GHL) Webhook
- **Status**: ✅ Active
- **Trigger**: On form submission
- **Payload**: Name, email, company, role, turnover, UTM params

### Notion Integration
- **Status**: ⚙️ Configurable (optional)
- **Database ID**: `e6af817ea8c040a49793df0a513311a6`
- **Trigger**: On form submission + quiz completion
- **Data Captured**:
  - Lead information (name, email, company, etc.)
  - Lead source (AI Readiness Scorecard, Lead Magnet, Survey, etc.)
  - UTM parameters for attribution
  - Quiz score and risk level
  - Weakest dimension and recommendations

#### Setting Up Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "AI Readiness Scorecard"
4. Copy the "Internal Integration Token"
5. Open your Notion database
6. Click "..." → "Add connections" → Select your integration
7. Add the token to your `.env` file

**Required Notion Database Properties:**
- Name (Title)
- Email (Email)
- Company (Rich Text)
- Job Title (Rich Text)
- Turnover (Select): "<1M", "1M-10M", "10M-50M", "50M+"
- Lead Source (Select): "AI Readiness Scorecard", "Lead Magnet", "Survey", "Lead Response Crisis Form"
- UTM Source (Rich Text)
- UTM Medium (Rich Text)
- UTM Campaign (Rich Text)
- Timestamp (Date)
- Score (Number)
- Risk Level (Select): "High Risk", "At Risk", "Building Capability", "Ready", "Strong"
- Weakest Dimension (Rich Text)
- Segment (Select): "Unsure", "Exploring", "Experimenting", "Piloting", "Scaling", "Embedded"
- Status (Select): "New Lead", "Quiz Started", "Quiz Completed", "Contacted", "Qualified", "Unqualified"

### Lead Source Tracking

Track where leads come from by adding a `?source=` parameter to the URL:

- `?source=AI Readiness Scorecard` (default)
- `?source=Lead Magnet`
- `?source=Survey`
- `?source=Lead Response Crisis Form`

Example: `https://scorecard.igniteaisolutions.co.uk/?source=Lead%20Magnet&utm_source=linkedin&utm_medium=social&utm_campaign=q1_2026`

## 📁 Project Structure

```
IgniteAISolutions/
├── components/
│   ├── LandingPage.tsx    # Homepage with hero and features
│   ├── LeadForm.tsx        # Lead capture form
│   ├── Quiz.tsx            # 11-question assessment
│   ├── Results.tsx         # Score display and recommendations
│   ├── Button.tsx          # Reusable button component
│   └── ProgressBar.tsx     # Quiz progress indicator
├── utils/
│   ├── constants.ts        # Questions and scoring logic
│   ├── scoring.ts          # Score calculation engine
│   └── notion.ts           # Notion API integration
├── public/
│   ├── ignite-logo-full.svg   # Full company logo
│   ├── ignite-icon.svg        # Icon only (for small displays)
│   ├── favicon.svg            # Browser favicon
│   └── site.webmanifest       # PWA manifest
├── App.tsx                 # Main app orchestration
├── types.ts                # TypeScript type definitions
├── index.css               # Global styles and print optimization
└── index.html              # HTML template with SEO meta tags
```

## 🎨 Branding

**Colors:**
- Primary Orange: `#FF5200`
- Secondary Red: `#DC2626`
- Dark Background: `#0B0F19`
- Text Gray: `#E5E7EB`

**Font:**
- Plus Jakarta Sans (Google Fonts)

**Logo:**
- Dual-flame design (orange/blue)
- Circuit board pattern details

## 🧪 Testing

### End-to-End Test Checklist

- [ ] Landing page loads without errors
- [ ] Logo displays correctly (no flickering)
- [ ] Custom favicon appears in browser tab
- [ ] Navigation links work
- [ ] Form validation enforces all required fields
- [ ] Form submits successfully (check GHL webhook)
- [ ] Quiz displays all 11 questions correctly
- [ ] Progress bar updates smoothly
- [ ] Results page renders with radar chart
- [ ] Print/PDF export looks professional
- [ ] Mobile responsive on all pages
- [ ] No console errors
- [ ] SEO meta tags present in HTML source
- [ ] Notion integration captures lead (if configured)
- [ ] Notion updates with quiz score (if configured)

### Manual Testing

```bash
# Start dev server
npm run dev

# In browser:
1. Complete full user journey (landing → form → quiz → results)
2. Check browser console for errors
3. Test form validation (try submitting without GDPR consent)
4. Verify GHL webhook fires (check GHL dashboard)
5. If Notion configured: check database for new record
6. Test print view (Cmd/Ctrl + P)
7. Test on mobile device
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

### Deploy to Vercel

```bash
vercel
```

**Environment Variables (Vercel Dashboard):**
- `VITE_NOTION_TOKEN`: Your Notion integration token

### Deploy to Netlify

```bash
netlify deploy --prod
```

**Environment Variables (Netlify Dashboard):**
- `VITE_NOTION_TOKEN`: Your Notion integration token

## 📝 Recent Updates

### Phase 1A - Critical Bug Fixes ✅
- ✅ Fixed broken Button.tsx component (circular dependency removed)
- ✅ Added missing CSS classes (glass-nav, glass-panel, animate-fade-in)
- ✅ Created public directory with SVG logos and favicon
- ✅ Fixed logo flickering issue in navigation
- ✅ Added comprehensive SEO meta tags (Open Graph, Twitter Cards, JSON-LD)
- ✅ Preload logo to prevent loading delays

### Phase 1B - Notion Integration ⚙️
- ✅ Added lead source tracking to capture form origin
- ✅ Created Notion API helper with retry logic
- ✅ Integrated two-stage data capture (form → quiz completion)
- ✅ Added .env.example with setup instructions
- ✅ Updated .gitignore to protect environment variables

## 🤝 Support

For questions or support:
- **Website**: https://igniteaisolutions.co.uk
- **Email**: Contact via website
- **Company**: Ignite AI Solutions Ltd.
- **Address**: 79 Queens Road, Richmond, Surrey, TW10 6HJ, UK
- **Company No**: 16194166

## 📄 License

© 2026 Ignite AI Solutions Ltd. Built for UK Business.

---

**Built with ❤️ for organizations serious about AI success**
