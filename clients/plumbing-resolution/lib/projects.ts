/**
 * Project portfolio data. Facts (units, contract values, scopes) trace to
 * the founder-supplied portfolio decks in intake/ — publishing client
 * names and contract values was confirmed by the founder on 2026-08-11.
 * Featured projects get a detail page at /projects/<slug>.
 */
export type Project = {
  slug: string;
  name: string;
  location: string;
  category: "multifamily" | "commercial";
  type: string;
  units?: string;
  value?: string;
  photo: string; // path under /public
  photoAlt: string;
  summary: string; // card line
  featured?: {
    facts: string[];
    body: string[];
    gallery?: { src: string; alt: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "1001-residences",
    name: "1001 Residences",
    location: "1001 S. Broad Street, Philadelphia, PA",
    category: "multifamily",
    type: "Mixed-use renovation",
    units: "630 units",
    value: "$6.5M contract",
    photo: "/photos/1001-residences-kitchen.jpg",
    photoAlt: "Finished unit kitchen at 1001 Residences with stone backsplash",
    summary:
      "One of the largest residential projects in Philadelphia's history — full plumbing scope across 630 units, retail, and rooftop amenities.",
    featured: {
      facts: [
        "1001 S. Broad Street, Philadelphia",
        "630 multifamily units",
        "Mixed-use renovation",
        "$6.5M contract value",
      ],
      body: [
        "One of the largest residential projects in Philadelphia's history: a 630-unit redevelopment with first-floor retail and rooftop amenity spaces.",
        "Plumbing Resolution delivered the full plumbing scope — domestic water distribution, sanitary waste and vent, unit kitchens and bathrooms, water-heating systems, common-area and retail infrastructure, rooftop amenity plumbing, and project-wide fixture installation.",
      ],
      gallery: [
        {
          src: "/photos/1001-residences-bathroom.jpg",
          alt: "Marble-tiled bathroom with glass shower at 1001 Residences",
        },
        {
          src: "/photos/1001-residences-rooftop-amenity.jpeg",
          alt: "Rooftop amenity terrace at 1001 Residences",
        },
        {
          src: "/photos/1001-residences-bathroom-2.jpg",
          alt: "Finished unit bathroom at 1001 Residences",
        },
      ],
    },
  },
  {
    slug: "piazza-alta",
    name: "Piazza Alta",
    location: "1099 Germantown Avenue, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up mixed-use",
    units: "680 units",
    value: "$6.8M contract",
    photo: "/photos/piazza-alta-kitchen.jpg",
    photoAlt: "Unit kitchen with island and marble backsplash at Piazza Alta",
    summary:
      "Ground-up, high-density development — 680 units with first-floor retail, rooftop amenities, and full water, waste, and gas systems.",
    featured: {
      facts: [
        "1099 Germantown Avenue, Philadelphia",
        "680 multifamily units",
        "Ground-up mixed-use new construction",
        "$6.8M contract value",
      ],
      body: [
        "A ground-up, high-density development of roughly 680 units with first-floor retail and extensive rooftop amenities in Northern Liberties.",
        "Our scope ran from underground sanitary systems through domestic water distribution, unit kitchens and baths, water heating, retail plumbing infrastructure, and the gas and plumbing systems serving rooftop and shared amenity spaces.",
      ],
      gallery: [
        {
          src: "/photos/piazza-alta-rooftop-amenity.jpg",
          alt: "Rooftop amenity deck with outdoor kitchen at Piazza Alta",
        },
        {
          src: "/photos/piazza-alta-gas-amenity.jpg",
          alt: "Gas-served outdoor amenity space at Piazza Alta",
        },
      ],
    },
  },
  {
    slug: "the-poplar",
    name: "The Poplar",
    location: "900 N. 9th Street, Philadelphia, PA",
    category: "multifamily",
    type: "Adaptive reuse",
    units: "285 units",
    value: "$4.7M contract",
    photo: "/photos/the-poplar-rooftop.jpeg",
    photoAlt: "Rooftop amenity space at The Poplar overlooking Philadelphia",
    summary:
      "A historic structure transformed into 285 apartments — new plumbing systems threaded through an existing frame.",
    featured: {
      facts: [
        "900 N. 9th Street, Philadelphia",
        "285 multifamily units",
        "Large-scale adaptive reuse",
        "$4.7M contract value",
      ],
      body: [
        "A historic structure transformed into a mixed-use community of 285 apartments with commercial space and extensive resident amenities.",
        "Adaptive reuse means building new systems inside an existing frame: we delivered residential plumbing throughout — domestic water, sanitary and vent piping, kitchens and bathrooms, common areas, and rooftop amenity plumbing — coordinated around the constraints of the original building.",
      ],
      gallery: [
        {
          src: "/photos/the-poplar-rooftop-amenity.jpg",
          alt: "Rooftop lounge seating at The Poplar",
        },
        {
          src: "/photos/the-poplar-amenity-kitchen.jpeg",
          alt: "Shared amenity kitchen at The Poplar",
        },
      ],
    },
  },
  {
    slug: "the-darien",
    name: "The Darien",
    location: "815 Poplar Street, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up construction",
    units: "212 units",
    value: "$2.4M contract",
    photo: "/photos/the-darien-kitchen.jpg",
    photoAlt: "Finished unit kitchen at The Darien",
    summary:
      "Ground-up construction of 212 units over first-floor retail — underground piping through fixture set.",
    featured: {
      facts: [
        "815 Poplar Street, Philadelphia",
        "212 multifamily units",
        "Ground-up new construction",
        "$2.4M contract value",
      ],
      body: [
        "Ground-up construction of 212 multifamily units over first-floor retail space.",
        "Full plumbing construction: underground piping, sanitary waste and vent, domestic water distribution, residential kitchens and bathrooms, fixtures and equipment connections, and commercial/retail infrastructure at grade.",
      ],
    },
  },
  {
    slug: "650-fairmount",
    name: "650 Fairmount",
    location: "650 Fairmount Street, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up residential",
    units: "107 townhomes",
    value: "$1.89M contract",
    photo: "/photos/650-fairmount-kitchen.jpg",
    photoAlt: "New-construction townhome kitchen at 650 Fairmount",
    summary:
      "107 new-construction townhomes — full plumbing repeated cleanly at neighborhood scale.",
    featured: {
      facts: [
        "650 Fairmount Street, Philadelphia",
        "107 townhomes",
        "Ground-up residential",
        "$1.89M contract value",
      ],
      body: [
        "A 107-townhome new-construction development — plumbing at neighborhood scale.",
        "Our team ran ground-up plumbing across the entire development: domestic water, sanitary and vent systems, kitchens and bathrooms, water heaters, and fixtures, repeated cleanly across a hundred-plus homes on a production schedule.",
      ],
    },
  },
  {
    slug: "trout-national-clubhouse",
    name: "Trout National — The Clubhouse",
    location: "Vineland, NJ",
    category: "commercial",
    type: "Private golf club — hospitality",
    photo: "/photos/trout-national-vineland.webp",
    photoAlt: "Clubhouse grounds at Trout National — The Reserve in Vineland, NJ",
    summary:
      "Commercial plumbing for the clubhouse of a championship private golf destination in South Jersey.",
    featured: {
      facts: [
        "Vineland, New Jersey",
        "Private golf club",
        "Clubhouse & hospitality construction",
      ],
      body: [
        "The clubhouse at Trout National — The Reserve, a private golf destination in South Jersey built around hospitality, dining, and member experience.",
        "Commercial plumbing construction for the clubhouse and its hospitality spaces: domestic water, sanitary and vent piping, fixtures and equipment connections, specialty plumbing systems, and coordination with other trades throughout construction.",
      ],
    },
  },
  {
    slug: "the-parker",
    name: "The Parker",
    location: "1301 Bainbridge Street, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up construction",
    units: "45 units",
    value: "$510k contract",
    photo: "/photos/the-parker-bathroom.jpg",
    photoAlt: "Finished unit bathroom at The Parker",
    summary: "45 units over first-floor retail in Bella Vista.",
  },
  {
    slug: "the-beverly",
    name: "The Beverly",
    location: "1102 Germantown Avenue, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up construction",
    units: "50 units",
    value: "$675k contract",
    photo: "/photos/the-beverly-bathroom.jpg",
    photoAlt: "Unit bathroom with walk-in shower at The Beverly",
    summary: "50 units with first-floor retail in Northern Liberties.",
  },
  {
    slug: "frankford-grand",
    name: "Frankford Grand",
    location: "1120 Frankford Avenue, Philadelphia, PA",
    category: "multifamily",
    type: "Ground-up construction",
    units: "107 units",
    value: "$1.6M contract",
    photo: "/photos/frankford-grand-rooftop-amenity.jpg",
    photoAlt: "Rooftop amenity terrace at Frankford Grand at dusk",
    summary: "107 units with first-floor retail and rooftop amenities in Fishtown.",
  },
  {
    slug: "dear-daphni",
    name: "Dear Daphni",
    location: "125 S. 20th Street, Philadelphia, PA",
    category: "commercial",
    type: "Restaurant fit-out",
    value: "$200k contract",
    photo: "/photos/dear-daphni-bar.jpg",
    photoAlt: "Finished bar at Dear Daphni restaurant",
    summary: "Full plumbing scope for a commercial kitchen and bar in Rittenhouse.",
  },
  {
    slug: "te-connectivity",
    name: "TE Connectivity",
    location: "680 E. Swedesford Road, Wayne, PA",
    category: "commercial",
    type: "Office fit-out",
    value: "$199k contract",
    photo: "/photos/te-connectivity.jpg",
    photoAlt: "TE Connectivity office campus in Wayne, PA",
    summary: "102,000 sq ft office fit-out on the Main Line.",
  },
  {
    slug: "philadelphia-federal-credit-union",
    name: "Philadelphia Federal Credit Union",
    location: "4300 Ridge Avenue, Philadelphia, PA",
    category: "commercial",
    type: "Bank tenant fit-out",
    value: "$200k contract",
    photo: "/photos/philadelphia-federal-credit-union.jpg",
    photoAlt: "Mixed-use building housing the Philadelphia Federal Credit Union branch",
    summary: "Branch fit-out for one of the region's largest credit unions.",
  },
  {
    slug: "ares-industrial",
    name: "Ares Industrial Management",
    location: "1801 N. 5th Street, Philadelphia, PA",
    category: "commercial",
    type: "Warehouse & office",
    value: "$162k contract",
    photo: "/photos/ares-industrial-management.jpg",
    photoAlt: "Aerial view of the Ares Industrial Management warehouse",
    summary: "Warehouse with first- and second-floor office space.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
