// 全局变量
let publicationsData = null;
let currentLang = 'zh'; // 默认语言
let paperPage = 1;
let patentPage = 1;
let awardPage = 1;
let transferPage = 1;
const itemsPerPage = 3; // 每页显示的条目数
let currentPaperType = 'all'; // 当前选中的论文类型
let currentYear = 'all'; // 当前选中的年份

// 初始化函数
function initPublicationsData() {
    try {
        // 从API获取数据
        fetch('https://wl778.cc/publications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // 将API返回的数据保存到publicationsData
            publicationsData = data;
            
            // 初始化年份和类型过滤器
            setupYearFilters();
            setupTypeFilters();
            
            // 渲染所有部分
            renderAllSections();
        })
        .catch(error => {
            console.error('获取数据失败:', error);
            // 加载失败时显示错误信息
            document.getElementById('papers-list').innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-exclamation-circle text-3xl mb-4"></i>
                    <p>加载数据失败，请稍后重试。</p>
                    <p class="text-sm mt-2">错误信息: ${error.message}</p>
                </div>
            `;
        });
        
        // 设置加载更多按钮事件
        setupLoadMoreButtons();
        
        // 监听语言切换
        document.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            renderAllSections();
        });
        
    } catch (error) {
        console.error('初始化数据失败:', error);
    }
}

// 设置加载更多按钮
function setupLoadMoreButtons() {
    document.getElementById('load-more-papers').addEventListener('click', () => {
        paperPage++;
        renderPapers();
    });
    
    document.getElementById('load-more-patents').addEventListener('click', () => {
        patentPage++;
        renderPatents();
    });
    
    document.getElementById('load-more-awards').addEventListener('click', () => {
        awardPage++;
        renderAwards();
    });
    
    document.getElementById('load-more-transfers').addEventListener('click', () => {
        transferPage++;
        renderTransfers();
    });
}

// 设置年份筛选器
function setupYearFilters() {
    const yearFilters = document.querySelectorAll('.year-filter-btn');
    yearFilters.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            yearFilters.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            
            // 重置分页并重新渲染
            paperPage = 1;
            const yearValue = this.getAttribute('data-year');
            currentYear = yearValue;
            renderPapers();
        });
    });
}

// 设置论文类型筛选器
function setupTypeFilters() {
    const typeFilters = document.querySelectorAll('.type-filter-btn');
    typeFilters.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            typeFilters.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            
            // 重置分页并重新渲染
            paperPage = 1;
            const typeValue = this.getAttribute('data-type');
            currentPaperType = typeValue;
            renderPapers();
        });
    });
}

// 渲染所有部分
function renderAllSections() {
    paperPage = 1;
    patentPage = 1;
    awardPage = 1;
    transferPage = 1;
    
    renderPapers();
    renderPatents();
    renderAwards();
    renderTransfers();
}

// 渲染论文部分
function renderPapers() {
    if (!publicationsData) return;
    
    const papersList = document.getElementById('papers-list');
    let papers = [...publicationsData.papers];
    
    // 根据类型筛选
    if (currentPaperType !== 'all') {
        papers = papers.filter(paper => paper.type === currentPaperType);
    }
    
    // 根据年份筛选
    if (currentYear !== 'all') {
        if (currentYear === 'earlier') {
            // 显示2022年及以前的论文
            papers = papers.filter(paper => paper.year <= 2022);
        } else {
            // 显示特定年份的论文
            const year = parseInt(currentYear);
            papers = papers.filter(paper => paper.year === year);
        }
    }
    
    // 按年份降序排序
    papers.sort((a, b) => b.year - a.year);
    
    // 计算当前页应显示的论文
    const startIndex = 0;
    const endIndex = paperPage * itemsPerPage;
    const displayedPapers = papers.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    papersList.innerHTML = '';
    
    if (displayedPapers.length === 0) {
        papersList.innerHTML = `<div class="text-center text-gray-500 py-8">${currentLang === 'zh' ? '没有找到符合条件的论文' : 'No papers found matching your criteria'}</div>`;
    } else {
        // 渲染论文
        displayedPapers.forEach(paper => {
            const paperHTML = createPaperHTML(paper);
            papersList.innerHTML += paperHTML;
        });
    }
    
    // 控制"加载更多"按钮的显示
    const loadMoreButton = document.getElementById('load-more-papers');
    if (papers.length <= endIndex) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-flex';
    }
}

// 创建论文HTML
function createPaperHTML(paper) {
    const title = currentLang === 'zh' ? paper.title : paper.title_en;
    const authors = currentLang === 'zh' ? paper.authors : paper.authors_en;
    
    // 创建标签HTML
    let tagsHTML = '';
    paper.tags.forEach(tag => {
        const tagText = currentLang === 'zh' ? tag.text : tag.text_en;
        tagsHTML += `<span class="publication-tag">${tagText}</span>`;
    });
    
    // 创建链接HTML
    let linksHTML = '';
    paper.links.forEach(link => {
        const linkText = link.type.toUpperCase();
        const i18nKey = `paper-${link.type}`;
        linksHTML += `
            <a href="${link.url}" class="publication-link">
                <i class="fas fa-${link.type === 'pdf' ? 'file-pdf' : link.type === 'doi' ? 'link' : 'code'}"></i>
                <span data-i18n="${i18nKey}">${linkText}</span>
            </a>
        `;
    });
    
    return `
        <div class="publication-card">
            <div class="publication-year">${paper.year}</div>
            <div class="publication-content">
                <h3 class="publication-title">${title}</h3>
                <p class="publication-authors">${authors}</p>
                <p class="publication-journal">${paper.journal}</p>
                <div class="publication-tags">
                    ${tagsHTML}
                </div>
                <div class="publication-links">
                    ${linksHTML}
                </div>
            </div>
        </div>
    `;
}

// 渲染专利部分
function renderPatents() {
    if (!publicationsData) return;
    
    const patentsList = document.getElementById('patents-list');
    let patents = [...publicationsData.patents];
    
    // 按年份降序排序
    patents.sort((a, b) => b.year - a.year);
    
    // 计算当前页应显示的专利
    const startIndex = 0;
    const endIndex = patentPage * itemsPerPage;
    const displayedPatents = patents.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    patentsList.innerHTML = '';
    
    // 渲染专利
    displayedPatents.forEach(patent => {
        const patentHTML = createPatentHTML(patent);
        patentsList.innerHTML += patentHTML;
    });
    
    // 控制"加载更多"按钮的显示
    const loadMoreButton = document.getElementById('load-more-patents');
    if (patents.length <= endIndex) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-flex';
    }
}

// 创建专利HTML
function createPatentHTML(patent) {
    const title = currentLang === 'zh' ? patent.title : patent.title_en;
    const inventors = currentLang === 'zh' ? patent.inventors : patent.inventors_en;
    const status = currentLang === 'zh' ? patent.status : patent.status_en;
    
    return `
        <div class="patent-card">
            <div class="patent-icon">
                <i class="fas fa-lightbulb"></i>
            </div>
            <div class="patent-content">
                <h4 class="patent-title">${title}</h4>
                <p class="patent-info">专利号：${patent.number}</p>
                <p class="patent-authors">发明人：${inventors}</p>
                <span class="patent-status">${status}</span>
            </div>
        </div>
    `;
}

// 渲染奖项部分
function renderAwards() {
    if (!publicationsData) return;
    
    const awardsList = document.getElementById('awards-list');
    let awards = [...publicationsData.awards];
    
    // 计算当前页应显示的奖项
    const startIndex = 0;
    const endIndex = awardPage * itemsPerPage;
    const displayedAwards = awards.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    awardsList.innerHTML = '';
    
    // 渲染奖项
    displayedAwards.forEach(award => {
        const awardHTML = createAwardHTML(award);
        awardsList.innerHTML += awardHTML;
    });
    
    // 控制"加载更多"按钮的显示
    const loadMoreButton = document.getElementById('load-more-awards');
    if (awards.length <= endIndex) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-flex';
    }
}

// 创建奖项HTML
function createAwardHTML(award) {
    const title = currentLang === 'zh' ? award.title : award.title_en;
    const description = currentLang === 'zh' ? award.description : award.description_en;
    const year = currentLang === 'zh' ? award.year : award.year_en;
    
    return `
        <div class="award-card">
            <div class="award-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="award-content">
                <h4 class="award-title">${title}</h4>
                <p class="award-desc">${description}</p>
                <p class="award-year">${year}</p>
            </div>
        </div>
    `;
}

// 渲染技术转化部分
function renderTransfers() {
    if (!publicationsData) return;
    
    const transfersList = document.getElementById('transfers-list');
    let transfers = [...publicationsData.transfers];
    
    // 计算当前页应显示的转化项目
    const startIndex = 0;
    const endIndex = transferPage * itemsPerPage;
    const displayedTransfers = transfers.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    transfersList.innerHTML = '';
    
    // 渲染转化项目
    displayedTransfers.forEach(transfer => {
        const transferHTML = createTransferHTML(transfer);
        transfersList.innerHTML += transferHTML;
    });
    
    // 控制"加载更多"按钮的显示
    const loadMoreButton = document.getElementById('load-more-transfers');
    if (transfers.length <= endIndex) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-flex';
    }
}

// 创建技术转化HTML
function createTransferHTML(transfer) {
    const title = currentLang === 'zh' ? transfer.title : transfer.title_en;
    const description = currentLang === 'zh' ? transfer.description : transfer.description_en;
    const year = currentLang === 'zh' ? transfer.year : transfer.year_en;
    const learnMore = currentLang === 'zh' ? '了解更多 →' : 'Learn More →';
    
    return `
        <div class="transform-card">
            <div class="transform-image">
                <img src="${transfer.image}" alt="${title}" class="w-full h-48 object-cover rounded-t-lg">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${title}</h3>
                <p class="text-gray-600 mb-4">${description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${year}</span>
                    <a href="#" class="text-blue-500 hover:text-blue-600">${learnMore}</a>
                </div>
            </div>
        </div>
    `;
}

// 当页面加载完成时初始化
document.addEventListener('DOMContentLoaded', initPublicationsData); 