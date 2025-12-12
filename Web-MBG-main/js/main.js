// MBG Indonesia - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
// Locations Section Functionality
// ==========================================================================

// Data lokasi sekolah MBG
const schoolLocations = [
    {
        id: 1,
        name: "SDN 01 Menteng",
        address: "Jl. Besuki No. 5, Menteng, Jakarta Pusat",
        city: "Jakarta",
        province: "jakarta",
        latitude: -6.195492,
        longitude: 106.837122,
        status: "active",
        capacity: 150,
        schedule: "Senin-Jumat, 12:00-13:00",
        coordinator: "Budi Santoso (0812-3456-7890)",
        features: ["wifi", "parking", "accessible", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+01+Menteng+Jakarta"
    },
    {
        id: 2,
        name: "SDN 123 Cijerah",
        address: "Jl. Cijerah Indah No. 45, Bandung Kulon",
        city: "Bandung",
        province: "jabar",
        latitude: -6.917464,
        longitude: 107.619125,
        status: "active",
        capacity: 200,
        schedule: "Senin, Rabu, Jumat, 11:30-12:30",
        coordinator: "Siti Rahayu (0813-4567-8901)",
        features: ["parking", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+123+Cijerah+Bandung"
    },
    {
        id: 3,
        name: "SDN Kalisari II",
        address: "Jl. Raya Kalisari No. 88, Mulyorejo, Surabaya",
        city: "Surabaya",
        province: "jatim",
        latitude: -7.245972,
        longitude: 112.738067,
        status: "active",
        capacity: 180,
        schedule: "Selasa-Kamis, 12:00-13:00",
        coordinator: "Agus Setiawan (0814-5678-9012)",
        features: ["wifi", "parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+Kalisari+II+Surabaya"
    },
    {
        id: 4,
        name: "SD Muhammadiyah 1 Yogyakarta",
        address: "Jl. KH. Ahmad Dahlan No. 40, Yogyakarta",
        city: "Yogyakarta",
        province: "yogyakarta",
        latitude: -7.79558,
        longitude: 110.36949,
        status: "active",
        capacity: 120,
        schedule: "Senin-Kamis, 11:30-12:30",
        coordinator: "Rina Wulandari (0815-6789-0123)",
        features: ["wifi", "parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SD+Muhammadiyah+1+Yogyakarta"
    },
    {
        id: 5,
        name: "SDN 060925 Medan",
        address: "Jl. Gatot Subroto No. 5, Medan",
        city: "Medan",
        province: "sumut",
        latitude: 3.595195,
        longitude: 98.672226,
        status: "active",
        capacity: 160,
        schedule: "Senin-Jumat, 12:00-13:00",
        coordinator: "Dedi Supriyadi (0816-7890-1234)",
        features: ["parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+060925+Medan"
    },
    {
        id: 6,
        name: "SDN 2 Mamajang",
        address: "Jl. Sultan Hasanuddin No. 10, Makassar",
        city: "Makassar",
        province: "sulsel",
        latitude: -5.147665,
        longitude: 119.432731,
        status: "active",
        capacity: 140,
        schedule: "Senin, Rabu, Jumat, 11:00-12:00",
        coordinator: "Andi Malawat (0817-8901-2345)",
        features: ["wifi", "parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+2+Mamajang+Makassar"
    },
    {
        id: 7,
        name: "SDN 01 Sudirman",
        address: "Jl. Jend. Sudirman No. 25, Jakarta Selatan",
        city: "Jakarta",
        province: "jakarta",
        latitude: -6.225013,
        longitude: 106.803230,
        status: "active",
        capacity: 180,
        schedule: "Senin-Jumat, 11:30-12:30",
        coordinator: "Ahmad Rifai (0818-9012-3456)",
        features: ["wifi", "parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+01+Sudirman+Jakarta"
    },
    {
        id: 8,
        name: "SDN 101 Tarogong",
        address: "Jl. Raya Tarogong No. 45, Garut",
        city: "Garut",
        province: "jabar",
        latitude: -7.203083,
        longitude: 107.908699,
        status: "coming",
        capacity: 130,
        schedule: "Akan Datang",
        coordinator: "Maya Sari (0819-0123-4567)",
        features: ["parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+101+Tarogong+Garut"
    }
];

// Variabel global
let map;
let markers = [];
let infoWindow;
let userLocation = null;
let currentLocationMarker = null;
let searchMarker = null;
let filteredLocations = [...schoolLocations];

// Initialize Google Maps
function initMap() {
    console.log("Initializing Google Maps...");
    
    // Default center (Jakarta)
    const defaultCenter = { lat: -6.2088, lng: 106.8456 };
    
    try {
        // Create map
        map = new google.maps.Map(document.getElementById("map"), {
            center: defaultCenter,
            zoom: 6,
            styles: [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }]
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ color: "#f2f2f2" }]
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{ saturation: -100 }, { lightness: 45 }]
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{ visibility: "simplified" }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ color: "#c7d2fe" }, { visibility: "on" }]
                }
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        // Initialize InfoWindow
        infoWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });

        // Create markers for all locations
        createMarkers();
        
        // Initialize location cards
        renderLocationCards(filteredLocations);
        
        // Setup event listeners
        setupEventListeners();
        
        // Try to get user's location
        getUserLocation();
        
        console.log("Google Maps initialized successfully!");
        
    } catch (error) {
        console.error("Error initializing Google Maps:", error);
        document.getElementById('map').innerHTML = `
            <div class="no-results-message" style="height: 100%; display: flex; align-items: center; justify-content: center;">
                <div>
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Google Maps Tidak Dapat Dimuat</h4>
                    <p>Silakan periksa koneksi internet Anda atau coba gunakan browser lain.</p>
                </div>
            </div>
        `;
    }
}

// Create markers on map
function createMarkers(locations = schoolLocations) {
    console.log(`Creating ${locations.length} markers...`);
    
    // Clear existing markers
    markers.forEach(marker => {
        if (marker.setMap) {
            marker.setMap(null);
        }
    });
    markers = [];

    locations.forEach(location => {
        try {
            const marker = new google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                title: location.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: location.status === "active" ? "#4f46e5" : "#9ca3af",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 10
                },
                animation: google.maps.Animation.DROP
            });

            // Add click listener
            marker.addListener("click", () => {
                showInfoWindow(marker, location);
                highlightLocationCard(location.id);
            });

            // Add to markers array
            markers.push(marker);
            
        } catch (error) {
            console.error(`Error creating marker for ${location.name}:`, error);
        }
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
        try {
            const bounds = new google.maps.LatLngBounds();
            locations.forEach(location => {
                bounds.extend({ lat: location.latitude, lng: location.longitude });
            });
            map.fitBounds(bounds);
            
            // If only one location, zoom in more
            if (locations.length === 1) {
                setTimeout(() => {
                    map.setZoom(15);
                }, 500);
            }
        } catch (error) {
            console.error("Error fitting bounds:", error);
        }
    }
}

// Show InfoWindow
function showInfoWindow(marker, location) {
    try {
        const content = `
            <div class="info-window">
                <h3>${location.name}</h3>
                <span class="info-status">${location.status === "active" ? "Aktif" : "Akan Datang"}</span>
                <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
                <p><i class="fas fa-clock"></i> ${location.schedule}</p>
                <p><i class="fas fa-users"></i> Kapasitas: ${location.capacity} anak/hari</p>
                <p><i class="fas fa-user-check"></i> ${location.coordinator}</p>
                <div class="info-actions">
                    <a href="${location.googleMapsLink}" target="_blank" class="btn-info btn-info-primary">
                        <i class="fas fa-directions"></i> Petunjuk Arah
                    </a>
                    <a href="tel:${location.coordinator.match(/\d+/g)?.join('') || ''}" class="btn-info btn-info-secondary">
                        <i class="fas fa-phone"></i> Hubungi
                    </a>
                </div>
            </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        
    } catch (error) {
        console.error("Error showing info window:", error);
    }
}

// Highlight location card when marker is clicked
function highlightLocationCard(locationId) {
    try {
        // Remove active class from all cards
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to matching card
        const card = document.querySelector(`[data-id="${locationId}"]`);
        if (card) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } catch (error) {
        console.error("Error highlighting card:", error);
    }
}

// Render location cards
function renderLocationCards(locations) {
    const container = document.getElementById('locationCardsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    if (locations.length === 0) {
        container.innerHTML = '';
        noResultsMessage.style.display = 'block';
        return;
    }
    
    noResultsMessage.style.display = 'none';
    
    const cardsHTML = locations.map(location => {
        // Format phone number for tel link
        const phoneNumber = location.coordinator.match(/\d+/g)?.join('') || '';
        
        return `
        <div class="location-card" data-id="${location.id}" data-province="${location.province}" data-status="${location.status}">
            <div class="location-card-header">
                <div class="location-icon">
                    <i class="fas fa-school"></i>
                </div>
                <div class="location-title">
                    <h3>${location.name}</h3>
                    <span class="location-status ${location.status}">
                        ${location.status === "active" ? "Aktif" : "Akan Datang"}
                    </span>
                </div>
                <div class="location-distance">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${location.city}</span>
                </div>
            </div>
            <div class="location-card-body">
                <div class="location-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Alamat</h4>
                            <p>${location.address}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>Jadwal Distribusi</h4>
                            <p>${location.schedule}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <div>
                            <h4>Kapasitas</h4>
                            <p>${location.capacity} anak per hari</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user-check"></i>
                        <div>
                            <h4>Koordinator</h4>
                            <p>${location.coordinator}</p>
                        </div>
                    </div>
                </div>
                <div class="location-features">
                    ${location.features.includes("wifi") ? '<span class="feature-tag"><i class="fas fa-wifi"></i> Free WiFi</span>' : ''}
                    ${location.features.includes("parking") ? '<span class="feature-tag"><i class="fas fa-parking"></i> Parkir</span>' : ''}
                    ${location.features.includes("accessible") ? '<span class="feature-tag"><i class="fas fa-wheelchair"></i> Aksesibel</span>' : ''}
                    ${location.features.includes("toilet") ? '<span class="feature-tag"><i class="fas fa-restroom"></i> Toilet</span>' : ''}
                    ${location.features.includes("first-aid") ? '<span class="feature-tag"><i class="fas fa-first-aid"></i> P3K</span>' : ''}
                </div>
                <div class="location-actions">
                    <a href="${location.googleMapsLink}" target="_blank" class="btn-location btn-location-primary">
                        <i class="fas fa-directions"></i> Petunjuk Arah
                    </a>
                    <a href="tel:${phoneNumber}" class="btn-location btn-location-secondary">
                        <i class="fas fa-phone"></i> Hubungi
                    </a>
                </div>
            </div>
        </div>
    `}).join('');
    
    container.innerHTML = cardsHTML;
    
    // Add click listeners to cards
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const locationId = parseInt(card.dataset.id);
            const location = locations.find(loc => loc.id === locationId);
            
            if (location) {
                try {
                    // Center map on location
                    map.setCenter({ lat: location.latitude, lng: location.longitude });
                    map.setZoom(15);
                    
                    // Show InfoWindow
                    const marker = markers.find(m => {
                        try {
                            return m.getPosition().lat() === location.latitude && 
                                   m.getPosition().lng() === location.longitude;
                        } catch {
                            return false;
                        }
                    });
                    
                    if (marker) {
                        showInfoWindow(marker, location);
                    }
                    
                    // Highlight card
                    highlightLocationCard(locationId);
                    
                } catch (error) {
                    console.error("Error centering map:", error);
                }
            }
        });
    });
}

// Filter locations
function filterLocations() {
    try {
        const searchTerm = document.getElementById('locationSearch').value.toLowerCase().trim();
        const provinceFilter = document.getElementById('provinceFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        
        filteredLocations = schoolLocations.filter(location => {
            // Search filter
            const matchesSearch = !searchTerm || 
                location.name.toLowerCase().includes(searchTerm) ||
                location.address.toLowerCase().includes(searchTerm) ||
                location.city.toLowerCase().includes(searchTerm);
            
            // Province filter
            const matchesProvince = !provinceFilter || location.province === provinceFilter;
            
            // Status filter
            const matchesStatus = !statusFilter || location.status === statusFilter;
            
            return matchesSearch && matchesProvince && matchesStatus;
        });
        
        // Update map markers
        createMarkers(filteredLocations);
        
        // Update cards
        renderLocationCards(filteredLocations);
        
        // Show search marker if search term exists
        if (searchTerm && filteredLocations.length > 0) {
            performLocationSearch(searchTerm);
        } else {
            // Remove search marker
            if (searchMarker) {
                searchMarker.setMap(null);
                searchMarker = null;
            }
        }
        
        // Show notification
        if (searchTerm || provinceFilter || statusFilter) {
            showNotification("info", `Ditemukan ${filteredLocations.length} lokasi`);
        }
        
    } catch (error) {
        console.error("Error filtering locations:", error);
        showNotification("error", "Terjadi kesalahan saat memfilter lokasi");
    }
}

// Perform location search using Google Places
function performLocationSearch(searchTerm) {
    try {
        if (!searchTerm || !window.google || !window.google.maps || !window.google.maps.Geocoder) {
            return;
        }
        
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: searchTerm + ', Indonesia' }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                
                // Remove previous search marker
                if (searchMarker) {
                    searchMarker.setMap(null);
                }
                
                // Add new search marker
                searchMarker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: `Hasil pencarian: ${searchTerm}`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "#10b981",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                        scale: 12
                    },
                    animation: google.maps.Animation.BOUNCE
                });
                
                // Center map on search result
                map.setCenter(location);
                map.setZoom(12);
                
                // Show InfoWindow for search result
                const infoContent = `
                    <div class="info-window">
                        <h3>Hasil Pencarian</h3>
                        <p><i class="fas fa-search"></i> "${searchTerm}"</p>
                        <p>${results[0].formatted_address}</p>
                        <p><i class="fas fa-school"></i> Ditemukan ${filteredLocations.length} lokasi MBG di sekitar sini</p>
                    </div>
                `;
                
                infoWindow.setContent(infoContent);
                infoWindow.open(map, searchMarker);
            }
        });
        
    } catch (error) {
        console.error("Error performing location search:", error);
    }
}

// Get user's current location
function getUserLocation() {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Add marker for user's location
                    if (currentLocationMarker) {
                        currentLocationMarker.setMap(null);
                    }
                    
                    currentLocationMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Lokasi Anda",
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: "#3b82f6",
                            fillOpacity: 1,
                            strokeColor: "#ffffff",
                            strokeWeight: 2,
                            scale: 8
                        }
                    });
                    
                    showNotification("success", "Lokasi Anda berhasil dideteksi");
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    showNotification("error", "Tidak dapat mengakses lokasi Anda");
                }
            );
        }
    } catch (error) {
        console.error("Error getting user location:", error);
    }
}

// Setup event listeners
function setupEventListeners() {
    try {
        // Search button
        document.getElementById('searchBtn').addEventListener('click', (e) => {
            e.preventDefault();
            filterLocations();
        });
        
        // Search input (enter key)
        document.getElementById('locationSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterLocations();
            }
        });
        
        // Filter changes
        document.getElementById('provinceFilter').addEventListener('change', filterLocations);
        document.getElementById('statusFilter').addEventListener('change', filterLocations);
        
        // Reset filters button
        document.getElementById('resetFilters').addEventListener('click', () => {
            document.getElementById('locationSearch').value = '';
            document.getElementById('provinceFilter').value = '';
            document.getElementById('statusFilter').value = '';
            filterLocations();
            showNotification("info", "Filter telah direset");
        });
        
        // Reset search button
        document.getElementById('resetSearchBtn').addEventListener('click', () => {
            document.getElementById('locationSearch').value = '';
            filterLocations();
            showNotification("info", "Pencarian telah direset");
        });
        
        // Current location button
        document.getElementById('currentLocationBtn').addEventListener('click', () => {
            if (userLocation && map) {
                map.setCenter(userLocation);
                map.setZoom(14);
                showNotification("info", "Map dipindahkan ke lokasi Anda");
            } else {
                getUserLocation();
            }
        });
        
        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            if (map) {
                map.setZoom(map.getZoom() + 1);
            }
        });
        
        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            if (map) {
                map.setZoom(map.getZoom() - 1);
            }
        });
        
        console.log("Event listeners setup completed!");
        
    } catch (error) {
        console.error("Error setting up event listeners:", error);
    }
}

// Show notification
function showNotification(type, message) {
    try {
        const notification = document.getElementById('notification');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
        });
        
    } catch (error) {
        console.error("Error showing notification:", error);
    }
}

// Initialize Google Maps ketika halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan Google Maps API sudah dimuat
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        console.log("Menunggu Google Maps API...");
        // Coba init map setelah beberapa saat
        setTimeout(() => {
            if (typeof google !== 'undefined') {
                initMap();
            } else {
                console.error("Google Maps API gagal dimuat");
            }
        }, 2000);
    }
});

// Global error handler for Google Maps
window.gm_authFailure = function() {
    console.error("Google Maps authentication failed!");
    document.getElementById('map').innerHTML = `
        <div class="no-results-message" style="height: 100%; display: flex; align-items: center; justify-content: center;">
            <div>
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Google Maps Tidak Tersedia</h4>
                <p>API Key Google Maps tidak valid atau telah mencapai batas penggunaan.</p>
                <p>Silakan coba lagi nanti atau hubungi administrator.</p>
            </div>
        </div>
    `;
};

    // Menu Tabs - COMPLETELY FIXED
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const day = this.dataset.day;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${day}-menu`) {
                    content.classList.add('active');
                    
                    // Add animation effect
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
        });
    });

    // Donation Form
    const donationForm = document.getElementById('donationForm');
    const amountOptions = document.querySelectorAll('.amount-option');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const customAmountInput = document.getElementById('customAmount');
    
    // Amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customAmountInput.value = '';
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        amountOptions.forEach(opt => opt.classList.remove('active'));
        
        // Format input with thousand separators
        let value = this.value.replace(/\D/g, '');
        if (value) {
            value = parseInt(value).toLocaleString('id-ID');
            this.value = `Rp ${value}`;
        }
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('donorName').value;
        const email = document.getElementById('donorEmail').value;
        const phone = document.getElementById('donorPhone').value;
        const amount = getSelectedAmount();
        const method = document.querySelector('.payment-method.active').dataset.method;
        const message = document.getElementById('donorMessage').value;
        
        // Validate form
        if (!name || !email || !phone) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Form tidak lengkap!</strong><br>
                    Harap lengkapi semua field yang wajib diisi.
                </div>
            `);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Email tidak valid!</strong><br>
                    Harap masukkan alamat email yang valid.
                </div>
            `);
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success notification
            showNotification('success', `
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Terima kasih ${name}!</strong><br>
                    Donasi sebesar <strong>${amount}</strong> via ${getMethodName(method)} telah berhasil direkam.<br>
                    Invoice telah dikirim ke email: ${email}
                </div>
            `);
            
            // Reset form
            this.reset();
            amountOptions[0].classList.add('active');
            paymentMethods[0].classList.add('active');
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Send to analytics (simulated)
            console.log('Donation recorded:', { name, email, phone, amount, method });
            
        }, 1500);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const subscribe = document.getElementById('subscribeNewsletter').checked;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Form tidak lengkap!</strong><br>
                    Harap lengkapi semua field yang wajib diisi.
                </div>
            `);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Email tidak valid!</strong><br>
                    Harap masukkan alamat email yang valid.
                </div>
            `);
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('success', `
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Pesan terkirim!</strong><br>
                    Terima kasih ${name}, pesan Anda telah berhasil dikirim.<br>
                    Kami akan membalas ke email: ${email}
                    ${subscribe ? '<br><small>Anda telah berlangganan newsletter MBG</small>' : ''}
                </div>
            `);
            
            this.reset();
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Send to analytics (simulated)
            console.log('Contact form submitted:', { name, email, phone, subject, subscribe });
            
        }, 1500);
    });

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('error', `
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <strong>Email tidak valid!</strong><br>
                        Harap masukkan alamat email yang valid.
                    </div>
                `);
                return;
            }
            
            // Show loading
            const button = this.querySelector('button');
            const originalHtml = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('success', `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Berhasil berlangganan!</strong><br>
                        Terima kasih telah berlangganan newsletter MBG.<br>
                        Update akan dikirim ke: ${email}
                    </div>
                `);
                
                this.reset();
                button.innerHTML = originalHtml;
                button.disabled = false;
                
                console.log('Newsletter subscription:', { email });
                
            }, 1000);
        });
    });

    // Impact Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.count);
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, duration / steps);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Notification System
    const notification = document.getElementById('notification');
    let notificationTimeout;
    
    function showNotification(type, content) {
        // Clear any existing timeout
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }
        
        // Update notification content and type
        notification.innerHTML = content;
        notification.className = `notification ${type}`;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', hideNotification);
        notification.appendChild(closeBtn);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        notificationTimeout = setTimeout(hideNotification, 5000);
    }
    
    function hideNotification() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.innerHTML = '';
        }, 300);
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        let scrollPosition = window.scrollY + 200; // Offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveNavLink();
    
    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNavLink();
        });
    });

    // Helper Functions
    function getSelectedAmount() {
        const activeAmount = document.querySelector('.amount-option.active');
        if (activeAmount) {
            return activeAmount.querySelector('.amount').textContent;
        } else if (customAmountInput && customAmountInput.value) {
            return customAmountInput.value;
        }
        return 'Rp 0';
    }
    
    function getMethodName(method) {
        switch(method) {
            case 'bank': return 'Transfer Bank';
            case 'ewallet': return 'E-Wallet';
            case 'qris': return 'QRIS';
            default: return 'Transfer';
        }
    }

    // Initialize animations on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove existing animation classes
                element.classList.remove('animate__fadeIn', 'animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeInLeft', 'animate__fadeInRight');
                
                // Add new animation based on data attribute or default
                const animation = element.dataset.animation || 'animate__fadeInUp';
                element.classList.add(animation);
                
                // Add delay if specified
                if (element.dataset.delay) {
                    element.style.animationDelay = element.dataset.delay;
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => animationObserver.observe(element));

    // Parallax effect for hero shapes
    let parallaxTimeout;
    window.addEventListener('scroll', () => {
        if (parallaxTimeout) {
            window.cancelAnimationFrame(parallaxTimeout);
        }
        
        parallaxTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    });

    // Video modal functionality
    const videoButtons = document.querySelectorAll('[href*="youtu.be"], [href*="youtube.com"]');
    
    videoButtons.forEach(button => {
        if (button.getAttribute('target') !== '_blank') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const videoUrl = this.href;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                        <div class="video-container">
                            <iframe src="${videoUrl.replace('watch?v=', 'embed/')}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
                
                // Close modal
                const closeModal = () => {
                    modal.remove();
                    document.body.style.overflow = '';
                };
                
                modal.querySelector('.modal-close').addEventListener('click', closeModal);
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                // Close on Escape key
                document.addEventListener('keydown', function closeOnEscape(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                });
            });
        }
    });

    // Add CSS for video modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            width: 90%;
            max-width: 800px;
            animation: scaleIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            transition: transform 0.3s ease;
        }
        
        .modal-close:hover {
            transform: scale(1.1);
        }
        
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .no-results-message {
            text-align: center;
            padding: 3rem;
            grid-column: 1 / -1;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            margin-top: 2rem;
        }
        
        .no-results-message i {
            font-size: 3rem;
            color: var(--gray-light);
            margin-bottom: 1rem;
        }
        
        .no-results-message h4 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--dark);
        }
        
        .no-results-message p {
            color: var(--gray);
            margin: 0;
        }
    `;
    document.head.appendChild(modalStyle);

    // Location card click handler
    locationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on buttons or links
            if (!e.target.closest('a') && !e.target.closest('button')) {
                locationCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Update corresponding map point
                const locationId = this.id.replace('-card', '');
                mapPoints.forEach(p => {
                    p.classList.remove('active');
                    if (p.dataset.location === locationId) {
                        p.classList.add('active');
                        
                        // Add pulse animation
                        const pulse = p.querySelector('.point-pulse');
                        pulse.style.animation = 'none';
                        void pulse.offsetWidth;
                        pulse.style.animation = 'pointPulse 2s infinite';
                    }
                });
                
                // Scroll to card with offset for header
                setTimeout(() => {
                    const headerHeight = header.offsetHeight;
                    const cardTop = this.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: cardTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Initialize location search
    initLocationSearch();
    
    // Add animation for map points
    const addMapAnimations = () => {
        mapPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '0';
                point.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    point.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    point.style.opacity = '1';
                    point.style.transform = 'scale(1)';
                }, index * 200);
            }, 500);
        });
    };
    
    // Trigger map animations when section is in view
    const locationsSection = document.getElementById('locations-menu');
    if (locationsSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addMapAnimations();
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sectionObserver.observe(locationsSection);
    }

    // Form input animations
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add CSS for form animations
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group {
            position: relative;
        }
        
        .form-group.focused label {
            color: var(--primary);
            transform: translateY(-5px);
        }
        
        input:focus, select:focus, textarea:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
        }
        
        @keyframes pointPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            }
        }
        
        .search-box {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .search-box i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
        }
        
        .search-box input {
            flex: 1;
            padding: 0.75rem 1rem 0.75rem 3rem;
            border: 2px solid var(--light);
            border-radius: var(--radius);
            font-family: var(--font-primary);
            font-size: 1rem;
        }
        
        .search-filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .search-filters select {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid var(--light);
            border-radius: var(--radius);
            background: var(--white);
            font-family: var(--font-primary);
        }
        
        @media (max-width: 768px) {
            .search-box {
                flex-direction: column;
            }
            
            .search-filters {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(formStyle);

    // Initialize with animation
    setTimeout(() => {
        // Add initial animation to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 100);

    console.log('🎯 MBG Indonesia - Enhanced Website Initialized');
    console.log('✅ Features loaded:');
    console.log('   - Smooth Navigation');
    console.log('   - Location Map Interaction');
    console.log('   - Menu System');
    console.log('   - Donation Form');
    console.log('   - Contact System');
    console.log('   - Impact Stats Counter');
    console.log('   - Notification System');
    console.log('   - Responsive Design');
});