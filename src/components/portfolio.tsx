import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "../lib/utils"

// Main App Component
export const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check system preference for dark mode
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeQuery.addEventListener("change", handleChange)

    return () => darkModeQuery.removeEventListener("change", handleChange)
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Navigation links
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  // Define color theme based on dark/light mode
  const theme = {
    primary: isDarkMode ? "#9d4edd" : "#7b2cbf",
    secondary: isDarkMode ? "#c77dff" : "#9d4edd",
    light: "#e0aaff",
    background: isDarkMode ? "#10002b" : "#f8f9fa",
    card: isDarkMode ? "#240046" : "#ffffff",
    text: isDarkMode ? "#f8f9fa" : "#212529",
    subtext: isDarkMode ? "#ced4da" : "#6c757d",
  }

  // Handle scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

// Handle printing CV
const handlePrintCV = () => {
    // Create link to CV file
    const cvPath = '/CV.pdf' 
    
    try {
        // Create temporary link element
        const link = document.createElement('a')
        link.href = cvPath
        link.download = 'Edgar-Mwila-CV.pdf'
        document.body.appendChild(link)
        
        // Trigger download
        link.click()
        
        // Clean up
        document.body.removeChild(link)
    } catch (error) {
        console.error('Error downloading CV:', error)
        alert('Sorry, there was an error downloading the CV. Please try again.')
    }
}

  return (
    <div
      className={cn("transition-all duration-300", isDarkMode ? "dark" : "")}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: theme.primary,
          padding: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}
          >
            Edgar Mwila
          </motion.div>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center gap-6" 
            style={{ 
              display: "none", 
              alignItems: "center", 
              gap: "1.5rem",
            }}
          >
            {/* Navigation Links */}
            <div 
              style={{ 
                display: "flex", 
                gap: "1.5rem" 
              }}
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: activeSection === link.id ? "white" : "rgba(255,255,255,0.7)",
                    padding: "0.5rem",
                    cursor: "pointer",
                    fontWeight: activeSection === link.id ? "bold" : "normal",
                    position: "relative",
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "white",
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons Container */}
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.75rem" 
              }}
            >
              {/* CV Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrintCV}
                style={{
                  backgroundColor: theme.light,
                  color: "#240046",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <Download size={16} />
                Download CV
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.75rem" 
            }}
            className="md:hidden"
          >
            {/* Mobile Dark Mode Toggle - Compact version */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                padding: "0.5rem",
                cursor: "pointer",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </motion.button>

            {/* Mobile Navigation Hamburger Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                borderRadius: "5px",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ☰
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Conditionally rendered */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: theme.primary,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              marginTop: "1rem",
              padding: "1rem",
            }}
            className="md:hidden"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    scrollToSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    backgroundColor: activeSection === link.id ? "rgba(255,255,255,0.1)" : "transparent",
                    border: "none",
                    color: "white",
                    padding: "0.75rem",
                    cursor: "pointer",
                    fontWeight: activeSection === link.id ? "bold" : "normal",
                    borderRadius: "5px",
                    textAlign: "left",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Download CV Button for Mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePrintCV}
                style={{
                  backgroundColor: theme.light,
                  color: "#240046",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.75rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <Download size={18} />
                Download CV
              </motion.button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Home Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              color: theme.primary,
              fontWeight: "bold",
            }}
          >
            Hello, I'm <span style={{ color: theme.secondary }}>Edgar Mwila</span>
          </h1>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "2rem",
              color: theme.subtext,
            }}
          >
            Full Stack Developer | Web & Mobile Applications
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            A results-driven developer with expertise in building scalable web and mobile applications. Proficient in
            both frontend and backend development, with a passion for creating seamless user experiences.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              style={{
                backgroundColor: theme.primary,
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Contact Me
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              style={{
                backgroundColor: "transparent",
                color: theme.primary,
                border: `2px solid ${theme.primary}`,
                borderRadius: "5px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              View My Work
            </motion.button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 px-4 md:px-8 flex flex-col justify-center min-h-screen"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 relative pb-3 text-primary">
            About Me
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-secondary" />
          </h2>

          <div className="items-center">
            {/* Text content */}
            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                I am a self-motivated and eager-spirited individual who is always pushing myself towards better. I love
                to learn and share knowledge, making me a valuable asset to any team.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                As a resourceful student skilled in programming, debugging, and software development, I offer a dynamic
                personality and a willingness to learn. My presence has been described as pleasant and positive by the
                majority of people I have interacted with.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                My morals are as unquestionable as my caliber. My character as sound as can be. I would be a great asset
                for any software firm looking for a dedicated and skilled developer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Name:</span> Edgar Mwila
                  </p>
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Experience:</span> 3+ Years
                  </p>
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Location:</span> Kafue, Zambia
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Email:</span> 
                    <a href="mailto:edgarmwila84@gmail.com" className="text-primary hover:underline">edgarmwila84@gmail.com</a>
                  </p>
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Phone:</span> 
                    <a href="tel:+260779846020" className="hover:underline">+260 779846020</a>
                  </p>
                  <p className="flex flex-wrap items-center">
                    <span className="font-semibold min-w-24">Freelance:</span> 
                    <span className="text-green-500">Available</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: theme.primary,
              position: "relative",
              paddingBottom: "0.5rem",
            }}
          >
            Professional Experience
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100px",
                height: "3px",
                backgroundColor: theme.secondary,
              }}
            />
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Timeline Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.primary}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.primary,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                10/2024 - Present
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Full Stack Developer</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>ByteNode | Lusaka, Zambia</h4>
              <p style={{ lineHeight: "1.8" }}>
                Working on assigned projects as a front-end, back-end, or full-stack developer. Developing scalable web
                applications using modern frameworks and technologies. Collaborating with cross-functional teams to
                deliver high-quality software solutions.
              </p>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.secondary}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.secondary,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                01/2025 - Present
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Front-End Developer</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>Alpha-C-Technologies | Kitwe, Copperbelt</h4>
              <p style={{ lineHeight: "1.8" }}>
                Developing front-end components and interfaces for assigned projects. Implementing responsive designs
                and ensuring cross-browser compatibility. Working with modern JavaScript frameworks to create
                interactive user experiences.
              </p>
            </motion.div>

            {/* Timeline Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.light}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.light,
                  color: theme.primary,
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                05/2024 - 09/2024
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Front-End Developer</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>Weiser Agencies | Panama, Panama</h4>
              <p style={{ lineHeight: "1.8" }}>
                Developed front-end applications and collaborated with the back-end team to solve technical challenges
                and drive solutions. Implemented responsive designs and optimized web performance. Worked with React.js
                and Next.js to build modern web applications.
              </p>
            </motion.div>

            {/* Timeline Item 4 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.secondary}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.secondary,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                02/2025 - Present
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Social Media Intern</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>Uniplexity AI | Kitwe, Copperbelt</h4>
              <p style={{ lineHeight: "1.8" }}>
                Managing social media accounts and engagement strategies for Uniplexity AI. Creating and scheduling
                content, analyzing performance metrics, and implementing growth strategies. Collaborating with the
                marketing team to develop effective social media campaigns.
              </p>
            </motion.div>
          </div>
        </motion.section>
 
        {/* Projects Section */}
        <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen flex flex-col justify-center mb-16"
        >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 relative pb-3" style={{ color: theme.primary }}>
          Featured Projects
          <span className="absolute bottom-0 left-0 w-24 h-1" style={{ backgroundColor: theme.secondary }} />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Project Card 1 - CBU Premier League Website */}
          <ProjectCard
            title="CBU Premier League Website"
            tech={["React.js", "Node.js", "MongoDB", "Express.js", "Socket.io"]}
            description="A comprehensive sports league management system developed for Copperbelt University's Premier League, featuring real-time match updates and detailed statistics."
            longDescription="This challenging project required implementing real-time updates for live matches using Socket.io, handling complex statistics calculations, and managing a large dataset of players and teams. I overcame performance issues by implementing efficient database indexing and data caching strategies. The authentication system uses JWT tokens with role-based access control for administrators, team managers, and regular users. The biggest challenge was ensuring data consistency across real-time updates, which I solved using optimistic UI updates and proper error handling."
            images={[
              { src: "/cpl/1.png", alt: "League standings", caption: "Real-time league standings with detailed statistics" },
              { src: "/cpl/2.png", alt: "Match details", caption: "Live match updates with player statistics" },
              { src: "/cpl/3.png", alt: "Team management", caption: "Comprehensive team management interface" },
              { src: "/cpl/4.png", alt: "Player profiles", caption: "Detailed player statistics and performance metrics" },
              { src: "/cpl/5.png", alt: "Match scheduler", caption: "Interactive fixture scheduling interface" },
              { src: "/cpl/6.png", alt: "Admin dashboard", caption: "Administrator control panel for league management" }
            ]}
            projectUrl="https://cbu-premier-league.com"
            githubUrl="https://github.com/Edgar-mwila/cbu-premier-league"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />

          {/* Project Card 2 - Expense Tracker */}
          <ProjectCard
            title="Expense Tracker"
            tech={["React.js", "Firebase", "Chart.js", "Material-UI", "TypeScript"]}
            description="A sophisticated personal finance application with real-time synchronization and advanced visualization features for expense tracking and budget management."
            longDescription="One of the main challenges was implementing complex data visualization while maintaining optimal performance. I utilized React's useMemo and useCallback hooks for performance optimization, implemented lazy loading for charts, and designed a robust offline-first architecture using IndexedDB for local storage. The app handles currency conversions in real-time and provides AI-powered insights for spending patterns. Security was a key focus, implementing end-to-end encryption for sensitive financial data and multi-factor authentication."
            images={[
              { src: "/expense-tracker/1.png", alt: "Dashboard overview", caption: "Interactive dashboard with expense summary" },
              { src: "/expense-tracker/2.png", alt: "Budget tracking", caption: "Dynamic budget tracking with alerts" },
              { src: "/expense-tracker/3.png", alt: "Expense analysis", caption: "Detailed expense analysis with AI insights" },
              { src: "/expense-tracker/4.png", alt: "Category management", caption: "Custom expense category management" },
              { src: "/expense-tracker/5.png", alt: "Financial reports", caption: "Comprehensive monthly financial reports" }
            ]}
            projectUrl="https://expense-tracker-demo.com"
            githubUrl="https://github.com/Edgar-mwila/expense-tracker"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />

          {/* Project Card 3 - Data Structures and Algorithms */}
          <ProjectCard
            title="Learning Data Structures and Algorithms"
            tech={["JavaScript", "C++", "Python", "React.js", "D3.js"]}
            description="An interactive learning platform showcasing implementations of various data structures and algorithms with visual demonstrations and performance analysis."
            longDescription="This educational project required creating clear visualizations of complex algorithms and data structures. I implemented interactive animations using D3.js to demonstrate sorting algorithms, tree traversals, and graph algorithms. The platform includes performance comparisons and time complexity analysis. One significant challenge was creating smooth animations for complex operations like AVL tree rotations and graph pathfinding algorithms, which I solved using custom animation frameworks and efficient state management."
            images={[
              { src: "/learning-dsa/1.png", alt: "Algorithm visualization", caption: "Interactive sorting algorithm visualization" },
              { src: "/learning-dsa/2.png", alt: "Data structure demo", caption: "Binary tree operations demonstration" },
              { src: "/learning-dsa/3.png", alt: "Performance analysis", caption: "Algorithm performance comparison charts" },
              { src: "/learning-dsa/4.png", alt: "Graph algorithms", caption: "Interactive graph traversal algorithms" },
              { src: "/learning-dsa/5.png", alt: "Search techniques", caption: "Visualization of different search techniques" },
              { src: "/learning-dsa/6.png", alt: "Big O complexity", caption: "Big O notation and complexity analysis" },
              { src: "/learning-dsa/7.png", alt: "Code implementation", caption: "Multiple language implementations of key algorithms" }
            ]}
            projectUrl="https://dsa-learning.demo.com"
            githubUrl="https://github.com/Edgar-mwila/dsa-learning"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />

          {/* Project Card 4 - Habit Hub */}
          <ProjectCard
            title="Habit Hub"
            tech={["Android", "Kotlin", "Room Database", "Work Manager", "MVVM"]}
            description="An Android application designed to help users track and maintain healthy habits with goal setting, streak tracking, and progress visualization."
            longDescription="Developing Habit Hub presented several technical challenges, particularly in implementing reliable notification schedules and accurate streak calculations across time zones. I implemented a robust scheduling system using Android's WorkManager API for reliable background processing and notifications. The app uses Room Database with a well-normalized schema for efficient data storage and retrieval. The clean architecture approach with MVVM pattern made the codebase maintainable and testable. I also implemented a custom calendar view widget to visualize habit completion over time, which required complex custom drawing on Canvas."
            images={[
              { src: "/habit-hub/1.jpg", alt: "Dashboard view", caption: "Main dashboard showing habit progress and streaks" },
              { src: "/habit-hub/2.jpg", alt: "Habit creation", caption: "Intuitive habit creation interface" },
              { src: "/habit-hub/3.jpg", alt: "Streak tracker", caption: "Visual streak tracking calendar" },
              { src: "/habit-hub/4.jpg", alt: "Reminder settings", caption: "Customizable reminder notification settings" },
              { src: "/habit-hub/5.jpg", alt: "Progress charts", caption: "Weekly and monthly progress visualization" },
              { src: "/habit-hub/6.jpg", alt: "Goal setting", caption: "Goal setting and milestone tracking" },
              { src: "/habit-hub/7.jpg", alt: "Settings screen", caption: "App preferences and user settings" }
            ]}
            projectUrl="https://play.google.com/store/apps/details?id=com.edgarmwila.habithub"
            githubUrl="https://github.com/Edgar-mwila/habit-hub"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />

          {/* Project Card 5 - My Rent Solutions */}
          <ProjectCard
            title="My Rent Solutions"
            tech={["Next.js", "Express", "PostgreSQL", "Prisma", "AWS S3"]}
            description="A comprehensive rental property management platform connecting landlords and tenants with property listings, application processing, and maintenance request tracking."
            longDescription="Building this platform required implementing complex relationship management between landlords, properties, and tenants. I designed a secure payment processing system integrated with Stripe API, implemented role-based access control with different dashboards for landlords and tenants, and created an automated rental application workflow. Image handling was optimized using AWS S3 for storage and CloudFront for delivery. One of the main challenges was implementing a real-time notification system for maintenance requests and rent payment reminders, which I solved using a combination of server-sent events and scheduled email notifications."
            images={[
              { src: "/my-rent-solutions/1.png", alt: "Property listings", caption: "Searchable property listings with filters" },
              { src: "/my-rent-solutions/2.png", alt: "Landlord dashboard", caption: "Comprehensive landlord management dashboard" },
              { src: "/my-rent-solutions/3.png", alt: "Tenant portal", caption: "Tenant portal with rent payment history" },
              { src: "/my-rent-solutions/4.png", alt: "Maintenance requests", caption: "Maintenance request tracking system" },
              { src: "/my-rent-solutions/5.png", alt: "Application process", caption: "Streamlined rental application process" }
            ]}
            projectUrl="https://my-rent-solutions.com"
            githubUrl="https://github.com/Edgar-mwila/my-rent-solutions"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />

          {/* Project Card 6 - Image Classifier */}
          <ProjectCard
            title="Image Classifier"
            tech={["Python", "TensorFlow", "Keras", "OpenCV", "Flask"]}
            description="A machine learning application that classifies images into predefined categories using convolutional neural networks with high recognition accuracy."
            longDescription="This project involved training a custom convolutional neural network architecture on a diverse dataset of over 50,000 images. I implemented data augmentation techniques to improve model generalization and transfer learning using pretrained models (ResNet50, MobileNetV2) to enhance accuracy. The web interface was built with Flask, allowing users to upload images and receive real-time classifications. One key challenge was optimizing the model for both accuracy and inference speed, which I addressed by implementing model quantization and TensorFlow Lite conversion for edge deployment. The final model achieves over 94% accuracy across 20 common object categories."
            images={[
              { src: "/assets/image-classifier/1.jpg", alt: "Web interface", caption: "User-friendly web interface for image upload" },
              { src: "/assets/image-classifier/2.jpg", alt: "Classification results", caption: "Real-time classification results with confidence scores" },
              { src: "/assets/image-classifier/3.jpg", alt: "Model architecture", caption: "Visualization of the neural network architecture" },
              { src: "/assets/image-classifier/4.jpg", alt: "Training metrics", caption: "Training accuracy and loss visualization" },
              { src: "/assets/image-classifier/5.jpg", alt: "Confusion matrix", caption: "Classification performance analysis" }
            ]}
            projectUrl="https://image-classifier-demo.herokuapp.com"
            githubUrl="https://github.com/Edgar-mwila/image-classifier"
            theme={{
              card: theme.card,
              primary: theme.primary,
              secondary: theme.secondary,
              text: theme.text,
              accent: theme.primary
            }}
          />
        </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: theme.primary,
              position: "relative",
              paddingBottom: "0.5rem",
            }}
          >
            Skills & Expertise
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100px",
                height: "3px",
                backgroundColor: theme.secondary,
              }}
            />
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Technical Skills Column */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>Technical Skills</h3>

              {/* Skill Item 1 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>JavaScript/TypeScript</span>
                  <span>90%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.primary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Skill Item 2 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>React.js/Next.js</span>
                  <span>85%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.primary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Skill Item 3 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Node.js</span>
                  <span>80%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.primary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Skill Item 4 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>C++</span>
                  <span>75%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.primary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Professional Skills Column */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>
                Professional Skills
              </h3>

              {/* Professional Skill 1 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Problem Solving</span>
                  <span>95%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.secondary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Professional Skill 2 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Team Collaboration</span>
                  <span>90%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.secondary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Professional Skill 3 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Communication</span>
                  <span>85%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.secondary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Professional Skill 4 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Leadership</span>
                  <span>80%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      backgroundColor: theme.secondary,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tools & Technologies Column */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>
                Tools & Technologies
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
              >
                {/* Tool Tags */}
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "JavaScript",
                  "TypeScript",
                  "HTML5",
                  "CSS3",
                  "PostgreSQL",
                  "MySQL",
                  "Firebase",
                  "Supabase",
                  "Git",
                  "REST API",
                  "WebSockets",
                  "Spring Framework",
                  "C++",
                ].map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      backgroundColor: theme.card,
                      padding: "0.75rem 1rem",
                      borderRadius: "5px",
                      textAlign: "center",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      border: `1px solid ${theme.light}`,
                    }}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: theme.primary,
              position: "relative",
              paddingBottom: "0.5rem",
            }}
          >
            Education & Certifications
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100px",
                height: "3px",
                backgroundColor: theme.secondary,
              }}
            ></span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Education Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.primary}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.primary,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                2022 - 2026 (Expected)
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Bachelor of Science in Computer Science</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>
                Copperbelt University | Kitwe, Copperbelt
              </h4>
              <p style={{ lineHeight: "1.8" }}>
                Currently pursuing a degree in Computer Science with a focus on software development and programming.
                Actively participating in various academic projects and extracurricular activities.
              </p>
            </motion.div>

            {/* Education Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
                borderLeft: `4px solid ${theme.secondary}`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.secondary,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                Graduated: November 2021
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>General Certificate of Education (GCE)</h3>
              <h4 style={{ color: theme.secondary, marginBottom: "1rem" }}>Naboye Secondary School | Kafue, Lusaka</h4>
              <p style={{ lineHeight: "1.8" }}>
                Passed with distinction in multiple subjects including English Language, Mathematics, Additional
                Mathematics, Biology, Science, and Principles of Accounts. Was the best performing pupil academically
                and held various leadership roles.
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <h5 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: theme.secondary }}>
                  Leadership Roles & Achievements:
                </h5>
                <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
                  <li>School Debate Disciplinarian (2021)</li>
                  <li>Project Supervisor of Junior Engineers Technicians Scientist (JETS) Club (2021)</li>
                  <li>President of Chess Club (2021)</li>
                  <li>Secretary of Future Life Now (FLN) Club (2021)</li>
                  <li>School Preventive Maintenance Prefect (2021)</li>
                  <li>Senior Prefect for various clubs</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: theme.primary,
              position: "relative",
              paddingBottom: "0.5rem",
            }}
          >
            Get In Touch
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100px",
                height: "3px",
                backgroundColor: theme.secondary,
              }}
            ></span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Contact Info */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>
                Contact Information
              </h3>

              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: theme.light,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1rem",
                    }}
                  >
                    <MapPin size={20} color={theme.primary} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: "0.25rem" }}>Location</h4>
                    <p>Kafue, Lusaka, Zambia</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: theme.light,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1rem",
                    }}
                  >
                    <Mail size={20} color={theme.primary} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: "0.25rem" }}>Email</h4>
                    <p>edgarmwila84@gmail.com</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: theme.light,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1rem",
                    }}
                  >
                    <Phone size={20} color={theme.primary} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: "0.25rem" }}>Phone</h4>
                    <p>+260 779846020</p>
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>Follow Me</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                {/* Social Icons */}
                <motion.a
                  href="www.linkedin.com/in/edgar-mwila-linkdin"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    backgroundColor: theme.primary,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://github.com/Edgar-mwila"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    backgroundColor: theme.primary,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>Send Me a Message</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/260779846020"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                  backgroundColor: "#25D366", // WhatsApp green
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"></svg>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  Chat on WhatsApp
                </motion.a>

                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/edgar-mwila-linkdin"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                  backgroundColor: "#0A66C2", // LinkedIn blue
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  }}
                >
                  <Linkedin size={24} />
                  Connect on LinkedIn
                </motion.a>

                {/* Email Button */}
                <motion.a
                  href="mailto:edgarmwila84@gmail.com?subject=Let's Connect!"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  }}
                >
                  <Mail size={24} />
                  Send Email
                </motion.a>
                </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: theme.primary,
          color: "white",
          padding: "2rem 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}
          >
            Edgar Mwila
          </motion.div>

          <div style={{ marginBottom: "1.5rem" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  padding: "0.5rem",
                  cursor: "pointer",
                  opacity: 0.7,
                  fontWeight: "normal",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <p style={{ marginBottom: "1rem", opacity: 0.7 }}>
            © {new Date().getFullYear()} Edgar Mwila. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

const useCarousel = (images: string[], interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to clear any existing timers
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Function to start the timer
  const startTimer = useCallback(() => {
    clearTimer();
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }
  }, [clearTimer, isPaused, interval, images.length]);

  // Initialize or restart the timer when dependencies change
  useEffect(() => {
    startTimer();
    return clearTimer; // Cleanup on unmount or dependency change
  }, [images.length, interval, isPaused, startTimer, clearTimer]);

  // Navigation functions
  const goToNext = () => {
    clearTimer();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startTimer();
  };

  const goToPrevious = () => {
    clearTimer();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startTimer();
  };

  const goToSlide = (index: number) => {
    clearTimer();
    setCurrentIndex(index);
    startTimer();
  };

  const pauseCarousel = () => {
    setIsPaused(true);
    clearTimer();
  };

  const resumeCarousel = () => {
    setIsPaused(false);
    startTimer();
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    pauseCarousel,
    resumeCarousel,
    isPaused
  };
};

// Project Card Component
interface ProjectCardProps {
  title: string;
  tech: string[];
  description: string;
  longDescription?: string;
  images: Array<{
    src: string;
    alt?: string;
    caption?: string;
  }>;
  projectUrl?: string;
  githubUrl?: string;
  theme: {
    card: string;
    primary: string;
    secondary: string;
    text: string;
    accent: string;
  };
}

const ProjectCard = ({
  title,
  tech,
  description,
  longDescription,
  images,
  projectUrl,
  githubUrl,
  theme
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    pauseCarousel,
    resumeCarousel,
    isPaused
  } = useCarousel(images.map(img => img.src), 5000);

  // Progress bar state
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Reset and start progress when currentIndex changes or when carousel state changes
  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    setProgress(0);

    if (!isPaused && images.length > 1) {
      const startTime = Date.now();
      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 5000) * 100, 100);
        setProgress(newProgress);
      }, 16); // ~60fps
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, isPaused, images.length]);

  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovering(true);
    pauseCarousel();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    resumeCarousel();
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`rounded-lg overflow-hidden shadow-md max-w-md mx-auto w-full ${
        isExpanded ? "md:max-w-2xl" : ""
      }`}
      style={{ backgroundColor: theme.card }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Carousel */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
              style={{
              minHeight: '200px', // Minimum height for mobile
              height: '100%',
              maxHeight: '400px' // Maximum height for desktop
              }}
            >
              <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || `${title} screenshot ${currentIndex + 1}`}
              className="w-full h-full object-contain md:object-cover"
              style={{
                width: '100%',
                maxWidth: '800px', // Maximum width for desktop
                margin: '0 auto',
                aspectRatio: '16/9' // Maintain consistent aspect ratio
              }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        {images[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {images[currentIndex].caption}
          </div>
        )}

        {/* Controls - only show if more than one image */}
        {images.length > 1 && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-opacity z-10"
              style={{ opacity: isHovering ? 0.8 : 0 }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-opacity z-10"
              style={{ opacity: isHovering ? 0.8 : 0 }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if(isPaused) resumeCarousel() 
                  else pauseCarousel();
              }}
              className="absolute bottom-10 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-opacity z-10"
              style={{ opacity: isHovering ? 0.8 : 0 }}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                </svg>
              )}
            </button>

            {/* Indicators / Thumbnails */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 px-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  style={{ 
                    width: currentIndex === index ? '20px' : '8px',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            {!isPaused && (
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <div
                  className="h-full bg-white/70"
                  style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                ></div>
              </div>
            )}
          </>
        )}

        {/* Project Link Overlay */}
        <div 
          className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity"
          style={{ opacity: isHovering ? 0.6 : 0 }}
        >
          <div className="flex gap-3">
            {projectUrl && (
              <a 
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded text-white font-medium transition-transform hover:scale-105"
                style={{ backgroundColor: theme.primary }}
                onClick={(e) => e.stopPropagation()}
              >
                View Project
              </a>
            )}
            {githubUrl && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded text-white font-medium bg-gray-800 transition-transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-1" style={{ color: theme.text }}>
          {title}
        </h3>
        
        {/* Tech stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center' }}>
          {tech.map((item, index) => (
            <span 
              key={index}
              style={{ 
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              margin: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: theme.primary,
              color: theme.text,
              display: 'inline-block'
              }}
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Description */}
        <p className="text-sm leading-relaxed mb-3" style={{ color: theme.text }}>
          {description}
        </p>
        
        {/* Expandable long description */}
        {longDescription && (
          <div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm mt-3 border-t pt-3"
                  style={{ color: theme.text, borderColor: theme.secondary }}
                >
                  <p>{longDescription}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs mt-2 font-medium flex items-center"
              style={{ color: theme.accent }}
            >
              {isExpanded ? "Show less" : "Read more"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={`ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              >
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};