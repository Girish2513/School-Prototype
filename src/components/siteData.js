/**
 * @file Centralized data for the application.
 * This approach separates content from presentation, making the app
 * more maintainable and scalable.
 */

export const aboutSectionsData = [
  /**
   * Each object in this array represents a section in the "About Us" grid.
   * The `content` property can contain HTML, which will be rendered using `dangerouslySetInnerHTML`.
   */
  {
    id: 'principal-message',
    icon: 'fas fa-user-tie',
    title: "Principal's Message",
    content: `<blockquote class="highlight-blue">"Welcome to Navodaya High School, where we are deeply committed to fostering a nurturing and challenging environment. Our goal is to empower every student to reach their full potential, not just academically, but as compassionate and responsible global citizens."</blockquote><cite>– Dr. Evelyn Reed, Principal</cite>`,
    backgroundImage: '/images/principal-bg.png',
  },
  {
    id: 'vision-mission',
    icon: 'fas fa-bullseye',
    title: 'Vision & Mission',
    content: `<h3>Our Vision</h3><p>To be a leading institution in providing quality education, creating future leaders who are innovative, ethical, and socially responsible.</p><h3>Our Mission</h3><p>To provide a dynamic and supportive learning environment that encourages critical thinking, creativity, and a lifelong passion for learning.</p>`,
    backgroundImage: '/images/vision-bg.png',
  },
  {
    id: 'history',
    icon: 'fas fa-landmark',
    title: 'Our History',
    content: `<p>Established in 1998, Navodaya High School began with a simple yet powerful vision: to make quality education accessible. From a single building with just 50 students, we have grown into a sprawling campus that is now a second home to over 2,000 students. Our journey is a testament to our unwavering commitment to academic excellence.</p>`,
    backgroundImage: '/images/history-bg.png',
  },
  {
    id: 'faculty',
    icon: 'fas fa-chalkboard-teacher',
    title: 'Our Faculty',
    content: `<p>Our dedicated faculty are more than just teachers; they are mentors who guide our students on their journey of discovery and growth. With advanced degrees and a passion for education, they are the cornerstone of our academic success.</p>`,
    backgroundImage: '/images/faculty-bg.png',
  },
];

/**
 * Data for the "Admissions" scroll-stacking section.
 * Each object represents a panel in the stack. This data is used in the ScrollStack component
 * for displaying admissions information. Content is plain text for simplicity and security.
 * For extensibility, consider adding more fields like icons or links if needed.
 */
export const admissionsData = [
  {
    id: 'eligibility-criteria',
    title: "Eligibility Criteria",
    content: "Students from rural areas in classes 6 and 9. Admission through JNVST."
  },
  {
    id: 'admission-process',
    title: "Admission Process",
    content: "The selection process includes a written exam followed by document verification. No donation or capitation fee is required."
  },
  {
    id: 'important-dates',
    title: "Important Dates",
    content: "Application forms are available from [date]. Entrance exam on [date]. Results announced on [date]."
  },
  {
    id: 'reservation-policy',
    title: "Reservation Policy",
    content: "75% seats for rural candidates, 25% for urban. Reservation for girls, SC/ST, and disabled children as per government norms."
  }
];

export const testimonialsData = [
  { comment: "Best school experience ever!", name: "Alice Johnson" },
  { comment: "Teachers are very supportive.", name: "Bob Smith" },
  { comment: "Learned so much in a short time.", name: "Catherine Lee" },
  { comment: "Great extracurricular activities.", name: "Daniel Kim" },
  { comment: "Loved the friendly environment.", name: "Ella Brown" },
  { comment: "Facilities are top-notch.", name: "Frank Wilson" },
  { comment: "Highly recommend this school.", name: "Grace Taylor" },
  { comment: "My child is thriving here!", name: "Henry Davis" },
  { comment: "Innovative teaching methods.", name: "Isla Martinez" },
  { comment: "Staff is very approachable.", name: "Jack White" },
  { comment: "Focus on holistic development.", name: "Karen Lewis" },
  { comment: "Amazing art and music programs.", name: "Leo Clark" },
  { comment: "Strong academic curriculum.", name: "Mia Hall" },
  { comment: "Positive learning environment.", name: "Noah Allen" },
  { comment: "Encourages creativity and curiosity.", name: "Olivia Scott" },
];



/**
 * Data for the footer section.
 * Organized into sections for contact, social links, and quick links.
 * Externalizing this data improves maintainability; updates here propagate to the footer.
 * For scalability, add more sections or dynamic data from API.
 * For security, ensure links are validated if user-provided.
 */
export const footerData = {
  contact: {
    title: "Contact Us",
    address: "Navodaya High School<br />123 Education Lane, Knowledge City, 500001",
    email: "info@navodayahighschool.com",
    phone: "+91 12345 67890"
  },
  social: {
    title: "Follow Us",
    links: [
      { platform: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook-f", ariaLabel: "Visit our Facebook page" },
      { platform: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter", ariaLabel: "Visit our Twitter page" },
      { platform: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram", ariaLabel: "Visit our Instagram page" },
      { platform: "YouTube", url: "https://youtube.com", icon: "fab fa-youtube", ariaLabel: "Visit our YouTube channel" }
    ]
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { text: "About Us", href: "#about" },
      { text: "Admissions", href: "#admissions" },
      { text: "Academics", href: "#academics" },
      { text: "Contact Us", href: "#contact" }
    ]
  },
  copyright: `© ${new Date().getFullYear()} Navodaya High School. All Rights Reserved.`
};