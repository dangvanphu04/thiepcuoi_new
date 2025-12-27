// static/js/envelope.js - SIMPLE VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('💌 Đã tải envelope.js');
    
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const invitationContent = document.getElementById('invitationContent');
    
    // Debug
    console.log('Envelope overlay:', envelopeOverlay);
    console.log('Invitation content:', invitationContent);
    
    if (!envelopeOverlay || !invitationContent) {
        console.error('❌ Không tìm thấy các phần tử cần thiết');
        return;
    }
    
    // Hiện envelope
    envelopeOverlay.style.display = 'flex';
    envelopeOverlay.style.opacity = '1';
    
    // Hàm mở thiệp
    function openEnvelope() {
        console.log('🎉 Đang mở thiệp...');
        
        // Thêm hiệu ứng mở
        envelopeOverlay.style.opacity = '0';
        envelopeOverlay.style.transition = 'opacity 1s ease';
        
        // Đợi hiệu ứng xong rồi ẩn
        setTimeout(function() {
            envelopeOverlay.style.display = 'none';
            
            // Hiện nội dung chính
            invitationContent.style.display = 'block';
            invitationContent.style.opacity = '0';
            
            // Fade in nội dung
            setTimeout(function() {
                invitationContent.style.opacity = '1';
                invitationContent.style.transition = 'opacity 1s ease';
            }, 50);
            
            // Khởi động nhạc (nếu có)
            const music = document.getElementById('weddingMusic');
            if (music) {
                try {
                    music.volume = 0.3;
                    music.play().then(() => {
                        console.log('🎵 Đã phát nhạc');
                    }).catch(e => {
                        console.log('⏸️ Nhạc bị chặn tự động phát');
                    });
                } catch (e) {
                    console.log('❌ Lỗi phát nhạc:', e);
                }
            }
            
            // Gọi hàm khởi tạo features
            if (typeof initializeAllFeatures === 'function') {
                setTimeout(initializeAllFeatures, 100);
            }
            
        }, 1000);
    }
    
    // Thêm event click
    envelopeOverlay.addEventListener('click', openEnvelope);
    
    // Thêm event cho Enter/Space key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            openEnvelope();
        }
    });
    
    // Auto-open after 10 seconds (tùy chọn)
    setTimeout(function() {
        console.log('⏰ Auto-open sau 10 giây...');
        openEnvelope();
    }, 10000);
});