// Global variables to store data
let customerInsights = [];  // Array to store all customer interactions
let selectedTags = [];      // Array to store currently selected tags

// Event listener for tag selection
document.getElementById('tagsContainer').addEventListener('click', function(e) {
    // Check if the clicked element is a tag
    if (e.target.classList.contains('tag')) {
        const tag = e.target.dataset.tag;  // Get the tag value from data-tag attribute
        
        // Check if tag is already selected
        if (selectedTags.includes(tag)) {
            // Remove tag from selection
            selectedTags = selectedTags.filter(t => t !== tag);
            e.target.classList.remove('selected');
        } else {
            // Add tag to selection
            selectedTags.push(tag);
            e.target.classList.add('selected');
        }
    }
});

// Event listener for form submission
document.getElementById('insightForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior
    
    // Validation: Check if at least one tag is selected
    if (selectedTags.length === 0) {
        alert('Please select at least one issue category.');
        return;
    }
    
    // Create object with form data
    const formData = {
        id: Date.now(),  // Unique ID using current timestamp
        customerName: document.getElementById('customerName').value,
        interactionType: document.getElementById('interactionType').value,
        description: document.getElementById('description').value,
        tags: [...selectedTags],  // Copy the selected tags array
        date: new Date().toISOString()  // Current date in ISO format
    };
    
    // Add the new interaction to our data array
    customerInsights.push(formData);
    
    // Reset the form
    document.getElementById('insightForm').reset();
    selectedTags = [];  // Clear selected tags array
    
    // Remove visual selection from all tags
    document.querySelectorAll('.tag.selected').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    // Update the dashboard with new data
    updateDashboard();
    
    // Show confirmation message
    alert('Customer interaction logged successfully!');
});

// Function to update the dashboard with current data
function updateDashboard() {
    // Update total cases counter
    document.getElementById('totalCases').textContent = customerInsights.length;
    
    // Calculate cases from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekCases = customerInsights.filter(insight => 
        new Date(insight.date) > oneWeekAgo
    ).length;
    document.getElementById('thisWeek').textContent = thisWeekCases;
    
    // Count how many times each tag appears
    const tagCounts = {};
    customerInsights.forEach(insight => {
        insight.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // Find the most common issue
    let topIssue = 'N/A';
    let maxCount = 0;
    for (const [tag, count] of Object.entries(tagCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topIssue = getTagLabel(tag);
        }
    }
    document.getElementById('avgResolution').textContent = topIssue;
    
    // Update the priority list and recent cases
    updateIssuePriorityList(tagCounts);
    updateRecentCases();
}

// Function to update the issue priority list
function updateIssuePriorityList(tagCounts) {
    const issueList = document.getElementById('issueList');
    
    // If no data, show placeholder message
    if (Object.keys(tagCounts).length === 0) {
        issueList.innerHTML = '<div class="issue-item"><span>No data yet - Start logging customer interactions!</span></div>';
        return;
    }
    
    // Sort tags by frequency (most common first)
    const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    const totalCases = customerInsights.length;
    
    // Clear existing content
    issueList.innerHTML = '';
    
    // Create HTML for each tag
    sortedTags.forEach(([tag, count]) => {
        const percentage = ((count / totalCases) * 100).toFixed(1);
        
        // Determine priority level based on percentage
        const priority = percentage > 30 ? 'high' : percentage > 15 ? 'medium' : 'low';
        
        // Create new issue item element
        const issueItem = document.createElement('div');
        issueItem.className = 'issue-item';
        issueItem.innerHTML = `
            <div>
                <strong>${getTagLabel(tag)}</strong>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <small>${count} cases (${percentage}%)</small>
            </div>
            <div class="issue-tag priority-${priority}">
                ${priority.toUpperCase()} PRIORITY
            </div>
        `;
        issueList.appendChild(issueItem);
    });
}

// Function to update recent cases display
function updateRecentCases() {
    const recentCases = document.getElementById('recentCases');
    
    // If no data, show placeholder
    if (customerInsights.length === 0) {
        recentCases.innerHTML = '<div class="case-item">No recent cases</div>';
        return;
    }
    
    // Get last 5 cases and reverse to show newest first
    const recent = customerInsights.slice(-5).reverse();
    recentCases.innerHTML = '';
    
    // Create HTML for each recent case
    recent.forEach(insight => {
        const caseItem = document.createElement('div');
        caseItem.className = 'case-item';
        const date = new Date(insight.date).toLocaleDateString();
        caseItem.innerHTML = `
            <strong>${insight.customerName}</strong> - ${insight.interactionType}
            <br>
            <small class="case-date">${date}</small>
            <br>
            ${insight.description.substring(0, 100)}${insight.description.length > 100 ? '...' : ''}
        `;
        recentCases.appendChild(caseItem);
    });
}

// Function to convert tag codes to readable labels
function getTagLabel(tag) {
    const tagLabels = {
        'billing': 'Billing Issues',
        'technical': 'Technical Problems',
        'account': 'Account Access',
        'feature': 'Feature Request',
        'ui': 'User Interface',
        'performance': 'Performance',
        'integration': 'Integration',
        'documentation': 'Documentation',
        'training': 'Training/Support',
        'other': 'Other'
    };
    return tagLabels[tag] || tag;
}

// Initialize dashboard when page loads
updateDashboard();