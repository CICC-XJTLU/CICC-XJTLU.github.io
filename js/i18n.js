const translations = {
    zh: {
        // 导航
        'nav-home': '首页',
        'nav-research': '研究方向',
        'nav-team': '团队成员',
        'nav-publications': '科研成果',
        'nav-contact': '联系我们',
        'language': '语言',
        
        // 首页
        'hero-title': '突破人工智能与人机共融的瓶颈',
        'hero-subtitle': '我们致力于探索认知智能与创意计算的前沿技术，创造更智能、更自然的人机共融体验。',
        'btn-learn-more': '了解研究方向',
        'btn-contact': '联系我们',
        
        // 实验室概览
        'overview-title': '实验室概览',
        'intelligent-interaction-title': '智能交互',
        'intelligent-interaction-desc': '研究自然、直观的人机交互方式，结合人工智能技术提升用户体验。',
        'cognitive-computing-title': '认知计算',
        'cognitive-computing-desc': '探索机器学习和认知科学的交叉领域，构建更智能的计算模型。',
        'ar-title': '增强现实',
        'ar-desc': '开发AR/VR技术，创造沉浸式交互体验，拓展人机交互的边界。',
        'view-more': '查看更多',

        // 研究亮点
        'highlights-title': '研究亮点',
        'highlight-1-title': '智能交互系统',
        'highlight-1-desc': '我们开发了一套基于多模态输入的智能交互系统，能够理解用户的语音、手势和面部表情，提供自然流畅的交互体验。',
        'highlight-2-title': '认知辅助技术',
        'highlight-2-desc': '我们正在研发针对特殊人群的认知辅助技术，通过AI算法分析用户行为模式，提供个性化的辅助建议。',
        'learn-more': '了解更多',

        // 最新动态
        'news-title': '最新动态',
        'news-1-month': '六月',
        'news-1-day': '15',
        'news-1-title': '实验室论文被SIGCHI 2023接收',
        'news-1-desc': '我们的研究成果《基于深度学习的情感识别交互系统》被SIGCHI 2023会议接收。',
        'news-2-month': '五月',
        'news-2-day': '28',
        'news-2-title': '实验室获得国家自然科学基金项目',
        'news-2-desc': '我们的项目《多模态人机交互中的认知计算研究》获得国家自然科学基金支持。',
        'news-3-month': '四月',
        'news-3-day': '10',
        'news-3-title': '实验室与科技公司建立产学研合作',
        'news-3-desc': '我们与领先的AI科技公司建立了产学研合作关系，共同推进人机交互技术的落地应用。',
        'view-details': '查看详情',
        'more-news': '查看更多动态',

        // 加入我们
        'join-us-title': '加入我们',
        'join-us-desc': '我们始终欢迎对认知智能与创意计算充满热情的优秀人才加入。无论您是研究生、博士生还是博士后，都可以在这里找到施展才华的舞台。',
        'view-team': '查看团队',

        // 页脚
        'footer-desc': '致力于探索认知智能与创意计算的前沿技术，创造更智能、更自然的人机交互体验。',
        'quick-links': '快速链接',
        'contact-info': '联系方式',
        'address': '苏州市工业园区独墅湖科教创新区仁爱路111号',
        'email': 'yushan.pan@ieee.org',
        'phone': '+86 10-12345678',
        'newsletter': '订阅最新动态',
        'newsletter-desc': '订阅我们的通讯，获取实验室最新动态和研究成果。',
        'email-placeholder': '您的邮箱地址',
        'copyright': '© 2023 HCI-AI Lab. 保留所有权利。',
        
        // 语言切换
        'switch-lang': '切换语言',

        // 研究页面
        'research-page-title': '研究方向',
        'research-page-subtitle': '探索认知智能与创意计算的前沿领域',
        'research-overview-title': '研究领域概览',
        'research-overview-desc': '我们的研究涵盖认知智能与创意计算的多个前沿领域，致力于开发更智能、更自然的交互技术，推动人机协同的发展。',
        
        // 多模态交互
        'multimodal-title': '多模态交互',
        'multimodal-desc': '研究语音、手势、表情等多模态输入方式，开发自然、直观的人机交互系统。主要包括：',
        'multimodal-item-1': '多模态信号处理与融合',
        'multimodal-item-2': '情感计算与交互',
        'multimodal-item-3': '自然语言理解与生成',
        'multimodal-item-4': '手势识别与追踪',
        'multimodal-research-title': '多模态交互研究',
        'multimodal-research-desc': '我们致力于开发能够理解和响应人类自然交互方式的智能系统。通过整合语音、手势、面部表情等多种输入模态，创造更自然、更直观的人机交互体验。',
        
        // 智能界面
        'interface-title': '智能界面',
        'interface-desc': '设计和开发智能化的用户界面，提供个性化、自适应的交互体验。主要包括：',
        'interface-item-1': '自适应界面设计',
        'interface-item-2': '个性化推荐系统',
        'interface-item-3': '智能交互助手',
        'interface-item-4': '用户行为分析',
        'interface-research-title': '智能界面研究',
        'interface-research-desc': '探索新一代智能用户界面，通过机器学习和人工智能技术，为用户提供个性化、自适应的交互体验。',
        
        // 虚拟与增强现实
        'vr-ar-title': '虚拟现实与仿真',
        'vr-ar-desc': '探索VR技术和计算机仿真在人机交互中的应用，创造沉浸式体验。主要包括：',
        'vr-ar-item-1': '3D交互技术',
        'vr-ar-item-2': '混合现实环境',
        'vr-ar-item-3': '空间定位与追踪',
        'vr-ar-item-4': '虚拟场景构建',
        'vr-ar-research-title': '虚拟现实与仿真研究',
        'vr-ar-research-desc': '开发先进的VR技术和计算机仿真，创造身临其境的交互体验，探索虚拟和现实世界的无缝融合。',
        '3d-interaction-title': '3D交互',
        '3d-interaction-desc': '研究虚拟环境中的自然交互方式和技术。',
        'mixed-reality-title': '混合现实',
        'mixed-reality-desc': '探索虚拟内容与现实环境的自然融合。',

        // 人机协同研究
        'collaboration-research-title': '人机协同研究',
        'collaboration-research-desc': '研究人类与AI系统的协同工作方式，提高协作效率和质量。我们致力于开发能够与人类有效协作的智能系统，实现人与AI的优势互补。',
        'hybrid-intelligence-title': '混合智能系统',
        'hybrid-intelligence-desc': '开发结合人类智能和机器智能的混合系统，实现更高效的问题解决。',
        'collaborative-decision-title': '协作决策支持',
        'collaborative-decision-desc': '研究AI辅助人类决策的方法和技术，提高决策质量和效率。',
        
        // 大模型研究
        'llm-research-title': '大模型研究',
        'llm-research-desc': '研究大型语言模型在人机交互中的应用，探索更智能的交互方式。通过结合大模型的能力，我们致力于创造更具自然语言理解能力的交互系统。',
        'llm-dialogue-title': '基于LLM的对话系统',
        'llm-dialogue-desc': '开发基于大型语言模型的对话系统，实现更自然、更流畅的人机对话。',
        'collaborative-creation-title': '人机协同内容创作',
        'collaborative-creation-desc': '探索人类与AI系统协同创作的新模式，提升创作效率和质量。',

        // 具体技术
        'voice-interaction-title': '语音交互',
        'voice-interaction-desc': '开发智能语音识别和理解系统，支持自然语言对话。',
        'gesture-recognition-title': '手势识别',
        'gesture-recognition-desc': '研究手势追踪和识别技术，实现直观的空间交互。',
        'smart-recommendation-title': '智能推荐',
        'smart-recommendation-desc': '基于用户行为和偏好的个性化内容推荐系统。',
        'adaptive-interface-title': '自适应界面',
        'adaptive-interface-desc': '根据用户习惯和场景自动调整的智能界面系统。',

        // 研究项目
        'representative-projects': '代表性研究项目',
        'nsfc-grant': '国家自然科学基金',
        'industry-project': '企业合作项目',
        'project-1-title': '多模态情感计算与交互系统',
        'project-1-desc': '基于深度学习的多模态情感识别技术，实现智能人机情感交互，提升用户体验。',
        'project-1-period': '2022-2025',
        'project-2-title': '智能AR辅助系统',
        'project-2-desc': '开发基于AR技术的智能辅助系统，为工业生产和日常生活提供直观的信息展示和交互方式。',
        'project-2-period': '2023-2024',
        
        // 合作伙伴
        'partners': '合作伙伴',
        'partners-desc': '我们与国内外多家高校、研究机构和企业建立了长期的合作关系，共同推进认知智能与创意计算技术的发展。',
        'research-partners-title': '合作伙伴',
        'research-partners-desc': '我们与国内外多家高校、研究机构和企业建立了长期的合作关系，共同推进认知智能与创意计算技术的发展。',

        // 团队页面
        'team-page-title': '团队成员',
        'team-page-subtitle': '凝聚优秀人才，共创智能未来',
        'advisors-title': '指导教师',
        'graduate-team-title': '研究生团队',
        
        // 导师信息
        'prof-zhang-name': '陈扬斌',
        'prof-zhang-title': 'Assistant Professor',
        'prof-zhang-desc': '陈扬斌博士是西交利物浦大学计算机系助理教授，获香港城市大学计算机科学博士学位，中国科学技术大学自动化学士学位。他曾在医疗科技创业公司担任机器学习副总裁，拥有丰富的产业经验。研究领域包括小样本学习、语音语言处理和医疗健康领域的机器智能应用，在顶级国际期刊发表多篇论文，主持多项国家级和省部级科研项目，获得多项专利授权。',
        
        'prof-li-name': '潘昱杉',
        'prof-li-title': 'Assistant Professor',
        'prof-li-desc': '潘昱杉博士（IEEE会员M\'22，高级会员SM\'24）出生并成长于西安，于2022年加入西交利物浦大学，专注于人机计算与软件工程交叉领域研究。曾在挪威生活工作12年，先后任职于奥斯陆大学、挪威科技大学和参数技术公司。研究方向包括人机交互、软件工程和人工智能，已在IEEE、ACM等顶级期刊和会议发表多篇高水平论文，主持多项国际合作项目，是多个国际学术组织活跃成员。',
        
        'prof-wang-name': '王懿鸿',
        'prof-wang-title': 'Assistant Professor',
        'prof-wang-desc': '王懿鸿博士是西交利物浦大学计算机系助理教授，研究聚焦人机/人机器人交互(HCI/HRI)领域，专注于众包计算、基于位置的游戏和数字用户行为建模。在多个顶级期刊和会议发表研究成果，包括ACM人机交互会议(CHI)和计算机支持的协作工作与社会计算(CSCW)等。获得多项科研项目资助，与国内外多家高校和企业建立合作关系，在交互设计和用户体验优化方面拥有丰富经验。',
        
        'prof-xiang-name': '项南',
        'prof-xiang-title': 'Assistant Professor',
        'prof-xiang-desc': '项南博士现为西交利物浦大学计算机系助理教授，2021年获英国伯恩茅斯大学国家计算机动画中心(NCCA)计算机动画博士学位。在学术生涯前，他在动画和视觉特效行业担任技术职务，曾领导3D动画电影制作技术团队，并担任多部好莱坞大片的管道技术总监。研究方向包括计算机图形学、计算机动画和虚拟现实，在数字媒体内容创作和交互式图形系统方面拥有独特专长。',
        
        'prof-haiyang-name': '张海洋',
        'prof-haiyang-title': 'Assistant Professor',
        'prof-haiyang-desc': '张海洋博士是西交利物浦大学计算机系助理教授，获吉林大学学士学位和爱尔兰利默里克大学博士学位，专攻推荐系统研究并获得全额奖学金。2018-2021年担任谢菲尔德大学研究助理，深化数据驱动研究方法专长。研究方向包括数据挖掘、用户建模和个性化推荐系统，在自适应学习系统和社交媒体分析方面有丰富经验，已在ACM和IEEE顶级期刊会议发表多篇论文，与多家企业开展推荐系统应用合作。',
        
        'prof-xu-name': '许志杰',
        'prof-xu-title': '计算机系主任',
        'prof-xu-desc': '许志杰教授最近加入西交利物浦大学先进科技学院担任计算机系主任。在加入西浦前，他在英国哈德斯菲尔德大学担任视觉计算领域的全职教授。研究专长包括视觉计算、计算机视觉和人工智能，在多媒体信息处理和智能系统领域取得重要成果。发表百余篇高水平论文，主持多项国际合作科研项目，获得多项技术专利，担任多个国际期刊编委和学术会议主席，在产学研合作方面拥有丰富经验。',
        
        // 团队分类
        'team-filter-all': '全部',
        'team-filter-phd': '博士生',
        'team-filter-master': '硕士生',
        'team-filter-ra': '研究助理',
        'team-filter-visitor': '访问学者',
        
        // 学生信息
        'student-zhang-name': '张子岳',
        'student-zhang-title': '博士研究生',
        'student-zhang-research': '研究方向：CSCW',
        
        'student-li-name': '欧阳元兵',
        'student-li-title': '访问学者',
        'student-li-research': '研究方向：大模型、可穿戴设备',
        
        'student-wang-name': 'Daniel Yang',
        'student-wang-title': '访问学者',
        'student-wang-research': '研究方向：',
        
        'student-he-name': '贺晓江',
        'student-he-title': '研究助理',
        'student-he-research': '研究方向：情感计算、多模态',
        
        'student-li-q-name': '黎秋宇',
        'student-li-q-title': '博士研究生',
        'student-li-q-research': '研究方向：多模态、大模型',
        
        'student-zhao-name': '赵同学',
        'student-zhao-title': '硕士研究生',
        'student-zhao-research': '研究方向：增强现实技术',
        
        // 新增学生
        'student-zhang-j-name': '张吉儿',
        'student-zhang-j-title': '博士研究生',
        'student-zhang-j-research': '研究方向：三维重建',
        
        'student-gao-name': '高一凡',
        'student-gao-title': '博士研究生',
        'student-gao-research': '研究方向：多模态、情感计算、大模型',
        
        'student-xu-h-name': '徐豪谡',
        'student-xu-h-title': '研究生',
        'student-xu-h-research': '研究方向：HCI、CSCW',
        
        // 加入我们
        'join-section-title': '加入我们',
        'join-section-desc': '我们正在寻找对认知智能与创意计算充满热情的优秀人才。如果您有兴趣加入我们的团队，请查看以下招生信息。',
        'graduate-admission-title': '研究生招生',
        'load-more': '加载更多',

        // 加入我们部分新增
        'postdoc-title': '博士后招收',
        'postdoc-desc': '常年招收博士后研究人员，提供具有竞争力的待遇和良好的科研环境。',
        'graduate-admission-desc': '每年招收博士生2-3名，硕士生4-5名。欢迎具有计算机、人工智能等相关背景的同学报考。',
        'contact-us-btn': '联系我们',
        
        // 底部菜单新增
        'lab-name': '认知智能与创意计算研究中心',
        'lab-footer-desc': '致力于探索认知智能与创意计算的前沿技术，创造更智能、更自然的人机共融体验。',
        'footer-links': '快速链接',
        'footer-contact': '联系方式',
        'footer-newsletter': '订阅最新动态',
        'footer-newsletter-desc': '订阅我们的通讯，获取实验室最新动态和研究成果。',
        'footer-email-placeholder': '您的邮箱地址',
        'footer-copyright': '© 2023 认知智能与创意计算研究中心. 保留所有权利.',

        // 科研成果页面
        'publications-page-title': '科研成果',
        'publications-page-subtitle': '展示我们在认知智能与创意计算领域的最新研究成果',
        
        // 成果统计
        'papers-count': '论文发表',
        'patents-count': '专利授权',
        'projects-count': '科研项目',
        'tech-transfer-count': '技术转化',
        
        // 论文发表
        'publications-title': '论文发表',
        'filter-all': '全部',
        'filter-year': '{year}年',
        'paper-pdf': 'PDF',
        'paper-doi': 'DOI',
        'paper-code': '代码',
        'load-more': '加载更多',
        
        // 论文1
        'paper-1-title': '基于深度学习的多模态情感识别研究',
        'paper-1-authors': '张三, 李四, 王五',
        'paper-1-journal': 'IEEE Transactions on Human-Machine Systems',
        'paper-1-tag-1': 'SCI',
        'paper-1-tag-2': 'IF: 5.6',
        
        // 论文2
        'paper-2-title': '智能人机交互中的注意力机制研究',
        'paper-2-authors': '李四, 王五, 赵六',
        'paper-2-journal': 'ACM Conference on Human Factors in Computing Systems (CHI 2023)',
        'paper-2-tag-1': 'CCF-A',
        'paper-2-tag-2': '最佳论文',
        
        // 论文3
        'paper-3-title': 'AR环境下的自然手势交互技术研究',
        'paper-3-authors': '王五, 张三, 李四',
        'paper-3-journal': 'IEEE Virtual Reality Conference (VR 2022)',
        'paper-3-tag-1': 'CCF-A',
        
        // 专利与获奖
        'patents-awards-title': '专利与获奖',
        'patents-title': '发明专利',
        'patent-1-title': '一种基于深度学习的手势识别方法',
        'patent-1-number': '专利号：CN123456789A',
        'patent-1-inventors': '发明人：张三, 李四',
        'patent-status-granted': '已授权',
        
        // 专利2
        'patent-2-title': '一种智能人机交互系统及其实现方法',
        'patent-2-number': '专利号：CN987654321A',
        'patent-2-inventors': '发明人：王五, 赵六',
        
        // 获奖情况
        'awards-title': '获奖情况',
        'award-1-title': '国家科技进步二等奖',
        'award-1-desc': '智能人机交互关键技术及应用',
        'award-1-year': '2023年',
        'award-2-title': 'CCF科学技术创新奖',
        'award-2-desc': '多模态情感计算技术创新',
        'award-2-year': '2022年',
        
        // 技术转化
        'tech-transfer-title': '技术转化',
        'tech-transfer-subtitle': '我们致力于将研究成果转化为实际应用，为产业发展提供技术支持。',
        
        'transform-1-title': '智能交互系统',
        'transform-1-desc': '为某大型企业开发的智能人机交互系统，提高了生产效率30%。',
        'transform-1-year': '2023年',
        'transform-1-learn-more': '了解更多',
        
        'transform-2-title': 'AR导航系统',
        'transform-2-desc': '开发的AR导航系统已在多个商场和展馆成功部署。',
        'transform-2-year': '2022年',
        'transform-2-learn-more': '了解更多',
        
        'transform-3-title': '情感计算平台',
        'transform-3-desc': '研发的情感计算平台已服务超过100家企业客户。',
        'transform-3-year': '2022年',
        'transform-3-learn-more': '了解更多',

        // 联系页面
        'contact-page-title': '联系我们',
        'contact-page-subtitle': '欢迎与我们交流合作',
        'lab-address-title': '实验室地址',
        'lab-address-info': '苏州市工业园区独墅湖科教创新区仁爱路111号',
        'view-map': '查看地图',
        'contact-info-title': '联系方式',
        'contact-info-details': '联系人：Prof. Zhijie Xu\n邮箱：yushan.pan@ieee.org',
        'send-email': '发送邮件',
        'social-media-title': '社交媒体',
        'follow-us': '关注我们',
        
        // FAQ部分
        'faq-title': '常见问题',
        'faq-1-question': '如何申请加入实验室？',
        'faq-1-answer': '我们欢迎优秀的学生加入我们的实验室。申请流程如下：',
        'faq-1-item-1': '准备你的简历和研究计划',
        'faq-1-item-2': '发送申请材料到实验室邮箱',
        'faq-1-item-3': '等待面试通知',
        'faq-1-item-4': '参加面试并等待结果',
        'faq-2-question': '实验室提供实习机会吗？',
        'faq-2-answer': '是的，我们定期招募实习生。实习生可以参与实验室的研究项目并获得实践经验。请关注我们的官方网站或社交媒体以获取具体的实习机会。',
        'faq-3-question': '如何与实验室合作？',
        'faq-3-answer': '我们欢迎与企业、大学和研究机构的合作。您可以通过以下方式与我们联系：',
        'faq-3-item-1': '发送合作意向邮件',
        'faq-3-item-2': '在网站上填写联系表单',
        'faq-3-item-3': '直接联系实验室主任',
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-research': 'Research',
        'nav-team': 'Team',
        'nav-publications': 'Publications',
        'nav-contact': 'Contact',
        'language': 'Language',
        
        // Home
        'hero-title': 'Breaking Bottlenecks in AI and Human-Machine Harmony',
        'hero-subtitle': 'We are dedicated to exploring cutting-edge technologies in Cognitive Intelligence and Creative Computing, creating smarter and more natural human-machine harmony experiences.',
        'btn-learn-more': 'Learn More',
        'btn-contact': 'Contact Us',
        
        // Lab Overview
        'overview-title': 'Lab Overview',
        'intelligent-interaction-title': 'Intelligent Interaction',
        'intelligent-interaction-desc': 'Research on natural and intuitive human-computer interaction methods, enhancing user experience with AI technology.',
        'cognitive-computing-title': 'Cognitive Computing',
        'cognitive-computing-desc': 'Exploring the intersection of machine learning and cognitive science to build smarter computational models.',
        'ar-title': 'Augmented Reality',
        'ar-desc': 'Developing AR/VR technologies to create immersive interactive experiences and expand the boundaries of HCI.',
        'view-more': 'View More',

        // Research Highlights
        'highlights-title': 'Research Highlights',
        'highlight-1-title': 'Intelligent Interaction System',
        'highlight-1-desc': 'We have developed an intelligent interaction system based on multimodal input that can understand user\'s voice, gestures, and facial expressions, providing natural and smooth interaction experience.',
        'highlight-2-title': 'Cognitive Assistance Technology',
        'highlight-2-desc': 'We are developing cognitive assistance technology for special groups, providing personalized assistance suggestions through AI algorithms analyzing user behavior patterns.',
        'learn-more': 'Learn More',

        // Latest News
        'news-title': 'Latest News',
        'news-1-month': 'June',
        'news-1-day': '15',
        'news-1-title': 'Lab Paper Accepted by SIGCHI 2023',
        'news-1-desc': 'Our research paper "Deep Learning-Based Emotion Recognition Interaction System" has been accepted by SIGCHI 2023.',
        'news-2-month': 'May',
        'news-2-day': '28',
        'news-2-title': 'Lab Receives NSFC Grant',
        'news-2-desc': 'Our project "Research on Cognitive Computing in Multimodal Human-Computer Interaction" has received support from the National Natural Science Foundation of China.',
        'news-3-month': 'April',
        'news-3-day': '10',
        'news-3-title': 'Lab Establishes Industry-Academia Partnership',
        'news-3-desc': 'We have established partnerships with leading AI technology companies to promote the application of human-computer interaction technology.',
        'view-details': 'View Details',
        'more-news': 'View More News',

        // Join Us
        'join-us-title': 'Join Us',
        'join-us-desc': 'We always welcome talented individuals who are passionate about Cognitive Intelligence and Creative Computing. Whether you are a graduate student, doctoral student, or post-doctoral researcher, you can find a stage to showcase your talents here.',
        'view-team': 'View Team',

        // Footer
        'footer-desc': 'Dedicated to exploring cutting-edge technologies in Cognitive Intelligence and Creative Computing, creating smarter and more natural human-machine harmony experiences.',
        'quick-links': 'Quick Links',
        'contact-info': 'Contact Info',
        'address': '111 Renai Road, Dushu Lake Science and Education Innovation District, Industrial Park, Suzhou',
        'email': 'yushan.pan@ieee.org',
        'phone': '+86 10-12345678',
        'newsletter': 'Newsletter',
        'newsletter-desc': 'Subscribe to our newsletter to receive the latest updates and research results from our lab.',
        'email-placeholder': 'Your email address',
        'copyright': '© 2023 HCI-AI Lab. All rights reserved.',
        
        // Language Switch
        'switch-lang': 'Switch Language',

        // Research Page
        'research-page-title': 'Research Areas',
        'research-page-subtitle': 'Exploring the Frontiers of Cognitive Intelligence and Creative Computing',
        'research-overview-title': 'Research Overview',
        'research-overview-desc': 'Our research covers multiple cutting-edge areas in Cognitive Intelligence and Creative Computing, dedicated to developing smarter and more natural interaction technologies to advance human-computer collaboration.',
        
        // Multimodal Interaction
        'multimodal-title': 'Multimodal Interaction',
        'multimodal-desc': 'Research on multimodal input methods including voice, gesture, and expression, developing natural and intuitive human-computer interaction systems. Key areas include:',
        'multimodal-item-1': 'Multimodal Signal Processing and Fusion',
        'multimodal-item-2': 'Affective Computing and Interaction',
        'multimodal-item-3': 'Natural Language Understanding and Generation',
        'multimodal-item-4': 'Gesture Recognition and Tracking',
        'multimodal-research-title': 'Multimodal Interaction Research',
        'multimodal-research-desc': 'We are committed to developing intelligent systems that can understand and respond to natural human interaction methods. By integrating multiple input modalities such as voice, gesture, and facial expressions, we create more natural and intuitive human-computer interaction experiences.',
        
        // Intelligent Interface
        'interface-title': 'Intelligent Interface',
        'interface-desc': 'Design and development of intelligent user interfaces, providing personalized and adaptive interaction experiences. Key areas include:',
        'interface-item-1': 'Adaptive Interface Design',
        'interface-item-2': 'Personalized Recommendation Systems',
        'interface-item-3': 'Intelligent Interaction Assistants',
        'interface-item-4': 'User Behavior Analysis',
        'interface-research-title': 'Intelligent Interface Research',
        'interface-research-desc': 'Exploring next-generation intelligent user interfaces, providing personalized and adaptive interaction experiences through machine learning and artificial intelligence technologies.',
        
        // Virtual and Augmented Reality
        'vr-ar-title': 'Virtual Reality and Simulation',
        'vr-ar-desc': 'Exploring VR technologies and computer simulation in human-computer interaction, creating immersive experiences. Key areas include:',
        'vr-ar-item-1': '3D Interaction Technology',
        'vr-ar-item-2': 'Mixed Reality Environment',
        'vr-ar-item-3': 'Spatial Positioning and Tracking',
        'vr-ar-item-4': 'Virtual Scene Construction',
        'vr-ar-research-title': 'Virtual Reality and Simulation Research',
        'vr-ar-research-desc': 'Developing advanced VR technologies and computer simulation, creating immersive interaction experiences, and exploring seamless integration of virtual and real worlds.',
        '3d-interaction-title': '3D Interaction',
        '3d-interaction-desc': 'Researching natural interaction methods and technologies in virtual environments.',
        'mixed-reality-title': 'Mixed Reality',
        'mixed-reality-desc': 'Exploring natural integration of virtual content with real-world environments.',

        // Human-AI Collaboration Research
        'collaboration-research-title': 'Human-AI Collaboration Research',
        'collaboration-research-desc': 'Studying how humans and AI systems can work together to improve collaboration efficiency and quality. We are committed to developing intelligent systems that can effectively collaborate with humans, achieving complementary advantages.',
        'hybrid-intelligence-title': 'Hybrid Intelligence Systems',
        'hybrid-intelligence-desc': 'Developing systems that combine human and machine intelligence to achieve more efficient problem-solving.',
        'collaborative-decision-title': 'Collaborative Decision Support',
        'collaborative-decision-desc': 'Researching methods and technologies for AI-assisted human decision-making to improve decision quality and efficiency.',
        
        // Large Language Model Research
        'llm-research-title': 'Large Language Model Research',
        'llm-research-desc': 'Researching applications of large language models in human-computer interaction, exploring more intelligent interaction methods. By leveraging the capabilities of large models, we aim to create interaction systems with enhanced natural language understanding abilities.',
        'llm-dialogue-title': 'LLM-based Dialogue Systems',
        'llm-dialogue-desc': 'Developing dialogue systems based on large language models to achieve more natural and fluid human-computer conversations.',
        'collaborative-creation-title': 'Human-AI Collaborative Content Creation',
        'collaborative-creation-desc': 'Exploring new modes of collaborative creation between humans and AI systems to enhance creative efficiency and quality.',

        // Specific Technologies
        'voice-interaction-title': 'Voice Interaction',
        'voice-interaction-desc': 'Developing intelligent voice recognition and understanding systems, supporting natural language dialogue.',
        'gesture-recognition-title': 'Gesture Recognition',
        'gesture-recognition-desc': 'Researching gesture tracking and recognition technologies for intuitive spatial interaction.',
        'smart-recommendation-title': 'Smart Recommendation',
        'smart-recommendation-desc': 'Personalized content recommendation system based on user behavior and preferences.',
        'adaptive-interface-title': 'Adaptive Interface',
        'adaptive-interface-desc': 'Intelligent interface system that automatically adjusts based on user habits and scenarios.',

        // Research Projects
        'representative-projects': 'Representative Projects',
        'nsfc-grant': 'National Natural Science Foundation of China',
        'industry-project': 'Industry Collaboration Project',
        'project-1-title': 'Multimodal Affective Computing and Interaction System',
        'project-1-desc': 'Developing multimodal emotion recognition technology based on deep learning to achieve intelligent human-computer emotional interaction and enhance user experience.',
        'project-1-period': '2022-2025',
        'project-2-title': 'Intelligent AR Assistance System',
        'project-2-desc': 'Developing an intelligent assistance system based on AR technology to provide intuitive information display and interaction methods for industrial production and daily life.',
        'project-2-period': '2023-2024',
        
        // Partners
        'partners': 'Partners',
        'partners-desc': 'We have established long-term partnerships with universities, research institutions, and enterprises both domestically and internationally to jointly advance the development of Cognitive Intelligence and Creative Computing technology.',
        'research-partners-title': 'Partners',
        'research-partners-desc': 'We have established long-term partnerships with universities, research institutions, and enterprises both domestically and internationally to jointly advance the development of Cognitive Intelligence and Creative Computing technology.',

        // Team Page
        'team-page-title': 'Our Team',
        'team-page-subtitle': 'Bringing Together Talents, Creating an Intelligent Future',
        'advisors-title': 'Faculty Advisors',
        'graduate-team-title': 'Graduate Students',
        
        // Faculty Information
        'prof-zhang-name': 'Yangbin Chen',
        'prof-zhang-title': 'Assistant Professor',
        'prof-zhang-desc': 'Dr. Yangbin Chen is an Assistant Professor in the Department of Computing at Xi\'an Jiaotong-Liverpool University. He obtained his Ph.D. in Computer Science from City University of Hong Kong and B.Eng. in Automation from University of Science and Technology of China. Prior to academia, he worked as VP of Machine Learning at a medical technology startup. His research focuses on few-shot learning, spoken language processing, and machine intelligence in healthcare applications. He has published multiple papers in top-tier international journals, led several national and provincial research projects, and holds multiple patents.',
        
        'prof-li-name': 'Yushan Pan',
        'prof-li-title': 'Assistant Professor',
        'prof-li-desc': 'Dr. Yushan Pan (IEEE Member M\'22, Senior Member SM\'24), born and raised in Xi\'an, joined XJTLU in 2022, focusing on research at the intersection of human-centric computing and software engineering. He spent 12 years living and working in Norway, with positions at University of Oslo, Norwegian University of Science and Technology, and Parametric Technology Corporation. His research interests include human-computer interaction, software engineering, and artificial intelligence. He has published numerous high-impact papers in IEEE and ACM journals and conferences, led multiple international collaborative projects, and is an active member of several international academic organizations.',
        
        'prof-wang-name': 'Yihong Wang',
        'prof-wang-title': 'Assistant Professor',
        'prof-wang-desc': 'Dr. Wang is an Assistant Professor in the Department of Computing at Xi\'an Jiaotong-Liverpool University, focusing on Human-Computer/Robot Interaction (HCI/HRI) with specialization in crowdsourcing, location-based games, and digital user behavior modeling. He has published in top-tier journals and conferences including ACM Conference on Human Factors in Computing Systems (CHI) and Computer-Supported Cooperative Work and Social Computing (CSCW). He has secured multiple research grants and established collaborations with universities and enterprises worldwide, bringing extensive experience in interaction design and user experience optimization.',
        
        'prof-xiang-name': 'Nan Xiang',
        'prof-xiang-title': 'Assistant Professor',
        'prof-xiang-desc': 'Dr. Nan Xiang is an Assistant Professor in the Department of Computing at Xi\'an Jiaotong-Liverpool University. He obtained his PhD in Computer Animation from the National Centre for Computer Animation (NCCA), Bournemouth University in 2021. Before his academic career, he worked in the animation and VFX industry, where he led a technical team in 3D animation film production and served as a pipeline technical director for several Hollywood feature films. His research interests include computer graphics, computer animation, and virtual reality, with unique expertise in digital media content creation and interactive graphics systems.',
        
        'prof-haiyang-name': 'Haiyang Zhang',
        'prof-haiyang-title': 'Assistant Professor',
        'prof-haiyang-desc': 'Dr. Haiyang Zhang is an Assistant Professor in the Department of Computing at XJTLU. She holds a Bachelor\'s degree from Jilin University and a Ph.D. from the University of Limerick, where she specialized in Recommender Systems with full scholarship. From 2018 to 2021, she was a Research Associate at the University of Sheffield, deepening her expertise in data-driven methodologies. Her research interests include data mining, user modeling, and personalized recommendation systems, with extensive experience in adaptive learning systems and social media analytics. She has published numerous papers in top ACM and IEEE journals and conferences, and collaborates with various companies on recommender system applications.',
        
        'prof-xu-name': 'Zhijie Xu',
        'prof-xu-title': 'Head of Department of Computing',
        'prof-xu-desc': 'Professor Zhijie Xu recently joined XJTLU as the Head of the Department of Computing within the School of Advanced Technology. Before joining XJTLU, he was a full professor specializing in visual computing at the University of Huddersfield in the UK. His research expertise includes visual computing, computer vision, and artificial intelligence, with significant contributions to multimedia information processing and intelligent systems. He has published over a hundred high-quality papers, led multiple international research projects, obtained numerous technical patents, served on editorial boards of international journals, chaired academic conferences, and has extensive experience in industry-academia collaboration.',
        
        // Team Categories
        'team-filter-all': 'All',
        'team-filter-phd': 'Ph.D. Students',
        'team-filter-master': 'Master Students',
        'team-filter-ra': 'Research Assistants',
        'team-filter-visitor': 'Visiting Scholars',
        
        // Student Information
        'student-zhang-name': 'Ziyue Zhang',
        'student-zhang-title': 'Ph.D. Student',
        'student-zhang-research': 'Research: CSCW',
        
        'student-li-name': 'Yuanbing Ouyang',
        'student-li-title': 'Visiting Scholar',
        'student-li-research': 'Research: Large Language Models, Wearable Devices',
        
        'student-wang-name': 'Daniel Yang',
        'student-wang-title': 'Visiting Scholar',
        'student-wang-research': 'Research: ',
        
        'student-he-name': 'Xiaojiang He',
        'student-he-title': 'Research Assistant',
        'student-he-research': 'Research: Affective Computing, Multimodal',
        
        'student-li-q-name': 'Qiuyu Li',
        'student-li-title': 'Ph.D. Student',
        'student-li-q-research': 'Research: Multimodal, Large Language Models',
        
        'student-zhao-name': 'Zihan Zhao',
        'student-zhao-title': 'Master Student',
        'student-zhao-research': 'Research: Augmented Reality Technology',
        
        // New Students
        'student-zhang-j-name': 'Jier Zhang',
        'student-zhang-j-title': 'Ph.D. Student',
        'student-zhang-j-research': 'Research: 3D Reconstruction',
        
        'student-gao-name': 'Yifan Gao',
        'student-gao-title': 'Ph.D. Student',
        'student-gao-research': 'Research: Multimodal, Affective Computing, Large Language Models',
        
        'student-xu-h-name': 'Haosu Xu',
        'student-xu-h-title': 'Master Student',
        'student-xu-h-research': 'Research: HCI, CSCW',
        
        // Join Us
        'join-section-title': 'Join Us',
        'join-section-desc': 'We are looking for talented individuals who are passionate about Cognitive Intelligence and Creative Computing. If you are interested in joining our team, please check the following admission information.',
        'graduate-admission-title': 'Graduate Admission',
        'load-more': 'Load More',

        // Join Us Section Additions
        'postdoc-title': 'Post-doctoral Recruitment',
        'postdoc-desc': 'We continuously recruit post-doctoral researchers, offering competitive benefits and an excellent research environment.',
        'graduate-admission-desc': 'We recruit 2-3 Ph.D. students and 4-5 Master students annually. Students with backgrounds in Computer Science, AI, and related fields are welcome to apply.',
        'view-details': 'View Details',
        'contact-us-btn': 'Contact Us',
        
        // Footer Menu Additions
        'lab-name': 'Center for Cognitive Intelligence and Creative Computing',
        'lab-footer-desc': 'Dedicated to exploring cutting-edge technologies in Cognitive Intelligence and Creative Computing, creating smarter and more natural human-machine harmony experiences.',
        'footer-links': 'Quick Links',
        'footer-contact': 'Contact Information',
        'footer-newsletter': 'Newsletter',
        'footer-newsletter-desc': 'Subscribe to our newsletter to receive the latest updates and research results from our lab.',
        'footer-email-placeholder': 'Your email address',
        'footer-copyright': '© 2023 Center for Cognitive Intelligence and Creative Computing. All Rights Reserved.',

        // Publications Page
        'publications-page-title': 'Publications',
        'publications-page-subtitle': 'Showcasing our latest research achievements in Cognitive Intelligence and Creative Computing',
        
        // Statistics
        'papers-count': 'Papers Published',
        'patents-count': 'Patents Granted',
        'projects-count': 'Research Projects',
        'tech-transfer-count': 'Tech Transfers',
        
        // Publications
        'publications-title': 'Publications',
        'filter-all': 'All',
        'filter-year': '{year}',
        'paper-pdf': 'PDF',
        'paper-doi': 'DOI',
        'paper-code': 'Code',
        'load-more': 'Load More',
        
        // Paper 1
        'paper-1-title': 'Deep Learning-Based Multimodal Emotion Recognition Research',
        'paper-1-authors': 'Zhang San, Li Si, Wang Wu',
        'paper-1-journal': 'IEEE Transactions on Human-Machine Systems',
        'paper-1-tag-1': 'SCI',
        'paper-1-tag-2': 'IF: 5.6',
        
        // Paper 2
        'paper-2-title': 'Research on Attention Mechanism in Intelligent Human-Computer Interaction',
        'paper-2-authors': 'Li Si, Wang Wu, Zhao Liu',
        'paper-2-journal': 'ACM Conference on Human Factors in Computing Systems (CHI 2023)',
        'paper-2-tag-1': 'CCF-A',
        'paper-2-tag-2': 'Best Paper',
        
        // Paper 3
        'paper-3-title': 'Research on Natural Gesture Interaction Technology in AR Environment',
        'paper-3-authors': 'Wang Wu, Zhang San, Li Si',
        'paper-3-journal': 'IEEE Virtual Reality Conference (VR 2022)',
        'paper-3-tag-1': 'CCF-A',
        
        // Patents and Awards
        'patents-awards-title': 'Patents and Awards',
        'patents-title': 'Patents',
        'patent-1-title': 'A Deep Learning-Based Gesture Recognition Method',
        'patent-1-number': 'Patent No.: CN123456789A',
        'patent-1-inventors': 'Inventors: Zhang San, Li Si',
        'patent-status-granted': 'Granted',
        
        // Patent 2
        'patent-2-title': 'An Intelligent Human-Computer Interaction System and Its Implementation Method',
        'patent-2-number': 'Patent No.: CN987654321A',
        'patent-2-inventors': 'Inventors: Wang Wu, Zhao Liu',
        
        // Awards
        'awards-title': 'Awards',
        'award-1-title': 'National Science and Technology Progress Award (Second Class)',
        'award-1-desc': 'Key Technologies and Applications in Intelligent Human-Computer Interaction',
        'award-1-year': '2023',
        'award-2-title': 'CCF Science and Technology Innovation Award',
        'award-2-desc': 'Innovation in Multimodal Affective Computing Technology',
        'award-2-year': '2022',
        
        // Technology Transfer
        'tech-transfer-title': 'Technology Transfer',
        'tech-transfer-subtitle': 'We are committed to transforming research results into practical applications, providing technical support for industrial development.',
        
        'transform-1-title': 'Intelligent Interaction System',
        'transform-1-desc': 'Developed an intelligent HCI system for a large enterprise, improving production efficiency by 30%.',
        'transform-1-year': '2023',
        'transform-1-learn-more': 'Learn More',
        
        'transform-2-title': 'AR Navigation System',
        'transform-2-desc': 'The AR navigation system has been successfully deployed in multiple shopping malls and exhibition halls.',
        'transform-2-year': '2022',
        'transform-2-learn-more': 'Learn More',
        
        'transform-3-title': 'Affective Computing Platform',
        'transform-3-desc': 'The developed affective computing platform has served over 100 enterprise clients.',
        'transform-3-year': '2022',
        'transform-3-learn-more': 'Learn More',

        // 联系页面
        'contact-page-title': 'Contact Us',
        'contact-page-subtitle': 'Welcome to get in touch',
        'lab-address-title': 'Lab Address',
        'lab-address-info': '111 Renai Road, Dushu Lake Science and Education Innovation District, Industrial Park, Suzhou',
        'view-map': 'View Map',
        'contact-info-title': 'Contact Information',
        'contact-info-details': 'Contact: Prof. Zhijie Xu\nEmail: yushan.pan@ieee.org',
        'send-email': 'Send Email',
        'social-media-title': 'Social Media',
        'follow-us': 'Follow Us',
        
        // FAQ部分
        'faq-title': 'Frequently Asked Questions',
        'faq-1-question': 'How to apply to join the lab?',
        'faq-1-answer': 'We welcome excellent students to join our lab. The application process is as follows:',
        'faq-1-item-1': 'Prepare your CV and research plan',
        'faq-1-item-2': 'Send application materials to the lab email',
        'faq-1-item-3': 'Wait for interview notification',
        'faq-1-item-4': 'Attend the interview and wait for results',
        'faq-2-question': 'Does the lab offer internship opportunities?',
        'faq-2-answer': 'Yes, we regularly recruit interns. Interns can participate in the lab\'s research projects and gain practical experience. Please follow our official website or social media for specific internship opportunities.',
        'faq-3-question': 'How to collaborate with the lab?',
        'faq-3-answer': 'We welcome cooperation with enterprises, universities, and research institutions. You can contact us through the following ways:',
        'faq-3-item-1': 'Send cooperation intention email',
        'faq-3-item-2': 'Fill out the contact form on the website',
        'faq-3-item-3': 'Contact the lab director directly',
    }
}; 