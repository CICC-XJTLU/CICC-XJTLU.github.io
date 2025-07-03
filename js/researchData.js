// 全局变量
let researchData = null;
let currentLang = getCurrentLanguage(); // 使用从localStorage获取的当前语言
let researchPage = 1;
const researchItemsPerPage = 3; // 每页显示的研究领域数量

// 初始化函数
function initResearchData() {
    try {
        // 初始化当前语言
        currentLang = getCurrentLanguage();
        
        // 使用内嵌数据
        researchData = {
            "research_areas": [
                {
                    "id": 1,
                    "title": "多模态交互",
                    "title_en": "Multimodal Interaction",
                    "desc": "研究语音、手势、表情等多模态输入方式，开发自然、直观的人机交互系统。主要包括：",
                    "desc_en": "Research on multimodal input methods such as speech, gestures, and expressions to develop natural and intuitive human-computer interaction systems. Main areas include:",
                    "icon": "fas fa-hands",
                    "icon_bg": "bg-blue-50",
                    "icon_color": "text-blue-500",
                    "items": [
                        {"text": "多模态信号处理与融合", "text_en": "Multimodal Signal Processing and Fusion"},
                        {"text": "情感计算与交互", "text_en": "Affective Computing and Interaction"},
                        {"text": "自然语言理解与生成", "text_en": "Natural Language Understanding and Generation"},
                        {"text": "语音合成与增强", "text_en": "Speech Synthesis and Enhancement"}
                    ],
                    "link": "#multimodal"
                },
                {
                    "id": 3,
                    "title": "虚拟现实与仿真",
                    "title_en": "Virtual Reality and Simulation",
                    "desc": "探索VR技术和计算机仿真在人机交互中的应用，创造沉浸式体验。主要包括：",
                    "desc_en": "Exploring VR technologies and computer simulation in human-computer interaction to create immersive experiences. Main areas include:",
                    "icon": "fas fa-vr-cardboard",
                    "icon_bg": "bg-purple-50",
                    "icon_color": "text-purple-500",
                    "items": [
                        {"text": "3D交互技术", "text_en": "3D Interaction Technology"},
                        {"text": "混合现实环境", "text_en": "Mixed Reality Environment"},
                        {"text": "空间定位与追踪", "text_en": "Spatial Positioning and Tracking"},
                        {"text": "虚拟场景构建", "text_en": "Virtual Scene Construction"}
                    ],
                    "link": "#vr-ar"
                },
                {
                    "id": 5,
                    "title": "大模型",
                    "title_en": "Large Language Models",
                    "desc": "研究大型语言模型在人机交互中的应用，探索更智能的交互方式。主要包括：",
                    "desc_en": "Research on large language models in human-computer interaction, exploring more intelligent interaction methods. Main areas include:",
                    "icon": "fas fa-brain",
                    "icon_bg": "bg-indigo-50",
                    "icon_color": "text-indigo-500",
                    "items": [
                        {"text": "基于LLM的对话系统", "text_en": "LLM-based Dialogue Systems"},
                        {"text": "多模态大模型应用", "text_en": "Multimodal Large Model Applications"},
                        {"text": "人机协同内容创作", "text_en": "Human-AI Collaborative Content Creation"},
                        {"text": "大模型能力评估", "text_en": "Large Model Capability Assessment"}
                    ],
                    "link": "#llm"
                },
                {
                    "id": 4,
                    "title": "人机协同",
                    "title_en": "Human-AI Collaboration",
                    "desc": "研究人类与AI系统的协同工作方式，提高协作效率和质量。主要包括：",
                    "desc_en": "Research on collaborative work between humans and AI systems to improve collaboration efficiency and quality. Main areas include:",
                    "icon": "fas fa-users-cog",
                    "icon_bg": "bg-yellow-50",
                    "icon_color": "text-yellow-600",
                    "items": [
                        {"text": "混合智能系统", "text_en": "Hybrid Intelligence Systems"},
                        {"text": "协作决策支持", "text_en": "Collaborative Decision Support"},
                        {"text": "人机任务分配", "text_en": "Human-AI Task Allocation"},
                        {"text": "可解释AI交互", "text_en": "Explainable AI Interaction"}
                    ],
                    "link": "#collaboration"
                },
                {
                    "id": 2,
                    "title": "智能界面",
                    "title_en": "Intelligent Interface",
                    "desc": "设计和开发智能化的用户界面，提供个性化、自适应的交互体验。主要包括：",
                    "desc_en": "Design and development of intelligent user interfaces to provide personalized and adaptive interaction experiences. Main areas include:",
                    "icon": "fas fa-desktop",
                    "icon_bg": "bg-green-50",
                    "icon_color": "text-green-500",
                    "items": [
                        {"text": "自适应界面设计", "text_en": "Adaptive Interface Design"},
                        {"text": "个性化推荐系统", "text_en": "Personalized Recommendation Systems"},
                        {"text": "智能交互助手", "text_en": "Intelligent Interaction Assistants"},
                        {"text": "用户行为分析", "text_en": "User Behavior Analysis"}
                    ],
                    "link": "#interface"
                }
            ],
            "partners": [
                {
                    "id": 1,
                    "name": "利物浦大学",
                    "name_en": "University of Liverpool",
                    "logo": "../imgs/利物浦大学.png",
                    "url": "#"
                },
                {
                    "id": 2,
                    "name": "西安交通大学",
                    "name_en": "Xi'an Jiaotong University",
                    "logo": "../imgs/西安交通大学.png",
                    "url": "#"
                },
                {
                    "id": 3,
                    "name": "上海交通大学",
                    "name_en": "Shanghai Jiao Tong University",
                    "logo": "../imgs/上海交通大学.png",
                    "url": "#"
                },
                {
                    "id": 4,
                    "name": "浙江大学",
                    "name_en": "Zhejiang University",
                    "logo": "../imgs/浙江大学.png",
                    "url": "#"
                },
                {
                    "id": 5,
                    "name": "北京航空航天大学",
                    "name_en": "Beihang University",
                    "logo": "../imgs/北京航空航天大学.png",
                    "url": "#"
                },
                {
                    "id": 6,
                    "name": "西安电子科技大学",
                    "name_en": "Xidian University",
                    "logo": "../imgs/西安电子科技大学.png",
                    "url": "#"
                },
                {
                    "id": 7,
                    "name": "中国传媒大学",
                    "name_en": "Communication University of China",
                    "logo": "../imgs/中国传媒大学.png",
                    "url": "#"
                },
                {
                    "id": 8,
                    "name": "西北工业大学",
                    "name_en": "Northwestern Polytechnical University",
                    "logo": "../imgs/西北工业大学.png",
                    "url": "#"
                },
                {
                    "id": 9,
                    "name": "成都信息工程大学",
                    "name_en": "Chengdu University of Information Technology",
                    "logo": "../imgs/成都信息工程大学.png",
                    "url": "#"
                },
                {
                    "id": 10,
                    "name": "西安邮电大学",
                    "name_en": "Xi'an University of Posts and Telecommunications",
                    "logo": "../imgs/西安邮电大学.png",
                    "url": "#"
                },
                {
                    "id": 11,
                    "name": "马克斯·普朗克研究所",
                    "name_en": "Max Planck Institute",
                    "logo": "../imgs/max planck.png",
                    "url": "#"
                },
                {
                    "id": 12,
                    "name": "英国国家计算机动画中心",
                    "name_en": "National Centre for Computer Animation",
                    "logo": "../imgs/英国国家计算机动画中心.png",
                    "url": "#"
                }
            ]
        };
        
        // 初始渲染
        renderAllSections();
        
        // 设置加载更多按钮的点击事件
        setupLoadMoreButtons();
        
        // 监听语言切换
        document.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            renderAllSections();
        });
    } catch (error) {
        console.error('加载研究方向数据失败:', error);
    }
}

// 设置加载更多按钮
function setupLoadMoreButtons() {
    document.getElementById('load-more-research').addEventListener('click', () => {
        researchPage++;
        renderResearchAreas();
    });
}

// 渲染所有部分
function renderAllSections() {
    researchPage = 1;
    
    renderResearchAreas();
    renderPartners();
}

// 渲染研究领域
function renderResearchAreas() {
    if (!researchData) return;
    
    const researchList = document.getElementById('research-areas-list');
    let researchAreas = [...researchData.research_areas];
    
    // 计算当前页应显示的研究领域
    const startIndex = 0;
    const endIndex = researchPage * researchItemsPerPage;
    const displayedAreas = researchAreas.slice(startIndex, endIndex);
    
    // 清空列表并重新渲染
    researchList.innerHTML = '';
    
    // 渲染研究领域
    displayedAreas.forEach(area => {
        const areaHTML = createResearchAreaHTML(area);
        researchList.innerHTML += areaHTML;
    });
    
    // 控制"加载更多"按钮的显示
    const loadMoreButton = document.getElementById('load-more-research');
    if (researchAreas.length <= endIndex) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-flex';
    }
}

// 创建研究领域HTML
function createResearchAreaHTML(area) {
    const title = currentLang === 'zh' ? area.title : area.title_en;
    const desc = currentLang === 'zh' ? area.desc : area.desc_en;
    
    // 创建列表项HTML
    let itemsHTML = '';
    area.items.forEach(item => {
        const itemText = currentLang === 'zh' ? item.text : item.text_en;
        itemsHTML += `<li>${itemText}</li>`;
    });
    
    // 创建"了解更多"文本
    const learnMoreText = currentLang === 'zh' ? '了解更多' : 'Learn More';
    
    return `
        <div class="research-card">
            <div class="research-icon ${area.icon_bg} ${area.icon_color}">
                <i class="${area.icon}"></i>
            </div>
            <h3 class="research-title">${title}</h3>
            <p class="research-desc">
                ${desc}
            </p>
            <ul class="research-list">
                ${itemsHTML}
            </ul>
            <a href="${area.link}" class="research-link">
                <span>${learnMoreText}</span> <i class="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
    `;
}

// 渲染合作伙伴
function renderPartners() {
    if (!researchData) return;
    
    const partnersList = document.getElementById('partners-list');
    let partners = [...researchData.partners];
    
    // 清空列表并重新渲染
    partnersList.innerHTML = '';
    
    // 渲染所有合作伙伴
    partners.forEach(partner => {
        const partnerHTML = createPartnerHTML(partner);
        partnersList.innerHTML += partnerHTML;
    });
}

// 创建合作伙伴HTML
function createPartnerHTML(partner) {
    const name = currentLang === 'zh' ? partner.name : partner.name_en;
    
    return `
        <div class="partner-card">
            <a href="${partner.url}" class="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center justify-center h-32">
                    <img src="${partner.logo}" alt="${name}" class="w-64 object-contain">
                </div>
            </a>
        </div>
    `;
}

// 当页面加载完成时初始化
document.addEventListener('DOMContentLoaded', initResearchData); 