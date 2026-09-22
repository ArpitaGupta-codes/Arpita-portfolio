export const SOCIAL_LINKS = {
  github: "https://github.com/ArpitaGupta-codes",
  linkedin: "https://www.linkedin.com/in/arpita-gupta-91ba29380",
  email: "arpitaguptarvps066@gmail.com",
};

export const PROFILE = {
  name: "Arpita Kumari Gupta",
  role: "BCA Graduate & Web Developer",
  location: "Patna, Bihar, India",
  availability: "Open to internships, entry-level jobs and junior roles",
};

// Two-tier skills list, matched exactly to what is confirmed: skills already
// in active use, and Java, which is explicitly still being learned. React,
// Node.js and Express are deliberately NOT listed here — they are used inside
// the Smart Kirana project (see SMART_KIRANA.techStack below) but are not yet
// claimed as personal core skills.
export const SKILLS = {
  current: ["HTML", "CSS", "JavaScript", "MySQL", "SQL", "C"],
  learning: ["Java"],
};

export const EXPERIENCE = {
  title: "Tele Associate",
  company: "IndiaMART",
  status: "Current role",
  points: [
    "Customer and seller communication through calls and digital channels.",
    "Supporting profile-related updates and business communication workflows.",
    "Building professional communication and customer-handling experience alongside technical learning.",
  ],
};

// Vite automatically uses the correct base path for both local development
// and GitHub Pages deployment.
const IMAGE_BASE = `${import.meta.env.BASE_URL}images/smart-kirana`;

export const SMART_KIRANA = {
  title: "Smart Kirana Management System",
  summary:
    "A practical management system designed to organize products, stock, customers, purchases, sales and related store operations in one interface.",
  focus:
    "A multi-module BCA project built around real retail workflows, structured UI design and CRUD-oriented application thinking.",
  tags: [
    "Dashboard",
    "Products",
    "Stock",
    "Customers",
    "Sales / Billing",
    "Reports",
  ],

  // Technologies actually used inside this project's codebase — kept separate
  // from personal skills above so it isn't mistaken for a general skill claim.
  techStack: ["React", "Node.js", "Express", "MySQL"],

  github: SOCIAL_LINKS.github,

  featured: {
    title: "Main Dashboard",
    image: `${IMAGE_BASE}/01-featured/main-dashboard.png`,
  },

  modules: [
    [
      "Product Management",
      "Products",
      "Product catalog with stock quantities and pricing details.",
      `${IMAGE_BASE}/02-key-modules/01-product-management.png`,
    ],
    [
      "Stock Management",
      "Inventory",
      "Stock adjustment interface with inventory information.",
      `${IMAGE_BASE}/02-key-modules/02-stock-management.png`,
    ],
    [
      "Customer Management",
      "Customers",
      "Customer records and management interface.",
      `${IMAGE_BASE}/02-key-modules/03-customer-management.png`,
    ],
    [
      "Sales & Billing",
      "Sales",
      "Sales and billing interface for daily operations.",
      `${IMAGE_BASE}/02-key-modules/04-sales-billing.png`,
    ],
    [
      "Purchases",
      "Purchases",
      "Purchase entry and supplier-side inventory workflow.",
      `${IMAGE_BASE}/02-key-modules/05-purchases.png`,
    ],
    [
      "Reports",
      "Reports",
      "Business reports and summary information.",
      `${IMAGE_BASE}/02-key-modules/06-reports.png`,
    ],
  ],

  galleryGroups: [
    [
      "Authentication",
      [
        [
          "Login",
          `${IMAGE_BASE}/03-gallery/01-authentication/login.png`,
        ],
      ],
    ],

    [
      "Dashboard",
      [
        [
          "Dashboard Overview",
          `${IMAGE_BASE}/03-gallery/02-dashboard/dashboard-overview.png`,
        ],
        [
          "Dashboard Analytics",
          `${IMAGE_BASE}/03-gallery/02-dashboard/dashboard-analytics.png`,
        ],
        [
          "Recent Activity",
          `${IMAGE_BASE}/03-gallery/02-dashboard/recent-activity.png`,
        ],
      ],
    ],

    [
      "Products",
      [
        [
          "Product Management",
          `${IMAGE_BASE}/03-gallery/03-products/product-management.png`,
        ],
        [
          "Product Overview",
          `${IMAGE_BASE}/03-gallery/03-products/product-overview.png`,
        ],
      ],
    ],

    [
      "Categories",
      [
        [
          "Category List",
          `${IMAGE_BASE}/03-gallery/04-categories/category-list.png`,
        ],
        [
          "Category Form",
          `${IMAGE_BASE}/03-gallery/04-categories/category-form.png`,
        ],
      ],
    ],

    [
      "Stock",
      [
        [
          "Stock Management",
          `${IMAGE_BASE}/03-gallery/05-stock/stock-management.png`,
        ],
        [
          "Stock History",
          `${IMAGE_BASE}/03-gallery/05-stock/stock-history.png`,
        ],
      ],
    ],

    [
      "Suppliers",
      [
        [
          "Supplier Management",
          `${IMAGE_BASE}/03-gallery/06-suppliers/supplier-management.png`,
        ],
      ],
    ],

    [
      "Customers",
      [
        [
          "Customer List",
          `${IMAGE_BASE}/03-gallery/07-customers/customer-list.png`,
        ],
        [
          "Customer Form",
          `${IMAGE_BASE}/03-gallery/07-customers/customer-form.png`,
        ],
      ],
    ],

    [
      "Purchases",
      [
        [
          "Purchase Entry",
          `${IMAGE_BASE}/03-gallery/08-purchases/purchase-entry.png`,
        ],
        [
          "Purchase Form",
          `${IMAGE_BASE}/03-gallery/08-purchases/purchase-form.png`,
        ],
        [
          "Purchase History",
          `${IMAGE_BASE}/03-gallery/08-purchases/purchase-history.png`,
        ],
      ],
    ],

    [
      "Sales & Billing",
      [
        [
          "Sales & Billing",
          `${IMAGE_BASE}/03-gallery/09-sales-billing/sales-billing.png`,
        ],
        [
          "Billing History",
          `${IMAGE_BASE}/03-gallery/09-sales-billing/billing-history.png`,
        ],
        [
          "Sales History",
          `${IMAGE_BASE}/03-gallery/09-sales-billing/sales-history.png`,
        ],
      ],
    ],

    [
      "Credit",
      [
        [
          "Credit Management",
          `${IMAGE_BASE}/03-gallery/10-credit/credit-management.png`,
        ],
        [
          "Credit History",
          `${IMAGE_BASE}/03-gallery/10-credit/credit-history.png`,
        ],
      ],
    ],

    [
      "Expenses",
      [
        [
          "Expense Form",
          `${IMAGE_BASE}/03-gallery/11-expenses/expense-form.png`,
        ],
        [
          "Expense History",
          `${IMAGE_BASE}/03-gallery/11-expenses/expense-history.png`,
        ],
      ],
    ],

    [
      "Reports",
      [
        [
          "Reports Overview",
          `${IMAGE_BASE}/03-gallery/12-reports/reports-overview.png`,
        ],
        [
          "Sales Report",
          `${IMAGE_BASE}/03-gallery/12-reports/report-sales.png`,
        ],
        [
          "Purchase Report",
          `${IMAGE_BASE}/03-gallery/12-reports/report-purchases.png`,
        ],
        [
          "Report Summary",
          `${IMAGE_BASE}/03-gallery/12-reports/report-summary.png`,
        ],
        [
          "Report Details",
          `${IMAGE_BASE}/03-gallery/12-reports/report-details.png`,
        ],
      ],
    ],

    [
      "Users",
      [
        [
          "User Management",
          `${IMAGE_BASE}/03-gallery/13-users/user-management.png`,
        ],
      ],
    ],
  ],
};

export const FOCUS_AREAS = [
  "Building projects with HTML, CSS & JavaScript",
  "SQL & database fundamentals (MySQL)",
  "Learning Java and core programming concepts",
  "SEO and digital marketing basics",
];