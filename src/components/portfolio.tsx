import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { cn } from "../lib/utils"

// Main App Component
export const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)

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
    const cvPath = '/assets/CV.pdf' // Update this path to match where your CV is stored in public folder
    
    try {
        // Create temporary link element
        const link = document.createElement('a')
        link.href = cvPath
        link.download = 'Edgar-Mwila-CV.pdf' // Name of downloaded file
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
      className={cn("portfolio-app min-h-screen transition-all duration-300", isDarkMode ? "dark" : "")}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}
          >
            Edgar Mwila
          </motion.div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex gap-4">
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

            {/* CV Download Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
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
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => alert("Mobile menu would open here")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>
        </div>
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
            About Me
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
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Edgar Mwila"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.8",
                }}
              >
                I am a self-motivated and eager-spirited individual who is always pushing myself towards better. I love
                to learn and share knowledge, making me a valuable asset to any team.
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.8",
                }}
              >
                As a resourceful student skilled in programming, debugging, and software development, I offer a dynamic
                personality and a willingness to learn. My presence has been described as pleasant and positive by the
                majority of people I have interacted with.
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.8",
                }}
              >
                My morals are as unquestionable as my caliber. My character as sound as can be. I would be a great asset
                for any software firm looking for a dedicated and skilled developer.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <div>
                  <p>
                    <strong>Name:</strong> Edgar Mwila
                  </p>
                  <p>
                    <strong>Experience:</strong> 2+ Years
                  </p>
                  <p>
                    <strong>Location:</strong> Kafue, Zambia
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Email:</strong> edgarmwila84@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +260 779846020
                  </p>
                  <p>
                    <strong>Freelance:</strong> Available
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
            Featured Projects
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
            {/* Project Card 1 */}
            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="E-commerce Platform"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    // "&:hover": { opacity: 1 },
                  }}
                >
                  <button
                    style={{
                      backgroundColor: theme.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    View Project
                  </button>
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>E-commerce Platform</h3>
                <p style={{ color: theme.secondary, marginBottom: "1rem", fontSize: "0.9rem" }}>
                  React.js / Node.js / PostgreSQL
                </p>
                <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                  A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment
                  integration. Implemented responsive design and optimized for performance.
                </p>
              </div>
            </motion.div>

            {/* Project Card 2 */}
            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Real-time Chat Application"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    // ":hover": { opacity: 1 },
                  }}
                >
                  <button
                    style={{
                      backgroundColor: theme.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    View Project
                  </button>
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Real-time Chat Application</h3>
                <p style={{ color: theme.secondary, marginBottom: "1rem", fontSize: "0.9rem" }}>
                  Next.js / WebSockets / Firebase
                </p>
                <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                  A real-time chat application with features like user authentication, private messaging, group chats,
                  and message notifications. Implemented using WebSockets for real-time communication.
                </p>
              </div>
            </motion.div>

            {/* Project Card 3 */}
            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.card,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Task Management System"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: theme.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    View Project
                  </button>
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Task Management System</h3>
                <p style={{ color: theme.secondary, marginBottom: "1rem", fontSize: "0.9rem" }}>
                  React.js / Node.js / MongoDB
                </p>
                <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                  A comprehensive task management system with features like task creation, assignment, tracking, and
                  reporting. Implemented with a responsive design for mobile and desktop use.
                </p>
              </div>
            </motion.div>
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
                  href="https://linkedin.com"
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
                  href="https://github.com"
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
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
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
                  <Twitter size={20} />
                </motion.a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: theme.secondary }}>Send Me a Message</h3>

              <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "5px",
                        border: `1px solid ${theme.secondary}`,
                        backgroundColor: theme.card,
                        color: theme.text,
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "5px",
                        border: `1px solid ${theme.secondary}`,
                        backgroundColor: theme.card,
                        color: theme.text,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                      backgroundColor: theme.card,
                      color: theme.text,
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your Message"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "5px",
                      border: `1px solid ${theme.secondary}`,
                      backgroundColor: theme.card,
                      color: theme.text,
                      resize: "vertical",
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  style={{
                    backgroundColor: theme.primary,
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0.75rem 1.5rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                    marginTop: "1rem",
                  }}
                >
                  Send Message
                </motion.button>
              </form>
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