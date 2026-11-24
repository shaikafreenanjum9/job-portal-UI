// Job information
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova",
        icon: "💻",
        location: "Hyderabad",
        type: "Full Time",
        category: "Technology",
        salary: "₹4 - 8 LPA",
        description: "Create beautiful and responsive websites using HTML, CSS and JavaScript.",
        skills: "HTML, CSS, JavaScript, React",
        experience: "Fresher"
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studio",
        icon: "🎨",
        location: "Bangalore",
        type: "Remote",
        category: "Design",
        salary: "₹3 - 6 LPA",
        description: "Design user-friendly interfaces and improve digital user experiences.",
        skills: "Figma, UI Design, UX Research",
        experience: "0-1 Years"
    },
    {
        id: 3,
        title: "Python Developer",
        company: "CodeCraft",
        icon: "🐍",
        location: "Chennai",
        type: "Full Time",
        category: "Technology",
        salary: "₹5 - 9 LPA",
        description: "Develop applications and solve technical problems using Python.",
        skills: "Python, Django, SQL",
        experience: "Fresher"
    },
    {
        id: 4,
        title: "Digital Marketing Intern",
        company: "Growthify",
        icon: "📱",
        location: "Remote",
        type: "Internship",
        category: "Marketing",
        salary: "₹10,000/month",
        description: "Learn digital marketing, social media management and content strategy.",
        skills: "SEO, Social Media, Content",
        experience: "Students"
    },
    {
        id: 5,
        title: "Java Developer",
        company: "Innovate Solutions",
        icon: "☕",
        location: "Pune",
        type: "Full Time",
        category: "Technology",
        salary: "₹4 - 7 LPA",
        description: "Build software applications using Java and object-oriented programming.",
        skills: "Java, SQL, OOP",
        experience: "0-1 Years"
    },
    {
        id: 6,
        title: "Business Analyst",
        company: "FutureWorks",
        icon: "📊",
        location: "Mumbai",
        type: "Full Time",
        category: "Business",
        salary: "₹4 - 7 LPA",
        description: "Analyze business requirements and support data-driven decisions.",
        skills: "Excel, Data Analysis, Communication",
        experience: "Fresher"
    },
    {
        id: 7,
        title: "Web Development Intern",
        company: "WebSpark",
        icon: "🌐",
        location: "Remote",
        type: "Internship",
        category: "Technology",
        salary: "₹8,000/month",
        description: "Work on real-world web development projects and learn frontend development.",
        skills: "HTML, CSS, JavaScript",
        experience: "Students"
    },
    {
        id: 8,
        title: "Graphic Designer",
        company: "Pixel Perfect",
        icon: "🖌️",
        location: "Delhi",
        type: "Part Time",
        category: "Design",
        salary: "₹15,000/month",
        description: "Create creative graphics, posters, branding and digital designs.",
        skills: "Canva, Photoshop, Creativity",
        experience: "Fresher"
    },
    {
        id: 9,
        title: "Content Writer",
        company: "Media House",
        icon: "✍️",
        location: "Remote",
        type: "Part Time",
        category: "Marketing",
        salary: "₹12,000/month",
        description: "Write engaging articles, website content and social media posts.",
        skills: "Writing, Communication, SEO",
        experience: "Fresher"
    }
];

// Saved job IDs
let savedJobs = [];

// Current category
let currentCategory = "All";

// Display jobs
function displayJobs(jobList) {

    const container = document.getElementById("jobContainer");
    const noJobs = document.getElementById("noJobs");

    container.innerHTML = "";

    if (jobList.length === 0) {
        noJobs.style.display = "block";
        return;
    }

    noJobs.style.display = "none";

    jobList.forEach(job => {

        const isSaved = savedJobs.includes(job.id);

        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <div class="job-top">
                <div class="company-icon">${job.icon}</div>

                <button class="bookmark ${isSaved ? 'saved' : ''}"
                    onclick="toggleSave(${job.id})"
                    title="Save job">
                    ${isSaved ? "★" : "☆"}
                </button>
            </div>

            <h3>${job.title}</h3>

            <p class="company-name">${job.company}</p>

            <div class="job-info">
                <span>📍 ${job.location}</span>
                <span>💼 ${job.type}</span>
            </div>

            <p class="job-description">${job.description}</p>

            <div class="card-bottom">
                <span class="salary">${job.salary}</span>

                <button class="details-btn"
                    onclick="showDetails(${job.id})">
                    View Details
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Search jobs
function searchJobs() {

    const keyword = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const location = document.getElementById("locationInput")
        .value.toLowerCase().trim();

    let filteredJobs = jobs.filter(job => {

        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.skills.toLowerCase().includes(keyword) ||
            job.category.toLowerCase().includes(keyword);

        const matchesLocation =
            job.location.toLowerCase().includes(location);

        const matchesCategory =
            currentCategory === "All" ||
            job.category === currentCategory;

        return matchesKeyword && matchesLocation && matchesCategory;
    });

    displayJobs(filteredJobs);

    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
}

// Filter jobs
function filterJobs(category, button) {

    currentCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    searchJobs();
}

// Save or unsave a job
function toggleSave(id) {

    if (savedJobs.includes(id)) {

        savedJobs = savedJobs.filter(jobId => jobId !== id);

        showMessage("Job removed from saved jobs.");

    } else {

        savedJobs.push(id);

        showMessage("Job saved successfully! ⭐");
    }

    searchJobs();
}

// Show job details
function showDetails(id) {

    const job = jobs.find(item => item.id === id);

    const modal = document.getElementById("jobModal");
    const details = document.getElementById("modalDetails");

    details.innerHTML = `
        <div class="company-icon">${job.icon}</div>

        <h2>${job.title}</h2>

        <p><strong>Company:</strong> ${job.company}</p>

        <p><strong>Location:</strong> ${job.location}</p>

        <p><strong>Job Type:</strong> ${job.type}</p>

        <p><strong>Category:</strong> ${job.category}</p>

        <p><strong>Salary:</strong> ${job.salary}</p>

        <p><strong>Experience:</strong> ${job.experience}</p>

        <h4>Job Description</h4>
        <p>${job.description}</p>

        <h4>Required Skills</h4>
        <p>${job.skills}</p>

        <button class="apply-btn" onclick="applyJob('${job.title}')">
            Apply Now 🚀
        </button>
    `;

    modal.classList.add("show");
}

// Close modal
function closeModal() {
    document.getElementById("jobModal").classList.remove("show");
}

// Apply button
function applyJob(title) {

    showMessage("Application demo for " + title + "! 🚀");

    closeModal();
}

// General message
function showMessage(message) {
    alert(message);
}

// Scroll to jobs
function scrollToJobs() {
    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
}

// Close popup when clicking outside
document.getElementById("jobModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeModal();
    }

});

// Search when pressing Enter
document.getElementById("searchInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchJobs();
    }

});

document.getElementById("locationInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchJobs();
    }

});

// Initial display
displayJobs(jobs);