// newsData.js - 实验室最新动态数据

// 全局变量
let newsData = null;
let currentLang = 'zh'; // 默认语言
let newsPage = 1;
const newsItemsPerPage = 3; // the perpage to show

/**
 * 初始化新闻数据
 */
function initNewsData() {
    // 获取当前语言
    currentLang = document.documentElement.lang === 'en' ? 'en' : 'zh';
    
    // 新闻数据JSON
    newsData = {
        zh: [
            {
                id: 1,
                month: "六月",
                day: "15",
                title: "实验室论文被SIGCHI 2023接收",
                desc: "我们的研究成果《基于深度学习的情感识别交互系统》被SIGCHI 2023会议接收。",
                link: "pages/publications.html",
                linkText: "查看详情"
            },
            {
                id: 2,
                month: "五月",
                day: "28",
                title: "实验室获得国家自然科学基金项目",
                desc: "我们的项目《多模态人机交互中的认知计算研究》获得国家自然科学基金支持。",
                link: "pages/research.html",
                linkText: "查看详情"
            },
            {
                id: 3,
                month: "四月",
                day: "10",
                title: "实验室与科技公司建立产学研合作",
                desc: "我们与领先的AI科技公司建立了产学研合作关系，共同推进人机交互技术的落地应用。",
                link: "pages/contact.html",
                linkText: "查看详情"
            },
            {
                id: 4,
                month: "三月",
                day: "25",
                title: "实验室举办人工智能研讨会",
                desc: "我们成功举办了'AI与人机交互未来发展'研讨会，邀请多位领域专家进行了精彩的分享。",
                link: "pages/research.html",
                linkText: "查看详情"
            },
            {
                id: 5,
                month: "二月",
                day: "18",
                title: "博士生获国际会议最佳论文奖",
                desc: "我们实验室的博士生王明在国际人机交互会议上凭借优秀的研究成果获得最佳论文奖。",
                link: "pages/publications.html",
                linkText: "查看详情"
            },
            {
                id: 6,
                month: "一月",
                day: "10",
                title: "实验室开发的交互系统获专利授权",
                desc: "我们自主研发的'基于眼动追踪的混合现实交互系统'获得国家发明专利授权。",
                link: "pages/publications.html",
                linkText: "查看详情"
            },
            {
                id: 7,
                month: "十二月",
                day: "28",
                title: "年度实验室成果展示会圆满举行",
                desc: "2022年度实验室成果展示会圆满结束，展示了我们在过去一年中的科研进展和成果。",
                link: "pages/research.html",
                linkText: "查看详情"
            }
        ],
        en: [
            {
                id: 1,
                month: "Jun",
                day: "15",
                title: "Lab Paper Accepted by SIGCHI 2023",
                desc: "Our research 'Emotion Recognition Interactive System Based on Deep Learning' has been accepted by SIGCHI 2023.",
                link: "pages/publications.html",
                linkText: "View Details"
            },
            {
                id: 2,
                month: "May",
                day: "28",
                title: "Lab Receives NSFC Grant",
                desc: "Our project 'Research on Cognitive Computing in Multimodal Human-Computer Interaction' has received support from the National Natural Science Foundation of China.",
                link: "pages/research.html",
                linkText: "View Details"
            },
            {
                id: 3,
                month: "Apr",
                day: "10",
                title: "Lab Establishes Industry-University Research Cooperation",
                desc: "We have established an industry-university research partnership with leading AI technology companies to jointly promote the application of human-computer interaction technology.",
                link: "pages/contact.html",
                linkText: "View Details"
            },
            {
                id: 4,
                month: "Mar",
                day: "25",
                title: "Lab Holds AI Workshop",
                desc: "We successfully held the 'Future Development of AI and Human-Computer Interaction' workshop, inviting many experts in the field to share their insights.",
                link: "pages/research.html",
                linkText: "View Details"
            },
            {
                id: 5,
                month: "Feb",
                day: "18",
                title: "PhD Student Wins Best Paper Award",
                desc: "Our lab's PhD student Wang Ming won the Best Paper Award at the International Conference on Human-Computer Interaction for his excellent research.",
                link: "pages/publications.html",
                linkText: "View Details"
            },
            {
                id: 6,
                month: "Jan",
                day: "10",
                title: "Lab's Interactive System Granted Patent",
                desc: "Our independently developed 'Eye-tracking-based Mixed Reality Interactive System' has been granted a national invention patent.",
                link: "pages/publications.html",
                linkText: "View Details"
            },
            {
                id: 7,
                month: "Dec",
                day: "28",
                title: "Annual Lab Achievement Exhibition Successfully Held",
                desc: "The 2022 annual lab achievement exhibition has successfully concluded, showcasing our research progress and achievements over the past year.",
                link: "pages/research.html",
                linkText: "View Details"
            }
        ]
    };
    
    // 初始化渲染
    renderNews();
    
    // 设置加载更多按钮事件
    setupLoadMoreButton();
}

/**
 * 渲染新闻列表
 */
function renderNews() {
    if (!newsData) return;
    
    const newsList = document.getElementById('news-list');
    let news = [...newsData[currentLang]];
    
    // 计算当前页应该显示的新闻
    const startIndex = 0;
    const endIndex = newsPage * newsItemsPerPage;
    const currentPageNews = news.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    newsList.innerHTML = '';
    
    // 渲染当前页新闻
    currentPageNews.forEach(item => {
        newsList.innerHTML += createNewsHTML(item);
    });
    
    // 更新"加载更多"按钮的可见性
    updateLoadMoreButtonVisibility();
}

/**
 * 创建新闻HTML
 */
function createNewsHTML(news) {
    return `
        <div class="news-card">
            <div class="news-date">
                <span class="news-month">${news.month}</span>
                <span class="news-day">${news.day}</span>
            </div>
            <div class="news-content h-full flex flex-col">
                <h3 class="text-lg font-semibold mb-2">${news.title}</h3>
                <p class="text-gray-600 mb-3 flex-grow">${news.desc}</p>
                <a href="${news.link}" class="text-blue-500 hover:text-blue-600 text-sm font-medium mt-auto">
                    <span>${news.linkText}</span> →
                </a>
            </div>
        </div>
    `;
}

/**
 * 设置加载更多按钮
 */
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-news');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            newsPage++;
            renderNews();
        });
    }
}

/**
 * 更新加载更多按钮的可见性
 */
function updateLoadMoreButtonVisibility() {
    const loadMoreBtn = document.getElementById('load-more-news');
    if (loadMoreBtn) {
        if (newsPage * newsItemsPerPage >= newsData[currentLang].length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

/**
 * 切换语言时更新内容
 */
function updateNewsLanguage(lang) {
    currentLang = lang;
    renderNews();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initNewsData);

// 监听语言变化事件
document.addEventListener('languageChanged', (event) => {
    updateNewsLanguage(event.detail.language);
}); 