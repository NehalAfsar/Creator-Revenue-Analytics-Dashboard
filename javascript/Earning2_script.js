// Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
        
        // Toggle theme function
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        // Update theme icon
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        // Mobile sidebar toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        // Toggle sidebar function
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            
            // Update hamburger icon
            const icon = mobileMenuToggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Open/close sidebar with hamburger button
        mobileMenuToggle.addEventListener('click', toggleSidebar);
        
        // Close sidebar when clicking on overlay
        sidebarOverlay.addEventListener('click', toggleSidebar);
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) &&
                sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
        
        // Close sidebar when a nav item is clicked on mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleSidebar();
                }
            });
        });
        
        // Initialize the revenue chart
        const ctx = document.getElementById('revenueChart').getContext('2d');
        let revenueChart;
        
        // Data structure for the dashboard
        let dashboardData = {
            totalEarnings: "₹2,70,000",
            totalViews: "1.2 M",
            avgSession: "20m 34s",
            revenueValue: "₹12,000",
            revenueChange: "+10%",
            pendingEarnings: "+84,000",
            earningsGrowth: "+86%",
            revenuePerContent: "+34%",
            contentEarnings: [
                { 
                    title: "Video Tutorial: Advanced Editing", 
                    platform: "YouTube", 
                    earnings: "$850", 
                    date: "2024-01-15", 
                    views: "125K",
                    earningsChange: "+12%"
                },
                { 
                    title: "Product Review: Camera Gear", 
                    platform: "Instagram", 
                    earnings: "$420", 
                    date: "2024-01-20", 
                    views: "98K",
                    earningsChange: "+8%"
                },
                { 
                    title: "Live Stream: Q&A Session", 
                    platform: "Twitch", 
                    earnings: "$320", 
                    date: "2024-01-25", 
                    views: "75K",
                    earningsChange: "+5%"
                },
                { 
                    title: "Behind the Scenes: Studio Setup", 
                    platform: "YouTube", 
                    earnings: "$680", 
                    date: "2024-02-01", 
                    views: "142K",
                    earningsChange: "+18%"
                },
                { 
                    title: "Tech Unboxing: New Gadgets", 
                    platform: "TikTok", 
                    earnings: "$510", 
                    date: "2024-02-05", 
                    views: "210K",
                    earningsChange: "+22%"
                },
                { 
                    title: "Cooking Masterclass: Italian Cuisine", 
                    platform: "YouTube", 
                    earnings: "$740", 
                    date: "2024-02-15", 
                    views: "185K",
                    earningsChange: "+15%"
                },
                { 
                    title: "Fitness Challenge: 30-Day Program", 
                    platform: "Instagram", 
                    earnings: "$590", 
                    date: "2024-02-22", 
                    views: "156K",
                    earningsChange: "+10%"
                }
            ],
            revenueData: {
                monthly: [8500, 10200, 12000, 9800, 11500, 14000],
                quarterly: [25000, 32000, 41000],
                yearly: [85000, 102000, 120000, 98000, 115000, 140000, 155000, 162000, 175000, 183000, 195000, 210000]
            },
            currentTimeFrame: 'monthly'
        };
        
        // Initialize the chart
        function initChart() {
            revenueChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                    datasets: [{
                        label: 'Monthly Revenue (₹)',
                        data: dashboardData.revenueData.monthly,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#0f172a',
                            padding: 12,
                            titleFont: {
                                size: 14
                            },
                            bodyFont: {
                                size: 14
                            },
                            callbacks: {
                                label: function(context) {
                                    return `₹${context.parsed.y.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }
        
        // Update the dashboard with current data
        function updateDashboard() {
            // Update metrics
            document.getElementById('totalEarnings').textContent = dashboardData.totalEarnings;
            document.getElementById('totalViews').textContent = dashboardData.totalViews;
            document.getElementById('avgSession').textContent = dashboardData.avgSession;
            document.getElementById('revenueValue').textContent = dashboardData.revenueValue;
            document.getElementById('revenueChange').textContent = dashboardData.revenueChange;
            document.getElementById('pendingEarnings').textContent = dashboardData.pendingEarnings;
            document.getElementById('earningsGrowth').textContent = dashboardData.earningsGrowth;
            document.getElementById('revenuePerContent').textContent = dashboardData.revenuePerContent;
            
            // Update content cards
            const contentContainer = document.getElementById('contentEarningsContainer');
            contentContainer.innerHTML = '';
            
            dashboardData.contentEarnings.forEach(item => {
                const card = document.createElement('div');
                card.className = 'content-card';
                
                card.innerHTML = `
                    <div class="content-header">
                        <div class="content-title">${item.title}</div>
                        <div class="platform-tag">${item.platform}</div>
                    </div>
                    <div class="content-stats">
                        <div class="stat-item">
                            <div class="stat-label">Earnings</div>
                            <div class="stat-value-sm">${item.earnings}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Views</div>
                            <div class="stat-value-sm">${item.views}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Growth</div>
                            <div class="stat-value-sm positive">${item.earningsChange}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Engagement</div>
                            <div class="stat-value-sm">${Math.floor(Math.random() * 15) + 5}%</div>
                        </div>
                    </div>
                    <div class="content-date">
                        <i class="far fa-calendar"></i> Published: ${item.date}
                    </div>
                `;
                
                contentContainer.appendChild(card);
            });
            
            // Update chart if it exists
            if(revenueChart) {
                updateChart();
            }
        }
        
        // Update the chart with current data
        function updateChart() {
            const labels = dashboardData.currentTimeFrame === 'monthly' ? 
                ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'] :
                dashboardData.currentTimeFrame === 'quarterly' ?
                ['Q1', 'Q2', 'Q3'] :
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
            revenueChart.data.labels = labels;
            revenueChart.data.datasets[0].data = dashboardData.revenueData[dashboardData.currentTimeFrame];
            revenueChart.update();
        }
        
        // Generate random data for demonstration
        function generateRandomData() {
            // Randomize metrics
            const totalEarnings = Math.floor(Math.random() * 500000) + 100000;
            dashboardData.totalEarnings = `₹${(totalEarnings/1000).toFixed(1)}K`;
            
            const totalViews = (Math.random() * 3).toFixed(1);
            dashboardData.totalViews = `${totalViews} M`;
            
            const mins = Math.floor(Math.random() * 10) + 15;
            const secs = Math.floor(Math.random() * 60);
            dashboardData.avgSession = `${mins}m ${secs}s`;
            
            const revenue = Math.floor(Math.random() * 20000) + 5000;
            dashboardData.revenueValue = `₹${revenue.toLocaleString()}`;
            
            const change = Math.floor(Math.random() * 30) - 5;
            dashboardData.revenueChange = change >= 0 ? `+${change}%` : `${change}%`;
            
            const pending = Math.floor(Math.random() * 100000) + 50000;
            dashboardData.pendingEarnings = `+${pending.toLocaleString()}`;
            
            const growth = Math.floor(Math.random() * 100) + 20;
            dashboardData.earningsGrowth = `+${growth}%`;
            
            const contentGrowth = Math.floor(Math.random() * 50) + 10;
            dashboardData.revenuePerContent = `+${contentGrowth}%`;
            
            // Randomize revenue data
            dashboardData.revenueData.monthly = Array(6).fill().map(() => Math.floor(Math.random() * 20000) + 5000);
            dashboardData.revenueData.quarterly = Array(3).fill().map(() => Math.floor(Math.random() * 50000) + 20000);
            dashboardData.revenueData.yearly = Array(12).fill().map(() => Math.floor(Math.random() * 200000) + 50000);
            
            // Randomize content data
            const platforms = ["YouTube", "Instagram", "TikTok", "Twitch", "Facebook"];
            const titles = ["Video Tutorial", "Product Review", "Live Stream", "Q&A Session", "Behind the Scenes", "Tech Unboxing", "Fitness Challenge", "Cooking Masterclass"];
            
            dashboardData.contentEarnings = Array(7).fill().map((_, i) => {
                const platform = platforms[Math.floor(Math.random() * platforms.length)];
                const earnings = Math.floor(Math.random() * 800) + 200;
                const month = Math.floor(Math.random() * 12) + 1;
                const day = Math.floor(Math.random() * 28) + 1;
                const views = Math.floor(Math.random() * 200000) + 50000;
                const earningsChange = Math.floor(Math.random() * 20) + 5;
                
                return {
                    title: `${titles[Math.floor(Math.random() * titles.length)]} ${i+1}`,
                    platform: platform,
                    earnings: `$${earnings}`,
                    date: `2024-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                    views: `${(views/1000).toFixed(1)}K`,
                    earningsChange: `+${earningsChange}%`
                };
            });
            
            updateDashboard();
        }
        
        // Export data as CSV
        function exportData() {
            // Create CSV content
            let csvContent = "Content,Platform,Earnings,Date,Views\n";
            
            dashboardData.contentEarnings.forEach(item => {
                csvContent += `"${item.title}","${item.platform}","${item.earnings}","${item.date}","${item.views}"\n`;
            });
            
            // Add metrics to CSV
            csvContent += "\nMetrics\n";
            csvContent += `Total Earnings,${dashboardData.totalEarnings}\n`;
            csvContent += `Total Views,${dashboardData.totalViews}\n`;
            csvContent += `Avg Session Length,${dashboardData.avgSession}\n`;
            csvContent += `Revenue (30 Days),${dashboardData.revenueValue}\n`;
            csvContent += `Revenue Change,${dashboardData.revenueChange}\n`;
            csvContent += `Pending Earnings,${dashboardData.pendingEarnings}\n`;
            csvContent += `Earnings Growth,${dashboardData.earningsGrowth}\n`;
            csvContent += `Revenue Per Content Growth,${dashboardData.revenuePerContent}\n`;
            
            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const date = new Date().toISOString().slice(0, 10);
            
            link.setAttribute("href", url);
            link.setAttribute("download", `creator_analytics_${date}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show notification
            showNotification();
        }
        
        // Show notification
        function showNotification() {
            const notification = document.getElementById('notification');
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            initChart();
            updateDashboard();
            
            // Add interactivity to the navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all items
                    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                });
            });
            
            // Add interactivity to time period buttons
            document.querySelectorAll('.graph-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.graph-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    dashboardData.currentTimeFrame = this.dataset.period;
                    updateChart();
                });
            });
            
            // Refresh data
            document.getElementById('refreshData').addEventListener('click', generateRandomData);
            
            // Export data
            document.getElementById('exportBtn').addEventListener('click', exportData);
        });