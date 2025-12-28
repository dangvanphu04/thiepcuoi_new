# create_files.py
from flask import Flask, render_template, send_from_directory
import json
import os
import socket

app = Flask(__name__)

@app.route('/')
def index():
    wedding_data = {
        "couple": {
            "groom": "QUANG GIOÓNG",
            "bride": "CHUM CHUM"
        },
        "wedding_info": {
            "date": "07.01.2026",
            "time": "16:00",
            "day": "THỨ TƯ",
            "lunar_date": "19 tháng 11 năm Ất Tỵ",
            "location": "Bữa cơm thân mật và lễ thành hôn được tổ chức tại tư gia họ nhà trai. Rất hân hạnh được đón tiếp.",
            "old_address": "Đội 1, Thôn Tân Giáo, Xã Tân Mộc, Huyện Lục Ngạn, Tỉnh Bắc Giang",
            "new_address": "Thôn Tân Giáo, Xã Nam Dương, Tỉnh Bắc Ninh",
            "coordinates": "21°15'50.2\"N 106°36'44.2\"E"
        },
        "families": {
            "groom_family": {
                "father": "ĐẶNG VĂN PHÙNG",
                "mother": "DIỆP THỊ DÍN"
            },
            "bride_family": {
                "father": "LƯỜNG VĂN SOẠN",
                "mother": "LƯỜNG THỊ CHUNG"
            }
        },
        "bank_info": {
            "groom": {
                "name": "ĐẶNG VĂN GIOÓNG",
                "bank": "BIDV",
                "account": "8854911787",
                "qr_code": "qrck.jpg"
            },
            "bride": {
                "name": "LƯỜNG THỊ CHUM",
                "bank": "MB",
                "account": "996199677777",
                "qr_code": "qrvk.jpg"
            }
        },
        "contact": {
            "groom_phone": "0356616112",
            "bride_phone": "0985909833"
        },
        "photos": [
            "chinh.jpg",
            "anh1.jpg",
            "anh2.jpg",
            "anh3.jpg",
            "anh4.jpg",
            "anh5.jpg",
            "anh6.jpg",
            "anh7.jpg",
            "anh9.jpg",
            "anh9.jpg"
        ]
    }
    
    return render_template(
        'index.html',
        wedding_data_json=json.dumps(wedding_data),
        couple=wedding_data["couple"],
        wedding_info=wedding_data["wedding_info"],
        families=wedding_data["families"],
        bank_info=wedding_data["bank_info"],
        contact=wedding_data["contact"],
        photos=wedding_data["photos"]
    )

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

def get_ip_address():
    """Lấy địa chỉ IP của máy"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
        s.close()
        return ip_address
    except Exception as e:
        print(f"Không thể lấy IP: {e}")
        return "127.0.0.1"

if __name__ == '__main__':
    # Tạo thư mục
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/audio', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Lấy địa chỉ IP
    ip_address = get_ip_address()
    
    print("\n" + "="*60)
    print("THIỆP CƯỚI ĐÃ SẴN SÀNG!")
    print("="*60)
    print(f"\nTruy cập trên máy tính:")
    print(f"   - Local: http://localhost:5000")
    print(f"   - IP: http://{ip_address}:5000")
    
    print(f"\nTruy cập trên điện thoại (cùng WiFi):")
    print(f"   - Mở trình duyệt và nhập: http://{ip_address}:5000")
    
    print(f"\nLưu ý:")
    print(f"   - Đảm bảo cả 2 thiết bị cùng kết nối 1 mạng WiFi")
    print(f"   - Có thể cần tắt tường lửa tạm thời")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')