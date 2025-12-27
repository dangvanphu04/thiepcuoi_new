
// static/js/main.js
// ===== WEDDING CONFIGURATION =====
const WEDDING_CONFIG = {
    weddingDate: new Date('2026-01-07T16:00:00'), // Ngày cưới 07/01/2026 16:00
    currentAddress: 'old', // Mặc định hiển thị địa chỉ cũ
    photos: [
        'chinh.jpg',
        'anh1.jpg',
        'anh2.jpg',
        'anh3.jpg',
        'anh4.jpg',
        'anh5.jpg'
    ]
};

// ===== INITIALIZE ALL FEATURES =====
function initializeAllFeatures() {
    console.log('💍 Khởi tạo tất cả tính năng...');
    
    // 1. Countdown timer
    initializeCountdownTimer();
    
    // 2. Calendar
    initializeCalendar();
    
    // 3. Photo album carousel
    initializePhotoAlbum();
    
    // 4. Map functions
    initializeMapFunctions();
    
    // 5. Copy bank account
    initializeCopyFunctions();
    
    // 6. Share buttons
    initializeShareFunctions();
    
    // 7. Back to top
    initializeBackToTop();
    
    // 8. Music player controls
    initializeMusicControls();
    
    console.log('✅ Tất cả tính năng đã sẵn sàng!');
}
// ===== COUNTDOWN TIMER - ĐÃ FIX =====
function initializeCountdownTimer() {
    console.log('⏰ Khởi tạo countdown cho 2026...');
    
    const weddingDate = WEDDING_CONFIG.weddingDate.getTime();
    let updateInterval;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        // Kiểm tra nếu phần tử tồn tại
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.log('⚠️ Countdown elements not found');
            return;
        }
        
        if (distance < 0) {
            clearInterval(updateInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            
            const countdownSection = document.querySelector('.countdown-section');
            if (countdownSection) {
                countdownSection.innerHTML = `
                    <h2 style="color: #c2185b; margin-bottom: 30px;">
                        <i class="fas fa-glass-cheers"></i> Hôm nay là ngày cưới!
                    </h2>
                    <div style="font-size: clamp(2rem, 4vw, 3rem); color: #ff4081; font-weight: bold; animation: pulse 2s infinite;">
                        🎉 Chúc mừng đám cưới! 🎉
                    </div>
                `;
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Cập nhật ngay lập tức
    updateCountdown();
    
    // Cập nhật mỗi giây
    updateInterval = setInterval(updateCountdown, 1000);
}

// static/js/main.js (phần CALENDAR đã sửa)

// ===== CALENDAR - ĐÃ FIX =====
function initializeCalendar() {
    const calendarBody = document.getElementById('calendar-body');
    if (!calendarBody) {
        console.log('⚠️ Không tìm thấy calendar-body');
        return;
    }
    
    console.log('📅 Khởi tạo lịch tháng 1/2026...');
    
    // Năm 2026, tháng 1 (0 = January)
    const year = 2026;
    const month = 0; // January (0-indexed)
    const weddingDay = 7; // Ngày 7
    
    // Ngày đầu tiên của tháng 1/2026
    const firstDay = new Date(year, month, 1).getDay(); // 0=CN, 1=T2, ..., 6=T7
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 31 ngày
    
    // Ngày hiện tại
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    
    let html = '';
    let day = 1;
    
    // Tạo 6 hàng cho lịch
    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                // Ô trống trước ngày đầu tiên
                html += '<td></td>';
            } else if (day > daysInMonth) {
                // Ô trống sau ngày cuối cùng
                html += '<td></td>';
            } else {
                const isWeddingDay = day === weddingDay && year === 2026 && month === 0;
                const isToday = day === currentDate && 
                               month === currentMonth && 
                               year === currentYear;
                
                let className = '';
                if (isWeddingDay) {
                    className = 'wedding-day';
                } else if (isToday) {
                    className = 'current-day';
                }
                
                html += `<td class="${className}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
        if (day > daysInMonth) break;
    }
    
    calendarBody.innerHTML = html;
    console.log('✅ Đã tạo lịch tháng 1/2026, ngày cưới được đánh dấu');
}
// ===== PHOTO ALBUM =====
// ===== PHOTO ALBUM - ĐÃ CẬP NHẬT =====
// ===== PHOTO ALBUM - HIỂN THỊ TOÀN BỘ ẢNH =====


// ===== LAZY LOADING VỚI DETECTION ẢNH =====
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const photoItem = img.closest('.photo-item');
                
                // Tải ảnh
                img.src = img.dataset.src;
                
                // Khi ảnh tải xong, detect tỷ lệ
                img.onload = function() {
                    // Phát hiện ảnh dọc hay ngang
                    if (this.naturalWidth < this.naturalHeight) {
                        photoItem?.classList.add('portrait');
                        this.style.objectFit = 'contain';
                        this.style.maxHeight = '100%';
                        this.style.width = 'auto';
                    } else {
                        photoItem?.classList.add('landscape');
                        this.style.objectFit = 'contain';
                        this.style.width = '100%';
                        this.style.height = 'auto';
                    }
                    
                    img.classList.remove('lazy-load');
                };
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== THÊM FUNCTION ĐỂ TỰ ĐỘNG PHÁT HIỆN ẢNH DỌC/NGANG =====
function detectImageOrientation() {
    const images = document.querySelectorAll('.photo-item img:not(.lazy-load)');
    
    images.forEach(img => {
        const photoItem = img.closest('.photo-item');
        
        if (img.complete && img.naturalWidth) {
            if (img.naturalWidth < img.naturalHeight) {
                // Ảnh dọc
                photoItem?.classList.add('portrait');
                photoItem?.classList.remove('landscape');
                img.style.objectFit = 'contain';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
            } else {
                // Ảnh ngang
                photoItem?.classList.add('landscape');
                photoItem?.classList.remove('portrait');
                img.style.objectFit = 'contain';
                img.style.width = '100%';
                img.style.height = 'auto';
            }
        }
    });
}

// Gọi hàm khi window load
window.addEventListener('load', function() {
    setTimeout(detectImageOrientation, 1000);
});
// ===== TỐI ƯU HIỂN THỊ ẢNH TRONG ALBUM =====
function optimizeAlbumDisplay() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        const img = item.querySelector('img');
        
        if (img && img.complete) {
            const container = item.querySelector('.photo-img-container') || item;
            
            // Đảm bảo container có đủ không gian
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.overflow = 'hidden';
            
            // Tự động adjust object-fit dựa trên tỷ lệ
            if (img.naturalWidth && img.naturalHeight) {
                const ratio = img.naturalWidth / img.naturalHeight;
                
                if (ratio < 0.8) {
                    // Ảnh dọc rõ rệt
                    img.style.objectFit = 'contain';
                    img.style.width = 'auto';
                    img.style.height = '100%';
                    img.style.maxWidth = '100%';
                } else if (ratio > 1.2) {
                    // Ảnh ngang rõ rệt
                    img.style.objectFit = 'contain';
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.maxHeight = '100%';
                } else {
                    // Ảnh gần vuông
                    img.style.objectFit = 'cover';
                    img.style.width = '100%';
                    img.style.height = '100%';
                }
            }
        }
    });
}

// Gọi hàm khi ảnh tải xong
window.addEventListener('load', function() {
    setTimeout(optimizeAlbumDisplay, 1500);
    
    // Cũng gọi khi resize window
    window.addEventListener('resize', optimizeAlbumDisplay);
});
// ===== HIỆU ỨNG HOVER CHO ẢNH =====
function addPhotoHoverEffects() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.querySelector('.photo-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
            this.querySelector('.photo-overlay').style.opacity = '0';
        });
        
        // Thêm hiệu ứng click
        item.addEventListener('click', function(e) {
            // Nếu lightbox không hoạt động, mở ảnh trong tab mới
            if (typeof lightbox === 'undefined') {
                const img = this.querySelector('img');
                if (img && img.src) {
                    window.open(img.src, '_blank');
                }
            }
        });
    });
}
// ===== ALBUM SLIDESHOW =====
function initializeAlbumSlideshow() {
    const albumSection = document.querySelector('.album-section');
    if (!albumSection) return;
    
    // Tạo controls cho slideshow
    const controlsHTML = `
        <div class="album-controls">
            <button class="album-btn" onclick="showPreviousPhoto()" title="Ảnh trước">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="album-btn" onclick="toggleSlideshow()" id="slideshowToggle" title="Bắt đầu slideshow">
                <i class="fas fa-play"></i>
            </button>
            <button class="album-btn" onclick="showNextPhoto()" title="Ảnh tiếp">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    // Tìm vị trí để chèn controls
    const photoGrid = document.querySelector('.photo-grid');
    if (photoGrid) {
        photoGrid.insertAdjacentHTML('beforebegin', controlsHTML);
    }
    
    // Khởi tạo slideshow
    window.currentPhotoIndex = 0;
    window.isSlideshowPlaying = false;
    window.slideshowInterval = null;
}

// Hàm hiển thị ảnh tiếp theo
window.showNextPhoto = function() {
    const photoItems = document.querySelectorAll('.photo-item');
    if (photoItems.length === 0) return;
    
    window.currentPhotoIndex = (window.currentPhotoIndex + 1) % photoItems.length;
    highlightCurrentPhoto();
};

// Hàm hiển thị ảnh trước
window.showPreviousPhoto = function() {
    const photoItems = document.querySelectorAll('.photo-item');
    if (photoItems.length === 0) return;
    
    window.currentPhotoIndex = (window.currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
    highlightCurrentPhoto();
};

// Hàm highlight ảnh hiện tại
function highlightCurrentPhoto() {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.opacity = index === window.currentPhotoIndex ? '1' : '0.6';
        item.style.transform = index === window.currentPhotoIndex ? 'scale(1.05)' : 'scale(1)';
    });
}

// Hàm toggle slideshow
window.toggleSlideshow = function() {
    const toggleBtn = document.getElementById('slideshowToggle');
    if (!toggleBtn) return;
    
    window.isSlideshowPlaying = !window.isSlideshowPlaying;
    
    if (window.isSlideshowPlaying) {
        // Bắt đầu slideshow
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        toggleBtn.title = 'Dừng slideshow';
        
        window.slideshowInterval = setInterval(() => {
            window.showNextPhoto();
        }, 3000); // Chuyển ảnh mỗi 3 giây
    } else {
        // Dừng slideshow
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        toggleBtn.title = 'Bắt đầu slideshow';
        
        if (window.slideshowInterval) {
            clearInterval(window.slideshowInterval);
            window.slideshowInterval = null;
        }
    }
};
// ===== MAP FUNCTIONS - HOẠT ĐỘNG ĐÚNG =====
// ===== MAP FUNCTIONS - HOẠT ĐỘNG ĐÚNG =====
function initializeMapFunctions() {
    console.log('📍 Khởi tạo map functions...');
    
    // Mặc định hiển thị địa chỉ CŨ khi trang load
    setTimeout(() => {
        if (typeof showAddress === 'function') {
            showAddress('old');
        }
    }, 500);
    
    // Hàm hiển thị địa chỉ
    window.switchAddress = function(type) {
        console.log('📍 Chuyển đổi địa chỉ:', type);
        
        // Lấy các phần tử DOM
        const addressDisplay = document.getElementById('address-display');
        const btnOld = document.getElementById('btn-old-address');
        const btnNew = document.getElementById('btn-new-address');
        
        if (!addressDisplay || !btnOld || !btnNew) {
            console.error('❌ Không tìm thấy phần tử địa chỉ');
            return;
        }
        
        // Cập nhật active button
        btnOld.classList.remove('active');
        btnNew.classList.remove('active');
        
        if (type === 'old') {
            // Hiển thị địa chỉ CŨ
            btnOld.classList.add('active');
            
            // Sử dụng dữ liệu từ Flask hoặc hardcode
            let oldAddress = "Đội 1, Thôn Tân Giáo, Xã Tân Mộc, Huyện Lục Ngạn, Tỉnh Bắc Giang";
            const coordinates = "21°15'50.2\"N 106°36'44.2\"E";
            
            // Ưu tiên dùng dữ liệu từ Flask nếu có
            if (window.weddingData && window.weddingData.wedding_info) {
                oldAddress = window.weddingData.wedding_info.old_address;
            }
            
            addressDisplay.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 15px;">
                    <div style="color: #ff4081; font-size: 1.5rem;">
                        <i class="fas fa-home"></i>
                    </div>
                    <div style="text-align: left;">
                        <p style="font-size: clamp(1rem, 1.5vw, 1.3rem); margin-bottom: 8px; font-weight: 600;">
                            <strong>ĐỊA CHỈ CŨ:</strong>
                        </p>
                        <p style="font-size: clamp(0.95rem, 1.3vw, 1.1rem); line-height: 1.5;">
                            ${oldAddress}
                        </p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                    <i class="fas fa-compass" style="color: #666;"></i>
                    <span style="color: #666; font-size: clamp(0.9rem, 1.2vw, 1rem);">
                        Tọa độ: ${coordinates}
                    </span>
                </div>
            `;
            
        } else {
            // Hiển thị địa chỉ MỚI
            btnNew.classList.add('active');
            
            // Sử dụng dữ liệu từ Flask hoặc hardcode
            let newAddress = "Thôn Tân Giáo, Xã Nam Dương, Tỉnh Bắc Ninh";
            const coordinates = "21°15'50.2\"N 106°36'44.2\"E";
            
            // Ưu tiên dùng dữ liệu từ Flask nếu có
            if (window.weddingData && window.weddingData.wedding_info) {
                newAddress = window.weddingData.wedding_info.new_address;
            }
            
            addressDisplay.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 15px;">
                    <div style="color: #4169e1; font-size: 1.5rem;">
                        <i class="fas fa-building"></i>
                    </div>
                    <div style="text-align: left;">
                        <p style="font-size: clamp(1rem, 1.5vw, 1.3rem); margin-bottom: 8px; font-weight: 600;">
                            <strong>ĐỊA CHỈ MỚI:</strong>
                        </p>
                        <p style="font-size: clamp(0.95rem, 1.3vw, 1.1rem); line-height: 1.5;">
                            ${newAddress}
                        </p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                    <i class="fas fa-compass" style="color: #666;"></i>
                    <span style="color: #666; font-size: clamp(0.9rem, 1.2vw, 1rem);">
                        Tọa độ: ${coordinates}
                    </span>
                </div>
            `;
        }
        
        // Animation cho mượt mà
        addressDisplay.style.opacity = '0';
        addressDisplay.style.transform = 'translateY(10px)';
        setTimeout(() => {
            addressDisplay.style.opacity = '1';
            addressDisplay.style.transform = 'translateY(0)';
            addressDisplay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 50);
        
        // Hiển thị thông báo
        showToast(`📍 Đã chuyển sang địa chỉ ${type === 'old' ? 'cũ' : 'mới'}`);
    };
    
    console.log('✅ Map functions đã sẵn sàng');
}
// ===== CAROUSEL ALBUM - CHẠY NHƯ CUỐN BĂNG =====
// ===== CAROUSEL ALBUM - HIỂN THỊ ĐẦY ĐỦ 10 ẢNH =====

// ===== SIMPLE IMAGE SLIDER =====
// ===== SIMPLE IMAGE SLIDER - CẢI THIỆN =====
function initializePhotoAlbum() {
    console.log('🎞️ Khởi tạo album ảnh đơn giản...');
    
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    const currentPhotoEl = document.getElementById('current-photo');
    const totalPhotosEl = document.getElementById('total-photos');
    
    if (!carouselTrack) {
        console.error('❌ Không tìm thấy carousel-track');
        return;
    }
    
    // Lấy ảnh từ weddingData
    const photos = window.weddingData?.photos || [
        'chinh.jpg', 'anh1.jpg', 'anh2.jpg', 'anh3.jpg', 'anh4.jpg',
        'anh5.jpg', 'anh6.jpg', 'anh7.jpg', 'anh8.jpg', 'anh9.jpg'
    ];
    
    // Cập nhật tổng số ảnh
    if (totalPhotosEl) {
        totalPhotosEl.textContent = photos.length;
    }
    
    // Tạo slides với lazy loading
    let slidesHTML = '';
    photos.forEach((photo, index) => {
        const photoUrl = `/static/images/${photo}`;
        const fallbackUrl = `https://images.unsplash.com/photo-${1519669556878 + index}?ixlib=rb-4.0.3&auto=format&fit=contain&w=600&h=450&q=80`;
        
        slidesHTML += `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="slide-image-container">
                    <img src="${photoUrl}" 
                         alt="Ảnh cưới ${index + 1}"
                         class="slide-image"
                         onerror="this.onerror=null; this.src='${fallbackUrl}';"
                         loading="lazy"
                         style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    <div class="slide-number">${index + 1} / ${photos.length}</div>
                </div>
            </div>
        `;
    });
    
    carouselTrack.innerHTML = slidesHTML;
    
    // Tạo dots
    if (carouselDots) {
        let dotsHTML = '';
        photos.forEach((_, index) => {
            dotsHTML += `
                <div class="carousel-dot ${index === 0 ? 'active' : ''}" 
                     onclick="goToSlide(${index})"
                     title="Xem ảnh ${index + 1}">
                </div>
            `;
        });
        carouselDots.innerHTML = dotsHTML;
    }
    
    // Khởi tạo slider với các cải tiến
    window.slider = {
        currentIndex: 0,
        totalSlides: photos.length,
        autoPlay: true,
        interval: 4000,
        intervalId: null,
        slides: document.querySelectorAll('.carousel-slide'),
        isAnimating: false
    };
    
    // Preload ảnh đầu tiên
    preloadImages();
    
    // Bắt đầu auto-play
    startSliderAutoPlay();
    
    console.log(`✅ Đã tạo slider với ${photos.length} ảnh`);
}

// Hàm preload ảnh
function preloadImages() {
    const photos = window.weddingData?.photos || [];
    photos.forEach((photo, index) => {
        if (index < 3) { // Preload 3 ảnh đầu
            const img = new Image();
            img.src = `/static/images/${photo}`;
        }
    });
}

function startSliderAutoPlay() {
    const slider = window.slider;
    
    if (slider.intervalId) {
        clearInterval(slider.intervalId);
    }
    
    slider.intervalId = setInterval(() => {
        if (!slider.isAnimating) {
            nextSlide();
        }
    }, slider.interval);
}

function nextSlide() {
    const slider = window.slider;
    if (slider.isAnimating) return;
    
    slider.isAnimating = true;
    slider.currentIndex = (slider.currentIndex + 1) % slider.totalSlides;
    updateSlider();
}

function prevSlide() {
    const slider = window.slider;
    if (slider.isAnimating) return;
    
    slider.isAnimating = true;
    slider.currentIndex = (slider.currentIndex - 1 + slider.totalSlides) % slider.totalSlides;
    updateSlider();
}

function goToSlide(index) {
    const slider = window.slider;
    if (slider.isAnimating || index === slider.currentIndex) return;
    
    slider.isAnimating = true;
    slider.currentIndex = index;
    updateSlider();
}

function updateSlider() {
    const slider = window.slider;
    const carouselTrack = document.getElementById('carousel-track');
    const currentPhotoEl = document.getElementById('current-photo');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carouselTrack) return;
    
    // Hide all slides
    slider.slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.95)';
    });
    
    // Show current slide
    const currentSlide = slider.slides[slider.currentIndex];
    if (currentSlide) {
        currentSlide.classList.add('active');
        currentSlide.style.opacity = '1';
        currentSlide.style.transform = 'scale(1)';
    }
    
    // Move track
    carouselTrack.style.transform = `translateX(-${slider.currentIndex * 100}%)`;
    
    // Update counter
    if (currentPhotoEl) {
        currentPhotoEl.textContent = slider.currentIndex + 1;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slider.currentIndex);
    });
    
    // Reset animation flag
    setTimeout(() => {
        slider.isAnimating = false;
    }, 600);
}

// Update global functions
window.moveCarousel = function(direction) {
    if (direction > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
};

window.toggleCarousel = function() {
    const slider = window.slider;
    const toggleBtn = document.getElementById('carousel-toggle');
    
    if (!toggleBtn) return;
    
    slider.autoPlay = !slider.autoPlay;
    
    if (slider.autoPlay) {
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        startSliderAutoPlay();
        showToast('▶️ Tiếp tục slideshow');
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (slider.intervalId) {
            clearInterval(slider.intervalId);
            slider.intervalId = null;
        }
        showToast('⏸️ Tạm dừng slideshow');
    }
};

// ===== MAP FUNCTIONS =====
window.openGoogleMaps = function() {
    const coordinates = "21°15'50.2\"N 106°36'44.2\"E";
    // Convert to decimal
    const lat = 21.263944; // 21°15'50.2"N
    const lng = 106.612278; // 106°36'44.2"E
    
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
    showToast('🗺️ Đang mở Google Maps...');
};

window.openAppleMaps = function() {
    const lat = 21.263944;
    const lng = 106.612278;
    
    // iOS/Apple Maps
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const url = `http://maps.apple.com/?ll=${lat},${lng}&q=Địa+điểm+tiệc+cưới`;
        window.open(url, '_blank');
    } else {
        // Fallback for non-iOS
        const url = `https://maps.apple.com/?ll=${lat},${lng}&q=Địa+điểm+tiệc+cưới`;
        window.open(url, '_blank');
    }
    showToast('🍎 Đang mở Apple Maps...');
};

window.copyCoordinates = function() {
    const coordinates = "21°15'50.2\"N 106°36'44.2\"E";
    navigator.clipboard.writeText(coordinates).then(() => {
        showToast('📍 Đã sao chép tọa độ: ' + coordinates);
    });
};

// Update switchAddress to include coordinates
window.switchAddress = function(type) {
    const btnOld = document.getElementById('btn-old-address');
    const btnNew = document.getElementById('btn-new-address');
    const addressDisplay = document.getElementById('address-display');
    
    if (!addressDisplay) return;
    
    // Update active button
    if (btnOld) btnOld.classList.toggle('active', type === 'old');
    if (btnNew) btnNew.classList.toggle('active', type === 'new');
    
    // Coordinates cố định
    const coordinates = "21°15'50.2\"N 106°36'44.2\"E";
    
    if (type === 'old') {
        addressDisplay.innerHTML = `
            <div class="address-header">
                <div class="address-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h3 class="address-title">ĐỊA CHỈ CŨ</h3>
            </div>
            <p class="address-content">
                Đội 1, Thôn Tân Giáo, Xã Tân Mộc, Huyện Lục Ngạn, Tỉnh Bắc Giang
            </p>
            <div class="address-coordinates">
                <i class="fas fa-compass"></i>
                <span>Tọa độ: ${coordinates}</span>
            </div>
        `;
    } else {
        addressDisplay.innerHTML = `
            <div class="address-header">
                <div class="address-icon">
                    <i class="fas fa-building"></i>
                </div>
                <h3 class="address-title">ĐỊA CHỈ MỚI</h3>
            </div>
            <p class="address-content">
                Thôn Tân Giáo, Xã Nam Dương, Tỉnh Bắc Ninh
            </p>
            <div class="address-coordinates">
                <i class="fas fa-compass"></i>
                <span>Tọa độ: ${coordinates}</span>
            </div>
        `;
    }
    
    showToast(`📍 Đã chuyển sang địa chỉ ${type === 'old' ? 'cũ' : 'mới'}`);
};
// ===== CAROUSEL FUNCTIONS =====
function startCarouselAutoPlay() {
    const config = window.carouselConfig;
    
    // Dừng interval cũ nếu có
    if (config.intervalId) {
        clearInterval(config.intervalId);
    }
    
    // Bắt đầu interval mới
    config.intervalId = setInterval(() => {
        moveCarousel(1);
    }, config.interval);
    
    console.log(`🎬 Carousel auto-play started (${config.interval}ms interval)`);
}

function moveCarousel(direction) {
    const config = window.carouselConfig;
    const track = document.getElementById('carousel-track');
    const currentPhotoEl = document.getElementById('current-photo');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || config.totalSlides === 0) {
        console.error('❌ Không thể move carousel: track không tồn tại hoặc không có slides');
        return;
    }
    
    // Tính toán index mới
    let newIndex = config.currentIndex + direction;
    
    // Xử lý infinite loop
    if (newIndex >= config.totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = config.totalSlides - 1;
    }
    
    // Cập nhật index
    config.currentIndex = newIndex;
    
    // Tính toán vị trí dịch chuyển
    const translateX = -(config.currentIndex * config.slideWidth);
    
    // Áp dụng animation
    track.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(${translateX}px)`;
    
    // Cập nhật UI
    if (currentPhotoEl) {
        currentPhotoEl.textContent = config.currentIndex + 1;
    }
    
    // Cập nhật dots
    dots.forEach((dot, index) => {
        if (index === config.currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Debug
    console.log(`➡️ Chuyển sang ảnh ${config.currentIndex + 1}/${config.totalSlides}`);
}

function goToSlide(index) {
    const config = window.carouselConfig;
    const track = document.getElementById('carousel-track');
    const currentPhotoEl = document.getElementById('current-photo');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || index === config.currentIndex || index < 0 || index >= config.totalSlides) {
        return;
    }
    
    // Cập nhật index
    config.currentIndex = index;
    
    // Tính toán vị trí dịch chuyển
    const translateX = -(config.currentIndex * config.slideWidth);
    
    // Áp dụng animation
    track.style.transition = 'transform 0.6s ease';
    track.style.transform = `translateX(${translateX}px)`;
    
    // Cập nhật UI
    if (currentPhotoEl) {
        currentPhotoEl.textContent = config.currentIndex + 1;
    }
    
    // Cập nhật dots
    dots.forEach((dot, i) => {
        if (i === config.currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    console.log(`🎯 Nhảy đến ảnh ${config.currentIndex + 1}/${config.totalSlides}`);
}

function toggleCarousel() {
    const config = window.carouselConfig;
    const toggleBtn = document.getElementById('carousel-toggle');
    
    if (!toggleBtn) return;
    
    config.autoPlay = !config.autoPlay;
    
    if (config.autoPlay) {
        // Tiếp tục chạy
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        startCarouselAutoPlay();
        console.log('▶️ Tiếp tục carousel');
    } else {
        // Dừng
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (config.intervalId) {
            clearInterval(config.intervalId);
            config.intervalId = null;
        }
        console.log('⏸️ Dừng carousel');
    }
}

// ===== KIỂM TRA VÀ FIX LỖI =====
function checkAndFixCarousel() {
    console.log('🔧 Kiểm tra và fix carousel...');
    
    const track = document.getElementById('carousel-track');
    const config = window.carouselConfig;
    
    if (!track) {
        console.error('❌ Không tìm thấy carousel-track');
        return;
    }
    
    // Kiểm tra số lượng slides
    const slides = track.querySelectorAll('.carousel-slide');
    console.log(`📊 Tìm thấy ${slides.length} slides trong DOM`);
    
    if (slides.length === 0) {
        console.error('❌ Không có slides nào được tạo');
        console.log('🔄 Đang tạo lại slides...');
        initializePhotoAlbum();
        return;
    }
    
    if (config && config.totalSlides !== slides.length) {
        console.warn(`⚠️ Số slides không khớp: config=${config.totalSlides}, DOM=${slides.length}`);
        config.totalSlides = slides.length;
    }
    
    // Kiểm tra auto-play
    if (config && config.autoPlay && !config.intervalId) {
        console.log('🔄 Khởi động lại auto-play...');
        startCarouselAutoPlay();
    }
    
    console.log('✅ Kiểm tra hoàn tất');
}

// Gọi kiểm tra khi trang load
window.addEventListener('load', function() {
    setTimeout(checkAndFixCarousel, 2000);
});

// Thêm nút debug (tạm thời)
function debugCarousel() {
    console.log('=== DEBUG CAROUSEL ===');
    const track = document.getElementById('carousel-track');
    const config = window.carouselConfig;
    
    console.log('Track:', track);
    console.log('Config:', config);
    
    if (track) {
        const slides = track.querySelectorAll('.carousel-slide');
        console.log(`Slides: ${slides.length}`);
        
        slides.forEach((slide, i) => {
            const img = slide.querySelector('img');
            console.log(`Slide ${i}: src="${img?.src?.substring(0, 50)}..."`);
        });
    }
    
    // Thử chạy lại carousel nếu không hoạt động
    if (config && config.autoPlay && !config.intervalId) {
        console.log('🔄 Restarting carousel...');
        startCarouselAutoPlay();
    }
}

// ===== LIGHTBOX FUNCTIONS =====
function openLightbox(imageUrl, index) {
    // Đóng lightbox cũ nếu có
    closeLightbox();
    
    // Tạo lightbox mới
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const photos = window.weddingData?.photos || WEDDING_CONFIG.photos;
    
    lightbox.innerHTML = `
        <div style="position: relative; max-width: 90vw; max-height: 90vh;">
            <img src="${imageUrl}" 
                 alt="Ảnh cưới" 
                 style="
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 10px;
                    background: white;
                    padding: 10px;
                 "
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=contain&w=800&q=80'">
            
            <div style="
                position: absolute;
                bottom: -40px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.2rem;
                background: rgba(0, 0, 0, 0.7);
                padding: 8px 20px;
                border-radius: 20px;
                font-family: 'Poppins', sans-serif;
            ">
                ${index + 1} / ${photos.length}
            </div>
            
            <button onclick="closeLightbox()" style="
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 64, 129, 0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-times"></i>
            </button>
            
            <button onclick="changeLightboxPhoto(${index - 1})" style="
                position: absolute;
                top: 50%;
                left: -60px;
                transform: translateY(-50%);
                background: rgba(255, 64, 129, 0.9);
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <button onclick="changeLightboxPhoto(${index + 1})" style="
                position: absolute;
                top: 50%;
                right: -60px;
                transform: translateY(-50%);
                background: rgba(255, 64, 129, 0.9);
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Lưu index hiện tại
    lightbox.dataset.currentIndex = index;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        lightbox.remove();
    }
}

function changeLightboxPhoto(newIndex) {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) return;
    
    const photos = window.weddingData?.photos || WEDDING_CONFIG.photos;
    let currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    
    // Xử lý index
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;
    
    // Cập nhật ảnh
    const photoUrl = `/static/images/${photos[newIndex]}`;
    const img = lightbox.querySelector('img');
    const counter = lightbox.querySelector('div:nth-child(2)');
    
    img.src = photoUrl;
    counter.textContent = `${newIndex + 1} / ${photos.length}`;
    
    // Cập nhật index
    lightbox.dataset.currentIndex = newIndex;
    
    // Cập nhật nút
    const prevBtn = lightbox.querySelector('button:nth-child(4)');
    const nextBtn = lightbox.querySelector('button:nth-child(5)');
    prevBtn.setAttribute('onclick', `changeLightboxPhoto(${newIndex - 1})`);
    nextBtn.setAttribute('onclick', `changeLightboxPhoto(${newIndex + 1})`);
}

// Thêm sự kiện keyboard
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            const currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
            changeLightboxPhoto(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            const currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
            changeLightboxPhoto(currentIndex + 1);
        }
    }
});
// ===== CAROUSEL FUNCTIONS =====
function initializeCarousel() {
    const config = window.carouselConfig;
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!track || slides.length === 0) return;
    
    // Tính toán kích thước slide
    const slideWidth = slides[0].offsetWidth + 20; // + gap
    const middleIndex = Math.floor(slides.length / 3); // Lấy phần giữa của clones
    
    // Đặt vị trí ban đầu ở phần giữa
    track.style.transform = `translateX(-${middleIndex * slideWidth}px)`;
    config.currentIndex = 0;
    
    // Bắt đầu auto-play
    startAutoPlay();
    
    // Thêm sự kiện click cho slides
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
        });
    });
}


function updateCarouselUI() {
    const config = window.carouselConfig;
    const currentPhotoEl = document.getElementById('current-photo');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Cập nhật số thứ tự
    currentPhotoEl.textContent = config.currentIndex + 1;
    
    // Cập nhật dots
    dots.forEach((dot, index) => {
        if (index === config.currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startAutoPlay() {
    const config = window.carouselConfig;
    
    if (config.autoPlay) {
        clearInterval(config.intervalId);
        config.intervalId = setInterval(() => {
            moveCarousel(1);
        }, config.interval);
    }
}



function initializeCarouselLazyLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.onload = () => {
                        // Tự động điều chỉnh object-fit dựa trên tỷ lệ ảnh
                        if (img.naturalWidth && img.naturalHeight) {
                            const ratio = img.naturalWidth / img.naturalHeight;
                            if (ratio > 1.2) {
                                img.style.objectFit = 'contain';
                                img.style.width = '100%';
                                img.style.height = 'auto';
                            } else if (ratio < 0.8) {
                                img.style.objectFit = 'contain';
                                img.style.height = '100%';
                                img.style.width = 'auto';
                            }
                        }
                    };
                    observer.unobserve(img);
                }
            }
        });
    }, {
        root: document.querySelector('.carousel-container'),
        rootMargin: '50px',
        threshold: 0.1
    });
    
    images.forEach(img => observer.observe(img));
}

// ===== LIGHTBOX FUNCTION =====

function createCustomLightbox() {
    const lightboxHTML = `
        <div id="custom-lightbox" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        ">
            <div style="position: relative; max-width: 90vw; max-height: 90vh;">
                <img id="lightbox-image" src="" alt="" style="
                    max-width: 100%;
                    max-height: 85vh;
                    object-fit: contain;
                    border-radius: 10px;
                    background: white;
                    padding: 10px;
                ">
                <div id="lightbox-counter" style="
                    position: absolute;
                    bottom: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    font-size: 1.2rem;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-family: 'Poppins', sans-serif;
                "></div>
                <button onclick="closeLightbox()" style="
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: rgba(255, 64, 129, 0.9);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-times"></i>
                </button>
                <button onclick="lightboxPrev()" style="
                    position: absolute;
                    top: 50%;
                    left: -60px;
                    transform: translateY(-50%);
                    background: rgba(255, 64, 129, 0.9);
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button onclick="lightboxNext()" style="
                    position: absolute;
                    top: 50%;
                    right: -60px;
                    transform: translateY(-50%);
                    background: rgba(255, 64, 129, 0.9);
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

function closeLightbox() {
    const lightbox = document.getElementById('custom-lightbox');
    lightbox.style.display = 'none';
}

function lightboxPrev() {
    const lightbox = document.getElementById('custom-lightbox');
    const photos = window.weddingData?.photos || WEDDING_CONFIG.photos;
    let currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    lightbox.dataset.currentIndex = currentIndex;
    
    const photoUrl = `/static/images/${photos[currentIndex]}`;
    openLightbox(photoUrl, currentIndex);
}

function lightboxNext() {
    const lightbox = document.getElementById('custom-lightbox');
    const photos = window.weddingData?.photos || WEDDING_CONFIG.photos;
    let currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    
    currentIndex = (currentIndex + 1) % photos.length;
    lightbox.dataset.currentIndex = currentIndex;
    
    const photoUrl = `/static/images/${photos[currentIndex]}`;
    openLightbox(photoUrl, currentIndex);
}

// ===== THÊM SỰ KIỆN KEYBOARD =====
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('custom-lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev();
        } else if (e.key === 'ArrowRight') {
            lightboxNext();
        }
    }
});
// ===== SHARE FUNCTIONS =====
function initializeShareFunctions() {
    window.shareOnFacebook = function() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Thiệp cưới Quang Gioóng & Chum Chum');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
        showToast('📱 Đang mở Facebook...');
    };
    
    window.shareOnZalo = function() {
        const url = window.location.href;
        const text = `Thiệp cưới Quang Gioóng & Chum Chum\n${url}`;
        
        navigator.clipboard.writeText(text).then(() => {
            showToast('✅ Đã sao chép link! Mở Zalo để chia sẻ.');
        }).catch(() => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('✅ Đã sao chép link! Mở Zalo để chia sẻ.');
        });
    };
    
    window.shareViaLink = function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showToast('🔗 Đã sao chép đường link!');
        }).catch(() => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('🔗 Đã sao chép đường link!');
        });
    };
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
            btn.style.transform = 'translateY(20px)';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MUSIC CONTROLS =====
function initializeMusicControls() {
    const control = document.getElementById('musicControl');
    const music = document.getElementById('weddingMusic');
    
    if (!control || !music) return;
    
    // Set initial volume
    music.volume = 0.3;
    
    // Show control after a delay
    setTimeout(() => {
        if (control) {
            control.style.opacity = '1';
            control.style.transition = 'opacity 0.3s ease';
        }
    }, 2000);
    
    // Toggle play/pause
    control.addEventListener('click', function() {
        if (music.paused) {
            music.play().then(() => {
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.style.background = 'linear-gradient(135deg, #4169e1, #7b1fa2)';
                showToast('🎵 Đang phát nhạc');
            }).catch(e => {
                console.log('Không thể phát nhạc:', e);
                showToast('🔇 Nhấn để phát nhạc');
            });
        } else {
            music.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.style.background = 'linear-gradient(135deg, #666, #888)';
            showToast('🔇 Đã tắt nhạc');
        }
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    // Remove existing toasts
    document.querySelectorAll('.toast-notification').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #2e7d32, #388e3c);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: min(400px, 90vw);
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    toast.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 18px;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.style.transform = 'translateX(0)', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Khởi tạo khi trang đã load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM đã sẵn sàng');
    });
} else {
    console.log('📄 DOM đã sẵn sàng');
}