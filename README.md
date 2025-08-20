# Customer Insights Tracker

A simple web application for tracking and analyzing customer interactions to improve customer experience across teams.

## Link to the App

https://seminagk.github.io/Customer-Insights-Tracking-App/

## 🎯 Problem Statement

Customer support teams often struggle to:

- Track recurring customer issues
- Identify priority areas for improvement
- Share insights across different teams
- Manually categorize and analyze feedback patterns

## 💡 Solution

This application provides a simple interface to:

- **Log customer interactions** quickly with predefined categories
- **Automatically calculate issue priorities** based on frequency
- **Visualize trends** with real-time dashboard
- **Track recent cases** for follow-up

## ✨ Features

### 📝 Easy Logging

- Quick form for customer interaction details
- Multiple interaction types (email, chat, phone, tickets)
- Click-to-select tagging system
- Required field validation

### 📊 Smart Analytics

- Automatic priority calculation based on frequency
- Real-time statistics (total cases, weekly trends)
- Visual progress bars for issue distribution
- Top issue identification

### 🎨 Clean Interface

- Responsive design works on desktop and mobile
- Simple styling with intuitive colors
- Priority color coding (Red=High, Yellow=Medium, Green=Low)
- Recent cases tracking

### Usage

1. **Log an interaction**:

   - Fill in customer name/ID
   - Select interaction type
   - Describe the issue
   - Click relevant category tags
   - Submit

2. **View insights**:
   - Check real-time statistics
   - Review priority rankings
   - Monitor recent cases

## 📁 Project Structure

## 🛠️ Technical Details

### Built With

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

### Key Components

- **Event Listeners**: Handle user interactions
- **DOM Manipulation**: Update interface dynamically
- **Array Methods**: Process and analyze data
- **Local Data Storage**: In-memory data management

## 💾 Data Management

### Where is data stored?

Currently, all data is stored **in browser memory** (`customerInsights` array in JavaScript). This means:

- ✅ **Pros**: No setup required, works immediately
- ⚠️ **Cons**: Data is lost when page refreshes

### Data Structure

Each customer interaction is stored as:

```javascript
{
  id: 1629123456789,              // Unique timestamp ID
  customerName: "John Doe",        // Customer identifier
  interactionType: "email",        // Type of interaction
  description: "Login issues...",   // Issue description
  tags: ["technical", "account"],   // Selected categories
  date: "2024-08-20T10:30:00Z"    // ISO date string
}
```

### Accessing the Data

You can access the data through browser console:

1. **Open Developer Tools** (F12 in most browsers)
2. **Go to Console tab**
3. **Type**: `customerInsights` and press Enter
4. **View all data**: This shows the complete array

### Export Data (Manual)

To manually export your data:

```javascript
// In browser console:
console.log(JSON.stringify(customerInsights, null, 2));
// Copy the output to save as JSON file
```

### Possible Improvements

- **Data Persistence**: Save to localStorage or database
- **Export Features**: CSV/Excel download functionality
- **Search & Filter**: Find specific cases or customers
- **Charts**: Visual trend analysis
- **Multi-user Support**: Team collaboration features
- **API Integration**: Connect to existing CRM systems

## 🙏 Acknowledgments

- Built as a practical solution for customer experience improvement
- Demonstrates core web development concepts
- Designed for internal company use and learning
