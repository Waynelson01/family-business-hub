// Family Business Hub - Main Application JavaScript

// =====================================
// CONFIGURATION
// =====================================

const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID  
    templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    demoMode: true // Set to false when real EmailJS credentials are configured
};

// =====================================
// CORE FUNCTIONS
// =====================================

// Initialize EmailJS
function initializeEmailJS() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS initialized successfully');
        }
    } catch (error) {
        console.error('EmailJS failed to initialize:', error);
    }
}

// Initialize Lucide icons with error handling
function initializeLucide() {
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Lucide icons failed to load:', error);
    }
}

// Initialize everything when page loads
function initializePage() {
    initializeEmailJS();
    initializeLucide();
    initializeUserHeader();
    loadDashboardData();
    
    console.log('🚀 Family Business Hub initialized!');
}

// =====================================
// NAVIGATION FUNCTIONALITY
// =====================================

function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error(`Page with ID '${pageId}' not found`);
        return;
    }
    
    // Update page title in header
    updatePageTitle(pageId);
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-gray-700');
    });
    
    document.querySelector(`[data-page="${pageId}"]`)?.classList.add('bg-gray-700');
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Page-specific initialization
    switch(pageId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'ideas':
            renderIdeasList();
            break;
        case 'planner':
            populatePlannerSelect();
            break;
    }
}

function updatePageTitle(pageId) {
    const titles = {
        'dashboard': 'Dashboard',
        'ideas': 'Family Ideas Hub',
        'planner': 'Business Planner', 
        'research': 'AI Research Hub',
        'financial': 'Financial Dashboard',
        'data-center': 'Data Update Center',
        'tasks': 'Task Management',
        'legal': 'Legal & Financial',
        'milestones': 'Milestone Tracker',
        'chat': 'Chat',
        'profile': 'My Profile',
        'user-management': 'User Management',
        'settings': 'Settings'
    };
    
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.textContent = titles[pageId] || 'Dashboard';
    }
}

// =====================================
// DASHBOARD FUNCTIONALITY
// =====================================

function loadDashboardData() {
    // Sample data - replace with actual data loading
    const data = {
        totalIdeas: 6,
        totalVotes: 72,
        activeDiscussions: 10,
        completionRate: 17
    };
    
    // Update dashboard stats
    updateDashboardStats(data);
    renderIdeasPipeline();
    renderDonutChart();
}

function updateDashboardStats(data) {
    const elements = {
        'total-ideas-count': data.totalIdeas,
        'total-votes-count': data.totalVotes,
        'active-discussions-count': data.activeDiscussions,
        'completion-rate': data.completionRate + '%'
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function renderIdeasPipeline() {
    const ideas = getSampleIdeas();
    const columns = {
        'new-ideas-column': ideas.filter(idea => idea.status === 'New Ideas'),
        'researching-column': ideas.filter(idea => idea.status === 'Researching'),
        'planning-column': ideas.filter(idea => idea.status === 'Planning'),
        'approved-column': ideas.filter(idea => idea.status === 'Approved')
    };
    
    Object.entries(columns).forEach(([columnId, columnIdeas]) => {
        const column = document.getElementById(columnId);
        if (column) {
            column.innerHTML = columnIdeas.map(idea => createIdeaCard(idea)).join('');
        }
    });
}

function createIdeaCard(idea) {
    return `
        <div class="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors" onclick="openIdeaDetails(${idea.id})">
            <h4 class="font-semibold text-white text-sm mb-2">${idea.name}</h4>
            <p class="text-gray-300 text-xs mb-2 line-clamp-2">${idea.description}</p>
            <div class="flex items-center justify-between text-xs">
                <span class="text-gray-400">${idea.submitter}</span>
                <span class="text-${getPriorityColor(idea.priority)}-400">${idea.priority}</span>
            </div>
            <div class="flex items-center mt-2">
                <span class="text-green-400 text-xs mr-2">▲ ${idea.votes.upvotes}</span>
                <span class="text-red-400 text-xs">▼ ${idea.votes.downvotes}</span>
            </div>
        </div>
    `;
}

function getPriorityColor(priority) {
    const colors = {
        'High': 'red',
        'Medium': 'yellow',
        'Low': 'green'
    };
    return colors[priority] || 'gray';
}

function renderDonutChart() {
    const ideas = getSampleIdeas();
    const chartData = ideas.map(idea => ({
        name: idea.name,
        votes: idea.votes.upvotes,
        color: getRandomColor()
    }));
    
    // Simple donut chart implementation
    const svg = document.getElementById('donut-chart');
    if (svg) {
        svg.innerHTML = generateDonutSVG(chartData);
    }
    
    // Update legend
    const legend = document.getElementById('ideas-legend');
    if (legend) {
        legend.innerHTML = chartData.map(item => `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${item.color}"></div>
                    <span class="text-gray-300 text-sm">${item.name}</span>
                </div>
                <span class="text-white text-sm">${item.votes}</span>
            </div>
        `).join('');
    }
}

function generateDonutSVG(data) {
    const total = data.reduce((sum, item) => sum + item.votes, 0);
    let currentAngle = 0;
    const centerX = 100;
    const centerY = 100;
    const radius = 70;
    const innerRadius = 40;
    
    return data.map(item => {
        const angle = (item.votes / total) * 360;
        const x1 = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
        const y1 = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
        const x2 = centerX + radius * Math.cos((currentAngle + angle) * Math.PI / 180);
        const y2 = centerY + radius * Math.sin((currentAngle + angle) * Math.PI / 180);
        
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = `
            M ${centerX + innerRadius * Math.cos(currentAngle * Math.PI / 180)} ${centerY + innerRadius * Math.sin(currentAngle * Math.PI / 180)}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            L ${centerX + innerRadius * Math.cos((currentAngle + angle) * Math.PI / 180)} ${centerY + innerRadius * Math.sin((currentAngle + angle) * Math.PI / 180)}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${centerX + innerRadius * Math.cos(currentAngle * Math.PI / 180)} ${centerY + innerRadius * Math.sin(currentAngle * Math.PI / 180)}
            Z
        `;
        
        currentAngle += angle;
        
        return `<path d="${pathData}" fill="${item.color}" opacity="0.8"></path>`;
    }).join('');
}

function getRandomColor() {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// =====================================
// SAMPLE DATA
// =====================================

function getSampleIdeas() {
    return [
        {
            id: 1,
            name: "Family Catering Service",
            description: "Start a local catering business specializing in family recipes and home-style cooking.",
            submitter: "Sarah Johnson",
            status: "New Ideas",
            priority: "High",
            votes: { upvotes: 10, downvotes: 2 }
        },
        {
            id: 2,
            name: "Online Tutoring Platform",
            description: "Create an online platform connecting family members who are teachers with local students.",
            submitter: "Mike Johnson", 
            status: "Researching",
            priority: "Medium",
            votes: { upvotes: 7, downvotes: 1 }
        },
        {
            id: 3,
            name: "Handmade Crafts Shop",
            description: "Sell handmade crafts and artwork created by family members through an online store.",
            submitter: "Emma Johnson",
            status: "Planning", 
            priority: "Medium",
            votes: { upvotes: 15, downvotes: 3 }
        },
        {
            id: 4,
            name: "Johnson Farm-to-Table",
            description: "Operating a local farm to provide fresh organic produce to restaurants and markets.",
            submitter: "Tom Johnson",
            status: "Approved",
            priority: "High", 
            votes: { upvotes: 17, downvotes: 1 }
        }
    ];
}

// =====================================
// UI HELPERS
// =====================================

function showAlert(message, type = 'info') {
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    
    if (alertModal && alertMessage) {
        alertMessage.textContent = message;
        alertModal.classList.add('active');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            closeAlert();
        }, 3000);
    } else {
        // Fallback to console if modal not found
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

function closeAlert() {
    const alertModal = document.getElementById('alert-modal');
    if (alertModal) {
        alertModal.classList.remove('active');
    }
}

// =====================================
// INITIALIZATION
// =====================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Handle navigation clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
        const link = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            e.preventDefault();
            navigateToPage(pageId);
        }
    }
});

// Handle hash changes for browser back/forward
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        navigateToPage(hash);
    }
});

// Initialize on page load with hash
window.addEventListener('load', function() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    navigateToPage(hash);
});