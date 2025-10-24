class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #22c55e 0%, #f59e0b 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 50;
        }
        
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block;
          }
          
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #22c55e 0%, #f59e0b 100%);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .nav-links.mobile-open {
            display: flex;
          }
        }
      </style>
      <nav>
        <a href="index.html" class="logo">
          <i data-feather="flame"></i>
          Flora Yanma Atlası
        </a>
        
        <button class="mobile-menu-button">
          <i data-feather="menu"></i>
        </button>
        
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link"><i data-feather="home"></i>Ana Sayfa</a></li>
          <li><a href="plants.html" class="nav-link"><i data-feather="compass"></i>Bitkileri Keşfet</a></li>
          <li><a href="fire-safety.html" class="nav-link"><i data-feather="shield"></i>Yangın Güvenliği</a></li>
          <li><a href="about.html" class="nav-link"><i data-feather="info"></i>Hakkında</a></li>
        </ul>
      </nav>
    `;
    
    // Add mobile menu functionality
    const mobileButton = this.shadowRoot.querySelector('.mobile-menu-button');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    
    mobileButton.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = mobileButton.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
      icon.setAttribute('data-feather', 'x');
      } else {
      icon.setAttribute('data-feather', 'menu');
      }
      feather.replace();
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);