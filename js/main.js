// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 导航链接高亮
    highlightActiveNavLink();
    
    // 滚动进度条
    initScrollProgress();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 滚动动画
    initScrollAnimations();
    
    // 回到顶部按钮
    initBackToTop();
    
    // 团队筛选功能
    initTeamFilter();
});

// 高亮当前页面的导航链接
function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // 主页特殊处理
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (linkPath === '#' || linkPath === 'index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } 
        // 其他页面
        else if (linkPath !== '#' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 初始化滚动进度条
function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 如果是移动端菜单，点击后关闭菜单
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .highlight-card, .news-card');
    
    // 如果IntersectionObserver可用
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(element => {
            element.classList.remove('animate-fade-in');
            element.style.opacity = 0;
            observer.observe(element);
        });
    } else {
        // 回退方案 - 如果浏览器不支持IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate-fade-in');
        });
    }
}

// 初始化回到顶部按钮
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // 控制按钮的显示和隐藏
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
            }
        });
        
        // 点击回到顶部
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化团队筛选功能
function initTeamFilter() {
    const filterButtons = document.querySelectorAll('.team-filter');
    const studentCards = document.querySelectorAll('.student-card');
    
    if(filterButtons.length > 0 && studentCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按钮的活跃状态
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-600');
                });
                
                // 添加当前按钮的活跃状态
                button.classList.remove('bg-white', 'text-gray-600');
                button.classList.add('bg-blue-500', 'text-white');
                
                const filter = button.getAttribute('data-filter');
                
                // 筛选学生卡片
                studentCards.forEach(card => {
                    if(filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
} 