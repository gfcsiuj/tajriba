document.addEventListener('DOMContentLoaded', () => {

    // Mock Data
    const products = [
        {
            id: 1,
            name: 'ساعة كلاسيكية فاخرة',
            price: 450,
            category: 'إكسسوارات',
            image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'نظارة شمسية عصرية',
            price: 180,
            category: 'نظارات',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'عطر العود الملكي',
            price: 320,
            category: 'عطور',
            image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 4,
            name: 'حقيبة جلدية أنيقة',
            price: 290,
            category: 'حقائب',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 5,
            name: 'سماعة بلوتوث رياضية',
            price: 150,
            category: 'إلكترونيات',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 6,
            name: 'حذاء رياضي مريح',
            price: 220,
            category: 'أحذية',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 7,
            name: 'كاميرا احترافية',
            price: 2500,
            category: 'إلكترونيات',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 8,
            name: 'طقم مكتبي فاخر',
            price: 120,
            category: 'مستلزمات',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        }
    ];

    // DOM Elements
    const productsGrid = document.getElementById('products-grid');
    const cartCount = document.querySelector('.count');
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    let cart = 0;

    // Initialize
    renderProducts();

    // Render Products Function
    function renderProducts() {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> أضف للسلة
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} ر.س</div>
                </div>
            </div>
        `).join('');
    }

    // Add to Cart Functionality (Exposed globally)
    window.addToCart = function(id) {
        cart++;
        cartCount.textContent = cart;

        // Button feedback animation
        const btn = event.target.closest('.add-to-cart-btn');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> تم الإضافة';
        btn.style.background = '#4CAF50';
        btn.style.color = '#fff';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 1500);
    };

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');

        // Change icon
        const icon = menuBtn.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Sticky Header Background on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navbar.classList.remove('active'); // Close mobile menu if open

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
