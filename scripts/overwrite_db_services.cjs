const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;
const dataPath = path.resolve(__dirname, '../seeding.json');

const detailedServices = [
    {
        title: "Residential Management",
        slug: "residential-management",
        description: "Comprehensive management that protects your investment and ensures tenant satisfaction at every level.",
        icon: "Home",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
        badge: "Featured",
        index: 1,
        delay: 0.05,
        contentPadding: "p-8",
        className: "min-h-[340px] md:min-h-[440px] lg:row-span-2",
        status: "published",
        tagline: "Residential Portfolio Care",
        heroDescription: "Full-service management for single-family homes, townhomes, and multi-family properties across South Carolina.",
        breadcrumbText: "Residential Management",
        overviewTitlePrefix: "Disciplined Care for",
        overviewTitleHighlight: "Residential Communities",
        overviewTitleSuffix: "",
        overview: "At First Choice Property Group, we treat your residential investment as our own. Our comprehensive services cover every aspect of property oversight, from rigorous tenant screening and lease administration to 24/7 maintenance dispatch and transparent financial reporting. We ensure your properties operate efficiently, retain their value, and deliver maximum return on investment.",
        overviewImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
        cta: { text: "Request a Proposal", link: "/contact" },
        features: [
            "Vetted Tenant Placement",
            "Direct ACH Rent Depositing",
            "Scheduled Inspections",
            "Emergency Maintenance SLA"
        ],
        benefitsBadge: "Our Core Advantages",
        benefitsTitlePrefix: "Designed for",
        benefitsTitleHighlight: "Peace of Mind",
        benefitsTitleSuffix: "",
        benefitsDescription: "We handle the day-to-day details so you can focus on growing your portfolio.",
        benefits: [
            { icon: "ShieldCheck", title: "Comprehensive Screening", description: "Our thorough multi-point background, credit, and employment verification ensures reliable tenants." },
            { icon: "TrendingUp", title: "Optimized Cash Flow", description: "Online payments and automated collections ensure rent is deposited directly to your account with zero delay." },
            { icon: "Clock", title: "24/7 Maintenance Dispatch", description: "Vetted local contractors are dispatched quickly to resolve maintenance requests and protect your asset value." },
            { icon: "ClipboardCheck", title: "Transparent Portals", description: "Access real-time financial statements, work orders, and occupancy reports 24/7 via our secure online portal." }
        ],
        processBadge: "Our Management Process",
        processTitlePrefix: "Simple &",
        processTitleHighlight: "Transparent",
        processTitleSuffix: "Steps",
        processDescription: "How we onboard and manage your residential properties.",
        process: [
            { icon: "Search", title: "Property Audit & Setup", description: "We conduct a comparative market analysis to price your property, coordinate any initial prep, and configure your portal." },
            { icon: "Users", title: "Marketing & Leasing", description: "We deploy aggressive digital listings, run multi-stage screening on applicants, and execute legally binding SC lease agreements." },
            { icon: "Settings", title: "Direct Operations", description: "Our team manages tenant relations, rent collections, maintenance requests, annual inspections, and renewals." }
        ],
        stats: [
            { icon: "Clock", value: "< 24h", label: "Response Guarantee", category: "SLA" },
            { icon: "TrendingUp", value: "98.4%", label: "Tenant Retention", category: "Performance" },
            { icon: "ShieldCheck", value: "100%", label: "Insured Contractors", category: "Compliance" },
            { icon: "Users", value: "8,500+", label: "Units Managed", category: "Scale" }
        ],
        faq: [
            { q: "How are maintenance requests handled?", a: "Tenants submit requests through their online portal. Emergency issues are handled immediately via our 24/7 dispatch line, while routine repairs are assigned to vetted contractors within 24 hours." },
            { q: "What is your tenant screening process?", a: "We run a nationwide criminal background check, credit check, eviction check, and verify employment and income (minimum 3x monthly rent), along with rental references." }
        ]
    },
    {
        title: "Commercial Management",
        slug: "commercial-management",
        description: "Strategic management for office, retail, and mixed-use properties focused on performance and long-term value.",
        icon: "Building2",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=85",
        index: 2,
        delay: 0.12,
        className: "min-h-[260px]",
        status: "published",
        tagline: "Commercial Asset Performance",
        heroDescription: "Strategic property management for retail spaces, office buildings, medical plazas, and mixed-use developments.",
        breadcrumbText: "Commercial Management",
        overviewTitlePrefix: "Strategic Focus on",
        overviewTitleHighlight: "Commercial Assets",
        overviewTitleSuffix: "",
        overview: "First Choice Property Group delivers Class A commercial asset management focused on lease compliance, cost containment, and long-term valuation. We oversee tenant relations, facilities maintenance, vendor bidding, and detailed financial reporting to ensure your commercial spaces operate at peak efficiency and retain high-caliber occupants.",
        overviewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=85",
        cta: { text: "Request a Proposal", link: "/contact" },
        features: [
            "CAM Reconciliation",
            "SLA Vendor Procurement",
            "Facilities Inspections",
            "Capital Improvement Planning"
        ],
        benefitsBadge: "Commercial Advantage",
        benefitsTitlePrefix: "Maximizing",
        benefitsTitleHighlight: "Asset Value",
        benefitsTitleSuffix: "",
        benefitsDescription: "We implement rigorous operational standards to ensure your commercial properties perform optimally.",
        benefits: [
            { icon: "TrendingUp", title: "Expense Management", description: "We audit operating expenses and implement strategic cost containment to maximize net operating income." },
            { icon: "ShieldCheck", title: "Compliance & Risk", description: "Our managers verify that all retail and office spaces comply with local zoning, fire, and safety regulations." },
            { icon: "Users", title: "High Retention Rates", description: "Proactive tenant relations and rapid response to building issues keep high-quality commercial tenants in place." },
            { icon: "ClipboardCheck", title: "Detailed Accounting", description: "Receive comprehensive monthly packages including CAM reconciliations, rent rolls, and cash flow analysis." }
        ],
        processBadge: "Management Process",
        processTitlePrefix: "Disciplined",
        processTitleHighlight: "Stewardship",
        processTitleSuffix: "Workflow",
        processDescription: "How we manage and maintain commercial property portfolios.",
        process: [
            { icon: "Search", title: "Asset Assessment", description: "We analyze current leases, review past operating expenses, and conduct a full facilities inspection." },
            { icon: "Handshake", title: "Lease Administration", description: "We coordinate tenant billing, lease options, renewals, and enforce property rules and regulations." },
            { icon: "Wrench", title: "Preventive Care", description: "Our team implements scheduled HVAC, electrical, and structural care protocols to prevent costly building repairs." }
        ],
        stats: [
            { icon: "Trophy", value: "98%", label: "Lease Renewal Rate", category: "Performance" },
            { icon: "Shield", value: "$1M+", label: "Vendor Insurance Minimum", category: "Security" },
            { icon: "Clock", value: "< 15m", label: "Emergency Dispatch", category: "SLA" },
            { icon: "Building", value: "1.2M", label: "Commercial Sq Ft Managed", category: "Scale" }
        ],
        faq: [
            { q: "Do you handle CAM reconciliations?", a: "Yes, we handle all Common Area Maintenance (CAM) reconciliations, billing, and auditing to ensure fair and accurate expense allocations." },
            { q: "How do you source commercial contractors?", a: "Every commercial vendor in our network is fully vetted, licensed, insured with a minimum of $1M general liability, and must meet strict performance SLAs." }
        ]
    },
    {
        title: "HOA Management",
        slug: "hoa-management",
        description: "Expert governance, compliance, and community support for well-managed associations.",
        icon: "UsersRound",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
        index: 3,
        delay: 0.18,
        className: "min-h-[260px]",
        status: "published",
        tagline: "Community Governance Excellence",
        heroDescription: "Professional HOA and Condominium Association management with transparent accounting and responsive board support.",
        breadcrumbText: "HOA Management",
        overviewTitlePrefix: "Elevating Standards in",
        overviewTitleHighlight: "Community Associations",
        overviewTitleSuffix: "",
        overview: "A well-managed community is built on trust, transparency, and consistent governance. First Choice Property Group supports HOA and condo boards with certified portfolio managers who guide compliance, coordinate vendor projects, execute objective covenant enforcement, and deliver pristine financial stewardship so your community remains beautiful and cohesive.",
        overviewImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
        cta: { text: "Request a Proposal", link: "/contact" },
        features: [
            "Certified Board Advising",
            "Automated Covenant Compliance",
            "Reserve Study Integration",
            "Online Owner Portals"
        ],
        benefitsBadge: "Governance Edge",
        benefitsTitlePrefix: "Partnering for",
        benefitsTitleHighlight: "Community Standards",
        benefitsTitleSuffix: "",
        benefitsDescription: "We provide boards with the structure and information needed to lead with confidence.",
        benefits: [
            { icon: "Award", title: "Certified Guidance", description: "Our team includes CMCA and AMS certified managers who understand SC community law and board procedures." },
            { icon: "ClipboardCheck", title: "Objective Enforcement", description: "Regular community drive-throughs generate documented covenant reports with photo proof for consistent standards." },
            { icon: "BadgeDollarSign", title: "Reserve Optimization", description: "We help boards plan for long-term expenditures and balance budgets without resorting to sudden assessments." },
            { icon: "Users", title: "Homeowner Engagement", description: "Owners enjoy convenient portals for dues payments, architectural request tracking, and community updates." }
        ],
        processBadge: "Management Standard",
        processTitlePrefix: "Board Support",
        processTitleHighlight: "Framework",
        processTitleSuffix: "",
        processDescription: "Our systematic approach to HOA administration and compliance.",
        process: [
            { icon: "Search", title: "Transition & Setup", description: "We audit previous financials, import owner rosters, and coordinate transition notifications." },
            { icon: "MessageCircle", title: "Board Alignment", description: "We establish clear communication channels, attend regular meetings, and support committee tasks." },
            { icon: "Settings", title: "Direct Operations", description: "Our office handles assessment collections, covenant monitoring, vendor dispatch, and compliance." }
        ],
        stats: [
            { icon: "Users", value: "30+", label: "Active Communities", category: "Scale" },
            { icon: "ShieldCheck", value: "100%", label: "Covenant Objectivity", category: "Standards" },
            { icon: "Clock", value: "24h", label: "Owner Inquiry SLA", category: "Service" },
            { icon: "Trophy", value: "17+", label: "Years Certified Care", category: "Experience" }
        ],
        faq: [
            { q: "How do you handle architectural requests (ARCs)?", a: "Homeowners submit ARC requests online through their portal. Our system routes them directly to the board/committee and tracks responses to ensure timely approvals." },
            { q: "Are your managers certified?", a: "Yes, our community managers hold professional credentials such as Certified Manager of Community Associations (CMCA) and Association Management Specialist (AMS)." }
        ]
    },
    {
        title: "Developer & Builder Services",
        slug: "developer-services",
        description: "Partnering with developers and builders to transition projects seamlessly into long-term operations.",
        icon: "HardHat",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=85",
        index: 4,
        delay: 0.24,
        className: "min-h-[260px]",
        status: "published",
        tagline: "Development & Transition Advisory",
        heroDescription: "Comprehensive transition planning, budget design, and operations setup for developers and builders throughout SC.",
        breadcrumbText: "Developer Services",
        overviewTitlePrefix: "Transition Solutions for",
        overviewTitleHighlight: "Developers & Builders",
        overviewTitleSuffix: "",
        overview: "Managing the transition from developer control to a homeowner-run board is critical for any new community. First Choice Property Group partners with builders and developers from the initial planning stages to structure governing documents, design realistic initial budgets, manage construction punch-lists, and coordinate a seamless handover that protects the builder's brand and establishes community harmony.",
        overviewImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=85",
        cta: { text: "Request a Proposal", link: "/contact" },
        features: [
            "Pro Forma Budgeting",
            "Covenant Formulation Reviews",
            "Builder-to-Board Handover",
            "Sales & Marketing Coordination"
        ],
        benefitsBadge: "Developer Edge",
        benefitsTitlePrefix: "Protecting",
        benefitsTitleHighlight: "Builder Brands",
        benefitsTitleSuffix: "",
        benefitsDescription: "We build operational stability during phases to protect the developer's reputation.",
        benefits: [
            { icon: "Award", title: "Risk Mitigation", description: "We review governing documents to prevent operational ambiguity and shield developers from transition liability." },
            { icon: "BadgeDollarSign", title: "Realistic Budgets", description: "Our pro forma budgets prevent initial deficits, ensuring the association is financially sound from day one." },
            { icon: "Handshake", title: "Seamless Transitions", description: "We manage the formal builder-to-board transition process, keeping owners informed and positive." },
            { icon: "ClipboardCheck", title: "Asset Inspections", description: "Our team coordinates detailed common area audits before handover to document conditions and resolve issues." }
        ],
        processBadge: "Turnover Process",
        processTitlePrefix: "Phased",
        processTitleHighlight: "Development Setup",
        processTitleSuffix: "",
        processDescription: "How we guide new construction projects to independent board operations.",
        process: [
            { icon: "Search", title: "Phase Planning", description: "We analyze development plans, draft governing documents, and establish the community's financial foundation." },
            { icon: "Settings", title: "Active Transition", description: "We manage billing for completed phases, coordinate developer contributions, and run preliminary board advisory." },
            { icon: "Handshake", title: "Formal Turnover", description: "We audit final accounts, host the transition meeting, and formally onboard the new homeowner directors." }
        ],
        stats: [
            { icon: "Building", value: "25+", label: "Successful Handovers", category: "Track Record" },
            { icon: "Shield", value: "100%", label: "Doc Compliance", category: "Legal" },
            { icon: "TrendingUp", value: "0", label: "Transition Deficits", category: "Financial" },
            { icon: "Users", value: "15+", label: "Builder Partners", category: "Network" }
        ],
        faq: [
            { q: "When should a developer engage a management company?", a: "Ideally, developers should engage us during the planning and document-drafting phase to ensure bylaws and budgets align with realistic management needs." },
            { q: "Do you handle builder contribution billing?", a: "Yes, we track and bill developer funding and assessments accurately based on completed phases and developer-owned lots." }
        ]
    },
    {
        title: "Financial Management",
        slug: "financial-management",
        description: "Transparent reporting, budgeting, and financial oversight you can always count on.",
        icon: "BadgeDollarSign",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=85",
        index: 5,
        delay: 0.3,
        className: "min-h-[260px]",
        status: "published",
        tagline: "Transparent Accounting Services",
        heroDescription: "Certified accounting, budgeting, collections, and financial compliance services for South Carolina communities.",
        breadcrumbText: "Financial Management",
        overviewTitlePrefix: "Disciplined Accounting &",
        overviewTitleHighlight: "Financial Stewardship",
        overviewTitleSuffix: "",
        overview: "For communities that prefer to handle their own physical operations but want professional financial management, First Choice Property Group offers dedicated accounting services. We manage assessment billing, electronic lockbox collections, delinquency processing, tax filings, and provide boards with pristine, double-entry financial reporting packages every month.",
        overviewImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=85",
        cta: { text: "Request a Proposal", link: "/contact" },
        features: [
            "Double-Entry Accounting",
            "ACH/Lockbox Collections",
            "Direct Invoice Payments",
            "Certified Auditing Support"
        ],
        benefitsBadge: "Fiduciary Edge",
        benefitsTitlePrefix: "Absolute",
        benefitsTitleHighlight: "Financial Security",
        benefitsTitleSuffix: "",
        benefitsDescription: "We implement strict financial checks and ledger maintenance to safeguard all funds.",
        benefits: [
            { icon: "ShieldCheck", title: "Fiduciary Security", description: "We enforce strict segregation of duties and double-entry ledger oversight to protect association funds." },
            { icon: "TrendingUp", title: "Delinquency Recovery", description: "Our automated notices and collections procedures minimize late assessments and maintain cash flow." },
            { icon: "Clock", title: "Timely Reporting", description: "Get comprehensive financial statements, including bank reconciliations and general ledgers, by the 10th of every month." },
            { icon: "ClipboardCheck", title: "Audit Preparedness", description: "All records are kept in CPA-ready format to streamline annual reviews and tax filings." }
        ],
        processBadge: "Accounting Process",
        processTitlePrefix: "Certified Ledger",
        processTitleHighlight: "Compliance",
        processTitleSuffix: "",
        processDescription: "How we collect, record, and report community funds.",
        process: [
            { icon: "Search", title: "Roster & Bank Setup", description: "We establish association-owned bank accounts, configure billing records, and mail payment instructions to owners." },
            { icon: "Settings", title: "Ongoing Billing & Pay", description: "We process lockbox deposits, handle direct ACH payments, draft vendor checks, and manage invoice approvals." },
            { icon: "ClipboardCheck", title: "Monthly Reporting", description: "Our accounting team reconciles all accounts and exports full financial packages for board review." }
        ],
        stats: [
            { icon: "Trophy", value: "< 3%", label: "Average Delinquency", category: "Performance" },
            { icon: "Shield", value: "100%", label: "Double-Entry Ledgers", category: "Standards" },
            { icon: "Clock", value: "10th", label: "Monthly Report Day", category: "Speed" },
            { icon: "BadgeDollarSign", value: "$45M", label: "Association Assets Managed", category: "Scale" }
        ],
        faq: [
            { q: "How are owner assessment payments made?", a: "Owners can pay electronically via online banking portals, direct ACH debit, or mail checks to our secure bank lockbox." },
            { q: "Can we use our own banks?", a: "We partner with top association banking institutions to ensure seamless lockbox integration, but we can review compatibility with other banks if needed." }
        ]
    }
];

async function run() {
    if (!uri) {
        console.error("MONGODB_URI not found in env variables!");
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB.");

        // Read seeding.json
        if (!fs.existsSync(dataPath)) {
            console.error(`Seeding file not found at: ${dataPath}`);
            process.exit(1);
        }

        const rawData = fs.readFileSync(dataPath, 'utf8');
        const jsonData = JSON.parse(rawData);

        // Inject the mapped services data structure
        jsonData.services = {
            badge: jsonData.sectionHeaders?.serviceDivisions?.badge || "Our Services",
            headline: {
                prefix: jsonData.sectionHeaders?.serviceDivisions?.heading1 || "Property Management",
                highlight: jsonData.sectionHeaders?.serviceDivisions?.heading2 || "Solutions That",
                suffix: jsonData.sectionHeaders?.serviceDivisions?.heading3 || "Perform"
            },
            description: jsonData.sectionHeaders?.serviceDivisions?.description || "From residential communities to commercial assets, we deliver expertise, transparency, and peace of mind.",
            services: detailedServices
        };

        // Also make sure serviceDivisions has the detailedServices in case components check there
        if (jsonData.serviceDivisions) {
            jsonData.serviceDivisions.services = detailedServices;
        }

        const dbs = ['realroof', 'eagle_revolution'];

        for (const dbName of dbs) {
            console.log(`Overwriting database: ${dbName}...`);
            const db = client.db(dbName);
            const collection = db.collection('site_contents');

            // Replace the key 'complete_data' document entirely to wipe any old fields/services
            const result = await collection.replaceOne(
                { key: 'complete_data' },
                {
                    key: 'complete_data',
                    data: jsonData,
                    lastUpdated: new Date()
                },
                { upsert: true }
            );

            console.log(`Successfully completed DB "${dbName}". Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
        }

        console.log("\nSeeding & services mapping completed successfully on all databases!");
    } catch (err) {
        console.error("Error during execution:", err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

run();
