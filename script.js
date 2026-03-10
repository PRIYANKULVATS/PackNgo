// enhanced interactive behaviors: mobile nav, persistence, validation, carousel controls, toast
    const modal = id => document.getElementById(id);

    // Toast helper
    const toastEl = document.getElementById('toast');
    function showToast(msg, ms = 3000){
      if(!toastEl) return alert(msg);
      toastEl.textContent = msg; toastEl.classList.add('show');
      setTimeout(()=>{toastEl.classList.remove('show');}, ms);
    }

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    if(navToggle){
      navToggle.addEventListener('click', ()=>{
        const open = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // Close mobile nav when a link is clicked
    mainNav && mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ mainNav.classList.remove('open'); navToggle && navToggle.setAttribute('aria-expanded','false'); }));

    // Login modal + persistence
    document.getElementById('openLogin').addEventListener('click', e=>{ e.preventDefault(); openLogin(); });
    function openLogin(){ modal('modalLogin').classList.add('open'); }
    function closeLogin(){ modal('modalLogin').classList.remove('open'); }
    
    function login3D() {
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPass').value.trim();
      if (!email || !pass) {
        showToast('Please enter email and password');
        return;
      }
      localStorage.setItem('packngo_login', email);
      showToast('Login successful! (Demo)');
      closeLogin();
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPass').value = '';
    }
    
    function loginSocial(provider) {
      showToast(`Logging in with ${provider}... (Demo)`);
      setTimeout(() => {
        showToast(`${provider} login would connect here`);
      }, 1000);
    }
    
    function openSignupModal() {
      modal('modalSignup').classList.add('open');
    }
    
    function closeSignupModal() {
      modal('modalSignup').classList.remove('open');
    }
    
    function signup3D() {
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const pass = document.getElementById('signupPass').value.trim();
      if (!name || !email || !pass) {
        showToast('Please fill in all fields');
        return;
      }
      showToast('Account created! (Demo)');
      closeSignupModal();
      document.getElementById('signupName').value = '';
      document.getElementById('signupEmail').value = '';
      document.getElementById('signupPass').value = '';
    }
    
    function openForgotModal() {
      modal('modalForgot').classList.add('open');
    }
    
    function closeForgotModal() {
      modal('modalForgot').classList.remove('open');
    }
    
    function forgot3D() {
      const email = document.getElementById('forgotEmail').value.trim();
      if (!email) {
        showToast('Please enter your email');
        return;
      }
      showToast('Password reset link sent to ' + email + ' (Demo)');
      closeForgotModal();
      document.getElementById('forgotEmail').value = '';
    }
    
    // Prefill login email and auto-close login modal if already logged in
    const savedLogin = localStorage.getItem('packngo_login');
    if(savedLogin) {
      document.getElementById('loginEmail').value = savedLogin;
      // Auto-close login modal if user is already logged in
      const loginModal = document.getElementById('modalLogin');
      if(loginModal) loginModal.classList.remove('open');
    }

    // AI Agent
    document.getElementById('openAgent').addEventListener('click', ()=>openAgent());
    function openAgent(){ modal('agentModal').classList.add('open'); }
    function closeAgent(){ modal('agentModal').classList.remove('open'); }

    // Travel Vlogs
    function demoPageVlogs(){
      populateVlogs();
      openVlogsModal();
    }
    function openVlogsModal(){ modal('vlogsModal').classList.add('open'); }
    function closeVlogsModal(){ modal('vlogsModal').classList.remove('open'); }
    function populateVlogs(){
      const list = document.getElementById('vlogsList');
      list.innerHTML = '';
      const vlogs = [
        {title: 'Tokyo Nights: Hidden Gems', creator: 'WanderlustMia', views: '2.3M', likes: 45000, desc: 'Exploring Shibuya after dark and the best ramen spots.', thumb: '🌃'},
        {title: 'Swiss Alps Adventure', creator: 'MountainMike', views: '1.8M', likes: 32000, desc: 'Hiking Interlaken and paragliding over the peaks.', thumb: '🏔️'},
        {title: 'Bali Beach Vibes', creator: 'IslandExplorer', views: '3.1M', likes: 67000, desc: 'Surfing in Uluwatu and yoga retreats in Ubud.', thumb: '🏖️'},
        {title: 'Paris Food Tour', creator: 'FoodieFran', views: '4.2M', likes: 89000, desc: 'From croissants to escargot - a culinary journey.', thumb: '🥐'},
        {title: 'Safari in Kenya', creator: 'WildlifeWendy', views: '2.7M', likes: 55000, desc: 'Tracking lions and elephants in the Maasai Mara.', thumb: '🦁'},
        {title: 'Iceland Aurora Chase', creator: 'NorthernLightsNick', views: '1.5M', likes: 28000, desc: 'Northern lights and blue lagoons in winter.', thumb: '🌌'}
      ];
      vlogs.forEach(v => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#1a1a2e;border-radius:10px;padding:12px;cursor:pointer;transition:300ms;border:1px solid #333';
        card.onmouseover = () => card.style.transform = 'translateY(-2px)';
        card.onmouseout = () => card.style.transform = 'none';
        card.onclick = () => playVlog(v);
        card.innerHTML = `
          <div style="font-size:24px;margin-bottom:8px">${v.thumb}</div>
          <h4 style="margin:0 0 4px 0;font-size:14px;color:var(--accent)">${v.title}</h4>
          <p style="margin:0 0 8px 0;font-size:12px;color:var(--soft)">by ${v.creator} • ${v.views} views</p>
          <p style="margin:0 0 12px 0;font-size:12px;color:#ccc">${v.desc}</p>
          <div style="display:flex;gap:8px">
            <button class="btn" style="font-size:12px;padding:4px 8px" onclick="event.stopPropagation(); likeVlog('${v.title}')">👍 ${v.likes.toLocaleString()}</button>
            <button class="btn" style="font-size:12px;padding:4px 8px" onclick="event.stopPropagation(); commentVlog('${v.title}')">💬 Comment</button>
          </div>
        `;
        list.appendChild(card);
      });
    }
    function playVlog(v){
      showToast(`Playing: ${v.title} by ${v.creator} (demo video)`);
      // In a real app, this would load a video player
    }
    function likeVlog(title){
      showToast(`Liked: ${title}!`);
      // In a real app, this would update the like count on server
    }
    function commentVlog(title){
      const comment = prompt(`Add a comment to "${title}":`);
      if(comment) showToast(`Comment added: "${comment}"`);
    }

    // Interactive Widgets
    function toggleWeather(){
      modal('weatherModal').classList.add('open');
      updateWeather();
    }
    function closeWeatherModal(){
      modal('weatherModal').classList.remove('open');
    }
    function updateWeather(){
      const city = document.getElementById('weatherSelect').value;
      document.getElementById('weatherCity').textContent = city;
      
      // Mock weather data
      const weatherData = {
        'Delhi': { temp: '28°C', desc: 'Sunny', icon: '☀️', humidity: '45%', wind: '15 km/h' },
        'Mumbai': { temp: '30°C', desc: 'Humid', icon: '🌤️', humidity: '75%', wind: '12 km/h' },
        'Bangalore': { temp: '24°C', desc: 'Pleasant', icon: '🌤️', humidity: '60%', wind: '10 km/h' },
        'Goa': { temp: '32°C', desc: 'Beach Weather', icon: '🏖️', humidity: '70%', wind: '18 km/h' },
        'Paris': { temp: '18°C', desc: 'Cloudy', icon: '☁️', humidity: '55%', wind: '8 km/h' },
        'Tokyo': { temp: '22°C', desc: 'Clear', icon: '🌤️', humidity: '50%', wind: '11 km/h' },
        'New York': { temp: '15°C', desc: 'Cool', icon: '🌥️', humidity: '40%', wind: '20 km/h' },
        'London': { temp: '16°C', desc: 'Rainy', icon: '🌧️', humidity: '80%', wind: '14 km/h' }
      };
      
      const data = weatherData[city] || weatherData['Delhi'];
      document.getElementById('detailTemp').textContent = data.temp;
      document.getElementById('weatherDesc').textContent = data.desc;
      document.getElementById('weatherDetails').querySelector('div').textContent = data.icon;
      document.getElementById('humidity').textContent = data.humidity;
      document.getElementById('windSpeed').textContent = data.wind;
      document.getElementById('weatherTemp').textContent = data.temp;
    }

    function toggleCurrency(){
      modal('currencyModal').classList.add('open');
      convertCurrency();
    }
    function closeCurrencyModal(){
      modal('currencyModal').classList.remove('open');
    }
    function convertCurrency(){
      const amount = parseFloat(document.getElementById('currencyAmount').value) || 0;
      const from = document.getElementById('currencyFrom').value;
      const to = document.getElementById('currencyTo').value;
      
      // Mock exchange rates
      const rates = {
        'USD': { 'INR': 83.5, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150.2, 'USD': 1 },
        'EUR': { 'INR': 90.8, 'USD': 1.09, 'GBP': 0.86, 'JPY': 163.4, 'EUR': 1 },
        'GBP': { 'INR': 105.6, 'USD': 1.27, 'EUR': 1.16, 'JPY': 190.1, 'GBP': 1 },
        'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 'JPY': 1.8, 'INR': 1 },
        'JPY': { 'INR': 0.556, 'USD': 0.0067, 'EUR': 0.0061, 'GBP': 0.0053, 'JPY': 1 }
      };
      
      const rate = rates[from][to];
      const converted = (amount * rate).toFixed(2);
      document.getElementById('convertedAmount').textContent = converted;
      document.getElementById('currencyRate').textContent = `1 ${from} = ${rate.toFixed(2)} ${to}`;
    }

    // Live Stats Simulation
    function updateLiveStats(){
      const visitorEl = document.getElementById('visitorCount');
      const bookingEl = document.getElementById('bookingCount');
      const flightEl = document.getElementById('flightCount');
      
      let visitors = parseInt(visitorEl.textContent.replace(',', ''));
      let bookings = parseInt(bookingEl.textContent);
      let flights = parseInt(flightEl.textContent);
      
      // Simulate live updates
      visitors += Math.floor(Math.random() * 3) - 1; // -1 to +2
      bookings += Math.random() > 0.7 ? 1 : 0;
      flights += Math.random() > 0.8 ? 1 : 0;
      
      visitors = Math.max(1000, Math.min(2000, visitors));
      bookings = Math.max(50, Math.min(150, bookings));
      flights = Math.max(100, Math.min(300, flights));
      
      visitorEl.textContent = visitors.toLocaleString();
      bookingEl.textContent = bookings;
      flightEl.textContent = flights;
    }
    // Update stats every 30 seconds
    setInterval(updateLiveStats, 30000);

    // Notifications
    function toggleNotifications(){
      modal('notificationsModal').classList.add('open');
      loadNotifications();
      // Hide badge when opened
      document.getElementById('notificationBadge').style.display = 'none';
    }
    function closeNotificationsModal(){
      modal('notificationsModal').classList.remove('open');
    }
    function loadNotifications(){
      const list = document.getElementById('notificationsList');
      const notifications = [
        {icon: '✈️', title: 'Flight Deal Alert', message: '20% off on flights to Goa this weekend!', time: '2 min ago', urgent: true},
        {icon: '🏖️', title: 'Hotel Recommendation', message: 'Beach Resort in Kerala - Book now for best rates', time: '15 min ago', urgent: false},
        {icon: '🌤️', title: 'Weather Update', message: 'Clear skies expected in Delhi for your trip', time: '1 hour ago', urgent: false},
        {icon: '💰', title: 'Price Drop', message: 'Your saved flight to Mumbai is now ₹2,500 cheaper', time: '2 hours ago', urgent: true},
        {icon: '🎯', title: 'Personalized Offer', message: 'Exclusive 15% discount on your next booking', time: '1 day ago', urgent: false}
      ];
      
      list.innerHTML = notifications.map(n => `
        <div style="padding:12px;border-bottom:1px solid #333;cursor:pointer" onclick="markAsRead(this)">
          <div style="display:flex;gap:8px;align-items:flex-start">
            <span style="font-size:18px">${n.icon}</span>
            <div style="flex:1">
              <div style="font-weight:600;font-size:14px;margin-bottom:4px">${n.title}</div>
              <div style="font-size:12px;color:var(--soft);margin-bottom:4px">${n.message}</div>
              <div style="font-size:10px;color:#666">${n.time}</div>
            </div>
            ${n.urgent ? '<span style="color:#ff4757;font-size:12px">●</span>' : ''}
          </div>
        </div>
      `).join('');
    }
    function markAsRead(element){
      element.style.opacity = '0.6';
      showToast('Notification marked as read');
    }

    // Simulate new notifications
    function addRandomNotification(){
      if(Math.random() > 0.7){ // 30% chance every 2 minutes
        const badge = document.getElementById('notificationBadge');
        let count = parseInt(badge.textContent) || 0;
        count++;
        badge.textContent = count;
        badge.style.display = 'inline';
        showToast('New notification received!');
      }
    }
    setInterval(addRandomNotification, 120000); // Every 2 minutes

    // Chat Widget
    function initChatWidget(){
      const chatWidget = document.createElement('div');
      chatWidget.id = 'chatWidget';
      chatWidget.innerHTML = `
        <div id="chatToggle" onclick="toggleChat()" style="position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,var(--accent),var(--luxury-purple));border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;cursor:pointer;z-index:1000;box-shadow:0 4px 20px rgba(0,212,255,0.3);transition:all 0.3s ease">
          💬
        </div>
        <div id="chatWindow" style="display:none;position:fixed;bottom:90px;right:20px;width:350px;height:500px;background:#1a1a2e;border-radius:12px;border:1px solid #333;z-index:999;box-shadow:0 8px 30px rgba(0,0,0,0.5);overflow:hidden">
          <div style="padding:16px;background:linear-gradient(90deg,var(--accent),var(--luxury-purple));color:white;font-weight:600;display:flex;justify-content:space-between;align-items:center">
            <span>AI Travel Assistant</span>
            <button onclick="toggleChat()" style="background:none;border:none;color:white;font-size:18px;cursor:pointer">✕</button>
          </div>
          <div id="chatMessages" style="padding:16px;height:380px;overflow-y:auto;background:#0f0f23">
            <div style="text-align:center;color:#666;margin:20px 0">🤖 Hi! I'm your AI Travel Assistant powered by ChatGPT. Ask me anything about travel!</div>
          </div>
          <div style="padding:16px;border-top:1px solid #333;display:flex;gap:8px">
            <input id="chatInput" placeholder="Ask me anything..." style="flex:1;padding:8px;border:1px solid #555;border-radius:6px;background:#1a1a2e;color:white" onkeypress="if(event.key==='Enter') sendChatMessage()">
            <button onclick="sendChatMessage()" style="padding:8px 12px;background:var(--accent);border:none;border-radius:6px;color:white;cursor:pointer">Send</button>
          </div>
        </div>
      `;
      document.body.appendChild(chatWidget);
    }
    function toggleChat(){
      const window = document.getElementById('chatWindow');
      window.style.display = window.style.display === 'none' ? 'block' : 'none';
    }
    // AI Configuration - Replace with your OpenAI API key
    const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Get from https://platform.openai.com/api-keys

    async function getAIResponse(userMessage) {
      if (OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
        return "AI assistant is not configured. Please add your OpenAI API key to enable AI responses.";
      }
      
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful travel assistant for PackNgo. Provide accurate, real-time travel advice, recommendations, and information. Be friendly and informative.' },
              { role: 'user', content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
      } catch (error) {
        console.error('AI Error:', error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
      }
    }

    function sendChatMessage(){
      const input = document.getElementById('chatInput');
      const message = input.value.trim();
      if(!message) return;
      
      const messages = document.getElementById('chatMessages');
      messages.innerHTML += `<div style="margin:8px 0;text-align:right"><div style="display:inline-block;padding:8px 12px;background:var(--accent);border-radius:8px;color:white">${message}</div></div>`;
      
      // AI Response using ChatGPT
      getAIResponse(message).then(response => {
        messages.innerHTML += `<div style="margin:8px 0"><div style="display:inline-block;padding:8px 12px;background:#333;border-radius:8px;color:#ccc">${response}</div></div>`;
        messages.scrollTop = messages.scrollHeight;
      }).catch(error => {
        messages.innerHTML += `<div style="margin:8px 0"><div style="display:inline-block;padding:8px 12px;background:#333;border-radius:8px;color:#ccc">Sorry, I couldn't get a response right now. Please try again.</div></div>`;
        messages.scrollTop = messages.scrollHeight;
        console.error('AI Error:', error);
      });
      
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
    // Initialize chat widget
    initChatWidget();

    // Google Maps / Leaflet Initialization
    let map;
    let marker;
    function initMap() {
      const loadingEl = document.getElementById('map-loading');
      const mapEl = document.getElementById('map');
      if (loadingEl) loadingEl.style.display = 'none';
      if (mapEl) mapEl.style.display = 'block';

      const defaultLocation = { lat: 20.5937, lng: 78.9629 }; // Center of India

      // If Google Maps is available, use it
      if (window.google && google.maps) {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: defaultLocation,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#a0c4ff' }] },
            { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#a0c4ff' }] },
            { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#a0c4ff' }] },
            { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
            { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
            { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
            { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
            { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
            { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
            { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
            { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
            { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#a0c4ff' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#001f3f' }] },
            { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
            { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
          ]
        });

        // Add search functionality (Google Places)
        const input = document.getElementById('map-search');
        try {
          const searchBox = new google.maps.places.SearchBox(input);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
          });

          searchBox.addListener('places_changed', function() {
            const places = searchBox.getPlaces();
            if (places.length == 0) return;

            const bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) return;
              if (marker) marker.setMap(null);
              marker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
              });
              if (place.geometry.viewport) bounds.union(place.geometry.viewport);
              else bounds.extend(place.geometry.location);
            });
            map.fitBounds(bounds);
          });
        } catch (e) {
          console.warn('Google Places not available:', e);
        }

      } else if (window.L) {
        // Leaflet fallback
        const defaultLatLng = [defaultLocation.lat, defaultLocation.lng];
        try {
          map = L.map('map').setView(defaultLatLng, 5);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
          marker = L.marker(defaultLatLng).addTo(map);
        } catch (err) {
          console.error('Leaflet init error', err);
          if (loadingEl) loadingEl.innerHTML = 'Map failed to load.';
        }
      } else {
        if (loadingEl) loadingEl.innerHTML = 'Map service not available.';
      }
    }

    // Search place: Google Places when available, else Nominatim + Leaflet
    function searchPlace() {
      const query = document.getElementById('map-search').value;
      if (!query) return;

      if (window.google && google.maps) {
        const service = new google.maps.places.PlacesService(map);
        const request = { query: query, fields: ['name', 'geometry', 'formatted_address'] };
        service.findPlaceFromQuery(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
            const place = results[0];
            if (marker) marker.setMap(null);
            marker = new google.maps.Marker({ map: map, title: place.name, position: place.geometry.location });
            map.setCenter(place.geometry.location);
            map.setZoom(15);
          }
        });
        return;
      }

      // Nominatim fallback for Leaflet
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(results => {
          if (!results || !results[0]) return showToast('Place not found');
          const r = results[0];
          const lat = parseFloat(r.lat), lon = parseFloat(r.lon);
          if (window.L && map) {
            if (marker && marker.remove) marker.remove();
            marker = L.marker([lat, lon]).addTo(map).bindPopup(r.display_name).openPopup();
            map.setView([lat, lon], 13);
          }
        }).catch(err => {
          console.error('Nominatim error', err); showToast('Search failed');
        });
    }

    // Initialize map when Google Maps API loads
    // window.initMap = initMap; // Not needed with callback

    // Fallback for map loading error
    window.addEventListener('load', function() {
      setTimeout(() => {
        const loadingEl = document.getElementById('map-loading');
        const mapEl = document.getElementById('map');
        if (loadingEl && loadingEl.style.display !== 'none') {
          loadingEl.innerHTML = 'Map failed to load. Please check your internet connection and API key.';
        }
      }, 10000); // 10 second timeout
    });

    // Typing Effect for Hero Title
    function typeWriter(text, element, speed = 100) {
      let i = 0;
      element.innerHTML = '';
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }

    // Initialize typing effect
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      setTimeout(() => {
        typeWriter('PackNgo — Plan smarter, travel bolder', heroTitle);
      }, 1000);
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Interactive Elements: Add click effects
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });

    // Scroll-triggered Animations
    function revealOnScroll() {
      const elements = document.querySelectorAll('.card, section h2, .feature-item');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }

    // Initial setup for scroll animations
    document.querySelectorAll('.card, section h2, .feature-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Animated Counters
    function animateCounter(element, target, duration = 2000) {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    }

    // Animate counters when in view
    function animateCountersOnScroll() {
      const counters = [
        { id: 'visitorCount', target: 1247 },
        { id: 'bookingCount', target: 89 },
        { id: 'flightCount', target: 156 }
      ];

      counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element && element.getBoundingClientRect().top < window.innerHeight - 100 && !element.dataset.animated) {
          animateCounter(element, counter.target);
          element.dataset.animated = 'true';
        }
      });
    }

    window.addEventListener('scroll', animateCountersOnScroll);
    animateCountersOnScroll(); // Initial check

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 100;
      font-size: 20px;
      box-shadow: 0 4px 20px rgba(30,144,255,0.3);
      will-change: opacity;
    `;
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
      backToTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    // Itinerary Builder
    function openItineraryBuilder(){
      modal('itineraryModal').classList.add('open');
      updateItinerary();
    }
    function closeItineraryModal(){
      modal('itineraryModal').classList.remove('open');
    }
    function updateItinerary(){
      const duration = parseInt(document.getElementById('tripDuration').value);
      const destination = document.getElementById('tripDestination').value;
      const style = document.getElementById('travelStyle').value;
      
      const itineraries = {
        goa: {
          adventure: ['Day 1: Beach hopping & water sports', 'Day 2: Scuba diving & dolphin watching', 'Day 3: Trekking & adventure activities', 'Day 4: Island hopping & boat rides', 'Day 5: Parasailing & jet skiing', 'Day 6: Beach relaxation & spa', 'Day 7: Cultural sites & farewell dinner'],
          relaxation: ['Day 1: Beach resort check-in & spa', 'Day 2: Private beach & yoga sessions', 'Day 3: Ayurvedic treatments', 'Day 4: Sunset cruises & fine dining', 'Day 5: Beachside massages', 'Day 6: Meditation & wellness', 'Day 7: Peaceful departure'],
          cultural: ['Day 1: Old Goa churches & history', 'Day 2: Local markets & handicrafts', 'Day 3: Portuguese architecture tour', 'Day 4: Spice plantations visit', 'Day 5: Traditional cooking class', 'Day 6: Folk performances', 'Day 7: Cultural farewell'],
          food: ['Day 1: Seafood feast & beach dining', 'Day 2: Goan cuisine cooking class', 'Day 3: Wine tasting & fine dining', 'Day 4: Street food exploration', 'Day 5: Beachside BBQs', 'Day 6: Gourmet experiences', 'Day 7: Farewell dinner']
        },
        kerala: {
          adventure: ['Day 1: Backwater boat journey', 'Day 2: Hill station trekking', 'Day 3: Wildlife safari', 'Day 4: River rafting', 'Day 5: Spice plantation tours', 'Day 6: Beach adventures', 'Day 7: Cultural experiences'],
          relaxation: ['Day 1: Ayurvedic resort arrival', 'Day 2: Spa treatments & yoga', 'Day 3: Backwater houseboat stay', 'Day 4: Meditation retreats', 'Day 5: Nature walks', 'Day 6: Wellness therapies', 'Day 7: Peaceful departure'],
          cultural: ['Day 1: Fort Kochi heritage walk', 'Day 2: Kathakali performance', 'Day 3: Tea plantation visit', 'Day 4: Traditional art forms', 'Day 5: Temple visits', 'Day 6: Cultural workshops', 'Day 7: Farewell ceremonies'],
          food: ['Day 1: Seafood specialties', 'Day 2: Kerala sadhya experience', 'Day 3: Spice garden tours', 'Day 4: Cooking demonstrations', 'Day 5: Local eateries', 'Day 6: Gourmet dining', 'Day 7: Culinary farewell']
        }
      };
      
      const destItineraries = itineraries[destination] || itineraries['goa'];
      const activities = destItineraries[style] || destItineraries['adventure'];
      
      const content = document.getElementById('itineraryContent');
      content.innerHTML = activities.slice(0, duration).map((activity, index) => `
        <div style="padding:12px;margin:8px 0;border-left:3px solid var(--accent);background:#1a1a2e;border-radius:8px">
          <div style="font-weight:600;color:var(--accent)">Day ${index + 1}</div>
          <div style="margin-top:4px;color:#ccc">${activity}</div>
        </div>
      `).join('');
    }
    function exportItinerary(){
      const content = document.getElementById('itineraryContent').innerText;
      navigator.clipboard.writeText(content).then(() => {
        showToast('Itinerary copied to clipboard!');
      });
    }
    function askAgent(){
      const qEl = document.getElementById('agentInput'); const q = qEl.value.trim();
      if(!q) return showToast('Ask something to the agent');
      const conv = document.getElementById('agentConv');
      const userLine = document.createElement('div'); userLine.style.fontWeight='600'; userLine.style.marginTop='8px'; userLine.textContent = 'You: '+q;
      conv.appendChild(userLine);
      const reply = document.createElement('div'); reply.style.marginTop='6px';
      // Slightly smarter demo replies
      const low = q.toLowerCase();
      if(low.includes('cheaper')||low.includes('save')||low.includes('price')) reply.textContent = 'PackNgo AI: Try +/-2 days or split the trip into two legs for savings.';
      else if(low.includes('safety')||low.includes('safe')) reply.textContent = 'PackNgo AI: Current SafeScore: 8.6. Avoid crowded zones after 10pm.';
      else reply.textContent = 'PackNgo AI: Great question — this is a demo reply. Integrate a backend to fetch live suggestions.';
      conv.appendChild(reply);
      conv.scrollTop = conv.scrollHeight; qEl.value='';
    }

    // Cost comparison demo (fake)
    function compareCost(){
      const from = document.getElementById('cmpFrom').value || 'Delhi';
      const to = document.getElementById('cmpTo').value || 'Goa';
      const est = Math.floor(3000 + Math.random()*6000);
      document.getElementById('bestRoute').textContent = from + ' → ' + to;
      document.getElementById('estCost').textContent = '₹' + est.toLocaleString();
      // persist last route
      localStorage.setItem('packngo_last_route', JSON.stringify({from,to,est}));
    }

    // Missing helper functions
    function scrollToBook() {
      const bookSection = document.getElementById('book');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function demoStartBooking() {
      showToast('Starting booking flow...');
      setTimeout(() => {
        showToast('Select your departure city and destination');
      }, 800);
    }

    function demoCompareNow(){
      showToast('🔍 Comparing 1000+ options across all carriers...');
      setTimeout(()=>{ showToast('Best deal found: ₹3,999 (Save ₹1,200). Book now?'); }, 1000);
    }

    function demoBestDeal(){
      showToast('💰 Scanning for hidden deals & price drops...');
      setTimeout(()=>{ showToast('3 flash deals found! Limited time offers on popular routes'); }, 900);
    }

    function demoARPreview(){
      showToast('🥽 Loading AR hotel preview... (demo animation)');
      setTimeout(()=>{ showToast('360° view ready! Explore room in augmented reality'); }, 1200);
    }

    function demoVlogExplore(){
      showToast('🎬 Vlog explorer: Popular travel creators near you');
      setTimeout(()=>{ showToast('12 vlogs from verified travelers in this destination'); }, 700);
    }

    function demoBuddyConnect(){
      showToast('👫 Finding travel buddies with matching interests...');
      setTimeout(()=>{ showToast('Found 5 solo travelers heading to same destination next month'); }, 900);
    }

    // global keyboard: Esc to close modals / close nav
    window.addEventListener('keydown', e=>{
      if(e.key==='Escape'){ document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open')); if(mainNav) { mainNav.classList.remove('open'); navToggle && navToggle.setAttribute('aria-expanded','false'); } }
    });

    // world map functionality removed

    // offline svg map pan/zoom (offices)
    (function(){
      const svg = document.getElementById('mapSVG');
      if(!svg) return;
      let isDragging=false, startPt={x:0,y:0};
      const view={x:60,y:5,w:30,h:20};
      svg.addEventListener('mousedown', e=>{
        isDragging=true; startPt={x:e.clientX,y:e.clientY}; svg.style.cursor='grabbing';
      });
      window.addEventListener('mousemove', e=>{
        if(isDragging){
          const dx=(e.clientX-startPt.x)*(view.w/svg.clientWidth);
          const dy=(e.clientY-startPt.y)*(view.h/svg.clientHeight);
          view.x -= dx; view.y -= dy;
          updateView();
          startPt={x:e.clientX,y:e.clientY};
        }
      });
      window.addEventListener('mouseup', ()=>{isDragging=false;svg.style.cursor='grab';});
      svg.addEventListener('wheel', e=>{
        e.preventDefault();
        const scale = e.deltaY>0 ? 1.1 : 0.9;
        const mx = e.offsetX*view.w/svg.clientWidth + view.x;
        const my = e.offsetY*view.h/svg.clientHeight + view.y;
        view.w *= scale; view.h *= scale;
        view.x = mx - (mx - view.x)*scale;
        view.y = my - (my - view.y)*scale;
        updateView();
      }, {passive:false});
      function updateView(){ svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`); }
    })();

    // warm welcome
    window.addEventListener('load', ()=>{ setTimeout(()=>{ compareCost(); }, 800); });

    // map modal handlers removed

    function updateDetailMapView(){
      const svg = document.getElementById('detailMapSVG');
      const center = {x:200, y:150};
      const w = 400 / detailMapZoom;
      const h = 300 / detailMapZoom;
      svg.setAttribute('viewBox', `${center.x - w/2} ${center.y - h/2} ${w} ${h}`);
    }

    // detail map pan with mouse
    (function(){
      const svg = document.getElementById('detailMapSVG');
      let isDragging = false, startPt = {x:0, y:0};
      svg.addEventListener('mousedown', e=>{isDragging=true; startPt={x:e.clientX, y:e.clientY}; svg.style.cursor='grabbing'});
      window.addEventListener('mousemove', e=>{
        if(isDragging && svg.parentElement.offsetParent!==null){
          const dx = (e.clientX - startPt.x) * (400/(svg.clientWidth*detailMapZoom));
          const dy = (e.clientY - startPt.y) * (300/(svg.clientHeight*detailMapZoom));
          const vb = svg.getAttribute('viewBox').split(' ').map(Number);
          svg.setAttribute('viewBox', `${vb[0]-dx} ${vb[1]-dy} ${vb[2]} ${vb[3]}`);
          startPt = {x:e.clientX, y:e.clientY};
        }
      });
      window.addEventListener('mouseup', ()=>{isDragging=false; svg.style.cursor='grab'});
      svg.addEventListener('wheel', e=>{
        e.preventDefault();
        const factor = e.deltaY > 0 ? 1.1 : 0.9;
        detailMapZoom *= factor;
        detailMapZoom = Math.max(0.5, Math.min(detailMapZoom, 3));
        updateDetailMapView();
      }, {passive:false});
    })();

    // Body fade-in on load (opacity starts at 1 via CSS, no JS override needed)

    // Enhanced cursor effects
    let cursorTrails = [];
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create cursor trail
      if (Math.random() > 0.7) { // Only create trail sometimes for performance
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        document.body.appendChild(trail);
        
        cursorTrails.push(trail);
        
        // Remove old trails
        if (cursorTrails.length > 10) {
          const oldTrail = cursorTrails.shift();
          if (oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
          }
        }
        
        // Auto remove trail after animation
        setTimeout(() => {
          if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
        }, 500);
      }
    });

    // Cursor interaction effects
    document.addEventListener('click', (e) => {
      // Create click effect
      const clickEffect = document.createElement('div');
      clickEffect.style.cssText = `
        position: fixed;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: clickRipple 0.6s ease-out forwards;
      `;
      document.body.appendChild(clickEffect);
      
      setTimeout(() => {
        if (clickEffect.parentNode) {
          clickEffect.parentNode.removeChild(clickEffect);
        }
      }, 600);
    });

    // Add click ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes clickRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Cursor type changes based on element
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      
      if (target.matches('button, .btn, [onclick]')) {
        document.body.style.cursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' fill='%23ff6b6b'/%3E%3C/svg%3E\"), pointer";
      } else if (target.matches('input, textarea, select')) {
        document.body.style.cursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M14.828 14.828a4 4 0 0 0-5.656 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' fill='%23ff6b6b'/%3E%3C/svg%3E\"), text";
      } else if (target.matches('.card, .interactive-widget')) {
        document.body.style.cursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' fill='%23ff6b6b'/%3E%3C/svg%3E\"), pointer";
      }
    });

    document.addEventListener('mouseout', (e) => {
      // Reset to default cursor
      document.body.style.cursor = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z' fill='%2300d4ff'/%3E%3C/svg%3E\"), auto";
    });

    // Loading Screen Functionality — hide after 1.5s regardless of load state
    function hideLoadingScreen() {
      const loadingScreen = document.getElementById('loadingScreen');
      if (!loadingScreen) return;
      loadingScreen.classList.add('hide');
      setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }
    setTimeout(hideLoadingScreen, 1500);
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      window.addEventListener('load', hideLoadingScreen);
    }

    // Advanced Features Functions

    // Safety & Crowd Tracking
    let safetyAlertsEnabled = false;
    let crowdData = { level: 'Low', percentage: 25 };
    let safetyData = { rating: 98, alerts: [] };

    function updateSafetyData() {
      // Simulate real-time data updates
      safetyData.rating = Math.max(85, Math.min(100, safetyData.rating + (Math.random() - 0.5) * 5));
      crowdData.percentage = Math.max(10, Math.min(90, crowdData.percentage + (Math.random() - 0.5) * 20));

      if (crowdData.percentage < 30) crowdData.level = 'Low';
      else if (crowdData.percentage < 60) crowdData.level = 'Medium';
      else crowdData.level = 'High';

      document.getElementById('safetyRating').textContent = Math.round(safetyData.rating) + '%';
      document.getElementById('safetyBar').style.width = safetyData.rating + '%';
      document.getElementById('crowdLevel').textContent = crowdData.level;
      document.getElementById('crowdBar').style.width = crowdData.percentage + '%';

      // Add visual alerts for high crowd levels
      const tracker = document.getElementById('safetyTracker');
      if (crowdData.level === 'High') {
        tracker.classList.add('crowd-high');
      } else {
        tracker.classList.remove('crowd-high');
      }
    }

    function toggleSafetyAlerts(btn) {
      if (!btn) btn = event.target;
      safetyAlertsEnabled = !safetyAlertsEnabled;
      if (safetyAlertsEnabled) {
        btn.textContent = 'Alerts On';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-gold),var(--luxury-emerald))';
        showToast('Safety alerts enabled! You\'ll receive notifications about crowd levels and safety updates.');
        // Start real-time updates
        if (!window.safetyInterval) {
          window.safetyInterval = setInterval(updateSafetyData, 5000);
        }
      } else {
        btn.textContent = 'Enable Alerts';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-emerald),var(--luxury-gold))';
        showToast('Safety alerts disabled.');
        if (window.safetyInterval) {
          clearInterval(window.safetyInterval);
          window.safetyInterval = null;
        }
      }
    }

    // viewSafetyMap removed

    // AR/VR Preview Functions
    let vrMode = false;
    let arMode = false;

    function startVRPreview(btn) {
      if (!btn) btn = event.target;
      vrMode = !vrMode;
      const scene = document.getElementById('vrScene');

      if (vrMode) {
        btn.textContent = 'Exit VR Tour';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-gold),var(--luxury-purple))';
        scene.style.animation = 'panorama 10s linear infinite';
        showToast('VR Tour started! Use mouse to look around. Click to interact with hotspots.');
      } else {
        btn.textContent = 'Start VR Tour';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-purple),var(--luxury-emerald))';
        scene.style.animation = 'none';
        showToast('VR Tour ended.');
      }
    }

    function toggleARMode(btn) {
      if (!btn) btn = event.target;
      arMode = !arMode;

      if (arMode) {
        btn.textContent = 'Exit AR Mode';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-gold),var(--luxury-purple))';
        showToast('AR Mode activated! Point your device camera at landmarks for augmented information.');
        // In a real app, this would access device camera and AR libraries
      } else {
        btn.textContent = 'AR Mode';
        btn.style.background = 'linear-gradient(90deg,var(--luxury-purple),var(--luxury-emerald))';
        showToast('AR Mode deactivated.');
      }
    }

    // Solo Travel Social Network Functions
    let socialConnections = [
      { name: 'Alex', location: 'Tokyo', activity: 'joined Tokyo group', time: '2 hours ago' },
      { name: 'Sarah', location: 'Bali', activity: 'posted in Bali', time: '5 hours ago' },
      { name: 'Mike', location: 'Paris', activity: 'looking for travel buddies', time: '1 day ago' }
    ];

    // Comprehensive buddy database
    const buddyDatabase = [
      { id: 1, name: 'Emma', age: 26, avatar: '👩', location: 'London', destination: 'Tokyo', dates: '2026-04', bio: 'Adventure seeker exploring Asia for 3 weeks', interests: ['adventure', 'photography', 'food'], style: 'Off-the-beaten-path explorer' },
      { id: 2, name: 'Carlos', age: 28, avatar: '👨', location: 'Barcelona', destination: 'Goa', dates: '2026-03', bio: 'Beach enthusiast and digital nomad', interests: ['beach', 'culture', 'surfing'], style: 'Relaxed beach bum' },
      { id: 3, name: 'Lisa', age: 24, avatar: '👩', location: 'New York', destination: 'Paris', dates: '2026-05', bio: 'Photographer capturing travel moments and local stories', interests: ['photography', 'culture', 'food'], style: 'Cultural explorer' },
      { id: 4, name: 'James', age: 30, avatar: '👨', location: 'Sydney', destination: 'Bali', dates: '2026-04', bio: 'Yoga and wellness enthusiast', interests: ['wellness', 'culture', 'food'], style: 'Mindful traveler' },
      { id: 5, name: 'Sophia', age: 25, avatar: '👩', location: 'Rome', destination: 'Manali', dates: '2026-05', bio: 'Adventure sports junkie and nature lover', interests: ['adventure', 'hiking', 'photography'], style: 'Adrenaline seeker' },
      { id: 6, name: 'Marco', age: 29, avatar: '👨', location: 'Milan', destination: 'Kerala', dates: '2026-04', bio: 'Foodie exploring culinary traditions around the world', interests: ['food', 'culture', 'cooking'], style: 'Gastronomic explorer' }
    ];

    // Community groups database
    const communityGroups = [
      { id: 1, name: 'Tokyo Solo Travelers', members: 234, icon: '🇯🇵', description: 'Connect with solo travelers exploring Tokyo and Japan', nextEvent: 'Pub crawl in Shibuya - March 15' },
      { id: 2, name: 'Goa Beach Lovers', members: 189, icon: '🏖️', description: 'Beach enthusiasts sharing Goa travel tips and meetups', nextEvent: 'Sunset yoga session - March 18' },
      { id: 3, name: 'Photography Travelers', members: 456, icon: '📸', description: 'Photographers sharing travel photography tips and guided tours', nextEvent: 'Golden hour photography walk - March 20' },
      { id: 4, name: 'Backpackers India', members: 312, icon: '🎒', description: 'Budget travelers exploring India and sharing tips', nextEvent: 'Group trip to Rajasthan - April 1' },
      { id: 5, name: 'Foodie Explorers', members: 278, icon: '🍜', description: 'Food lovers on culinary adventures around the world', nextEvent: 'Street food tour - March 22' },
      { id: 6, name: 'Adventure Junkies', members: 398, icon: '⛰️', description: 'Thrill-seekers looking for adventure activities', nextEvent: 'Trekking expedition - April 5' }
    ];

    function openBuddiesModal(){
      modal('buddiesModal').classList.add('open');
      populateBuddies(buddyDatabase);
    }
    
    function closeBuddiesModal(){
      modal('buddiesModal').classList.remove('open');
    }

    function openGroupsModal(){
      modal('groupsModal').classList.add('open');
      populateGroups(communityGroups);
    }
    
    function closeGroupsModal(){
      modal('groupsModal').classList.remove('open');
    }

    function closeBuddyProfileModal(){
      modal('buddyProfileModal').classList.remove('open');
    }

    function populateBuddies(buddies){
      const list = document.getElementById('buddiesList');
      list.innerHTML = '';
      buddies.forEach(buddy => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#1a1a1a;border:1px solid rgba(30,144,255,0.1);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.3s ease';
        card.onmouseover = () => { card.style.transform = 'translateY(-4px)'; card.style.boxShadow = '0 8px 20px rgba(30,144,255,0.15)'; };
        card.onmouseout = () => { card.style.transform = 'none'; card.style.boxShadow = 'none'; };
        card.onclick = () => showBuddyProfile(buddy);
        card.innerHTML = `
          <div style="text-align:center">
            <div style="font-size:48px;margin-bottom:8px">${buddy.avatar}</div>
            <h4 style="margin:0 0 4px 0;font-size:16px;color:#ffffff">${buddy.name}, ${buddy.age}</h4>
            <div style="color:var(--accent);font-size:12px;margin-bottom:8px">${buddy.location}</div>
            <div style="color:var(--soft);font-size:12px;margin-bottom:12px">${buddy.bio}</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;justify-content:center">
              ${buddy.interests.map(interest => `<span style="background:rgba(30,144,255,0.15);color:var(--accent);padding:2px 6px;border-radius:4px;font-size:11px">${interest}</span>`).join('')}
            </div>
            <button class="btn" onclick="event.stopPropagation(); viewBuddyProfile(${buddy.id})" style="width:100%">View Profile</button>
          </div>
        `;
        list.appendChild(card);
      });
    }

    function populateGroups(groups){
      const list = document.getElementById('groupsList');
      list.innerHTML = '';
      groups.forEach(group => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#1a1a1a;border:1px solid rgba(30,144,255,0.1);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.3s ease';
        card.onmouseover = () => { card.style.transform = 'translateY(-4px)'; card.style.boxShadow = '0 8px 20px rgba(30,144,255,0.15)'; };
        card.onmouseout = () => { card.style.transform = 'none'; card.style.boxShadow = 'none'; };
        card.innerHTML = `
          <div style="display:flex;align-items:flex-start;gap:12px">
            <div style="font-size:32px">${group.icon}</div>
            <div style="flex:1">
              <h4 style="margin:0 0 4px 0;font-size:14px;color:#ffffff">${group.name}</h4>
              <div style="color:var(--accent);font-size:11px;margin-bottom:6px">${group.members} members</div>
              <p style="margin:0 0 8px 0;color:var(--soft);font-size:12px;line-height:1.4">${group.description}</p>
              <div style="background:rgba(30,144,255,0.05);padding:6px;border-radius:6px;margin-bottom:8px">
                <div style="color:var(--accent);font-size:10px;text-transform:uppercase;margin-bottom:2px">Next Event</div>
                <div style="color:#c9c9c9;font-size:11px">${group.nextEvent}</div>
              </div>
              <button class="btn" onclick="event.stopPropagation(); joinGroup('${group.name}')" style="width:100%">Join Group</button>
            </div>
          </div>
        `;
        list.appendChild(card);
      });
    }

    function searchBuddies(){
      const destination = document.getElementById('buddyDestination').value.toLowerCase();
      const interests = document.getElementById('buddyInterests').value;
      
      let filtered = buddyDatabase.filter(buddy => {
        let matchDest = !destination || buddy.destination.toLowerCase().includes(destination);
        let matchInterest = !interests || buddy.interests.includes(interests);
        return matchDest && matchInterest;
      });
      
      if(filtered.length === 0) {
        showToast('No buddies found matching your criteria. Try other filters!');
        return;
      }
      populateBuddies(filtered);
      showToast(`Found ${filtered.length} potential travel buddies!`);
    }

    function searchGroups(){
      const search = document.getElementById('groupSearch').value.toLowerCase();
      const filtered = communityGroups.filter(group => 
        group.name.toLowerCase().includes(search) || 
        group.description.toLowerCase().includes(search)
      );
      populateGroups(filtered);
    }

    function showBuddyProfile(buddy){
      modal('buddyProfileModal').classList.add('open');
      document.getElementById('profileName').textContent = buddy.name;
      document.getElementById('profileAvatar').textContent = buddy.avatar;
      document.getElementById('profileTitle').textContent = `${buddy.name}, ${buddy.age}`;
      document.getElementById('profileLocation').textContent = `📍 ${buddy.location} → ${buddy.destination}`;
      document.getElementById('profileBio').textContent = buddy.bio;
      document.getElementById('profileTravelStyle').textContent = buddy.style;
      document.getElementById('profileInterests').innerHTML = buddy.interests.map(interest => 
        `<span style="background:rgba(30,144,255,0.2);color:var(--accent);padding:4px 8px;border-radius:4px;font-size:12px">#${interest}</span>`
      ).join('');
    }

    function viewBuddyProfile(buddyId){
      const buddy = buddyDatabase.find(b => b.id === buddyId);
      if(buddy) showBuddyProfile(buddy);
    }

    function messageBuddy(){
      const name = document.getElementById('profileName').textContent;
      showToast(`💬 Opening message chat with ${name}...`);
      setTimeout(() => {
        showToast(`Chat with ${name} started! Send your first message.`);
      }, 800);
    }

    function addBuddy(){
      const name = document.getElementById('profileName').textContent;
      showToast(`✅ Sent friend request to ${name}!`);
    }

    function joinGroup(groupName){
      showToast(`🎉 Joining "${groupName}"...`);
      setTimeout(() => {
        showToast(`Welcome to ${groupName}! Check your inbox for group details.`);
      }, 1000);
    }

    function findTravelBuddies() {
      openBuddiesModal();
    }

    function joinCommunity() {
      openGroupsModal();
    }

    // Smart Translation Functions
    let savedPhrases = [];

    function liveTranslate() {
      const input = document.getElementById('translateInput').value;
      const sourceLang = document.getElementById('sourceLang').value;
      const targetLang = document.getElementById('targetLang').value;
      const output = document.getElementById('translateOutput');

      if (input.length > 0) {
        // Simulate translation (in a real app, this would call a translation API)
        const translations = {
          'en-es': { 'Hello': 'Hola', 'Thank you': 'Gracias', 'Where is the bathroom?': '¿Dónde está el baño?', 'How much does this cost?': '¿Cuánto cuesta esto?' },
          'en-fr': { 'Hello': 'Bonjour', 'Thank you': 'Merci', 'Where is the bathroom?': 'Où sont les toilettes?', 'How much does this cost?': 'Combien ça coûte?' },
          'en-ja': { 'Hello': 'こんにちは', 'Thank you': 'ありがとう', 'Where is the bathroom?': 'トイレはどこですか？', 'How much does this cost?': 'これはいくらですか？' },
          'en-zh': { 'Hello': '你好', 'Thank you': '谢谢', 'Where is the bathroom?': '洗手间在哪里？', 'How much does this cost?': '这个多少钱？' }
        };

        const key = `${sourceLang}-${targetLang}`;
        let translation = translations[key]?.[input.trim()] || `[${targetLang.toUpperCase()}] ${input}`;

        output.textContent = translation;
        output.style.color = 'var(--accent)';
      } else {
        output.textContent = 'Translation will appear here...';
        output.style.color = 'var(--soft)';
      }
    }

    function speakTranslation() {
      const text = document.getElementById('translateOutput').textContent;
      if (text && text !== 'Translation will appear here...') {
        // In a real app, this would use Web Speech API
        showToast('Speaking translation... (Speech synthesis would play here)');
      } else {
        showToast('Please enter text to translate first.');
      }
    }

    function savePhrase() {
      const input = document.getElementById('translateInput').value;
      const output = document.getElementById('translateOutput').textContent;

      if (input && output && output !== 'Translation will appear here...') {
        savedPhrases.push({ original: input, translation: output });
        showToast(`Phrase saved! You now have ${savedPhrases.length} saved translations.`);
      } else {
        showToast('Please translate a phrase first before saving.');
      }
    }

    // Initialize advanced features
    window.addEventListener('load', () => {
      // Start safety data updates
      updateSafetyData();
      setInterval(updateSafetyData, 10000); // Update every 10 seconds

      // Initialize translation tool
      document.getElementById('sourceLang').value = 'en';
      document.getElementById('targetLang').value = 'es';
    });

    // Enhanced Interactive Animations
    // Smooth scroll animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .section, section').forEach(el => {
      el.style.opacity = '0';
      el.dataset.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.observe(el);
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.interactive-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', xPercent + '%');
        card.style.setProperty('--mouse-y', yPercent + '%');
      });
    });

    // Button ripple effect
    document.querySelectorAll('button, .btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      button, .btn { position: relative; overflow: hidden; }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.4);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes rippleAnimation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);

    // Smooth scroll on page load to anchor
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500);
        }
      }
    });

    // Add hover lift animation to all cards
    document.querySelectorAll('.card, .interactive-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });

    // Fade in elements on scroll
    const fadeInElements = document.querySelectorAll('[data-fade-in]');
    fadeInElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.6s ease-out';
      observer.observe(el);
    });
