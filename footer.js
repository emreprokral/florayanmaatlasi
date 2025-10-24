class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          margin-top: auto;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .footer-link {
          color: #cbd5e0;
          text-decoration: none;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-link:hover {
          color: white;
        }
        
        .footer-bottom {
          border-top: 1px solid #4a5568;
          padding-top: 2rem;
          color: #a0aec0;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="social-links">
            <a href="#" class="social-link">
              <i data-feather="github"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="twitter"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="instagram"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="facebook"></i>
            </a>
          </div>
          
          <div class="footer-links">
            <a href="/privacy.html" class="footer-link">
              <i data-feather="shield"></i>
              Gizlilik
            </a>
            <a href="/terms.html" class="footer-link">
              <i data-feather="file-text"></i>
              Kullanım Şartları
            </a>
            <a href="/contact.html" class="footer-link">
              <i data-feather="mail"></i>
              İletişim
            </a>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; 2024 Flora Yanma Atlası. Tüm hakları saklıdır. 🌿🔥</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);