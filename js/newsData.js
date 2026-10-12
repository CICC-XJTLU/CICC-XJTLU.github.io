/* Dated research updates. The daily catalogue job supplies the reporting window. */
(() => {
    'use strict';
    const dataURL = new URL('../data/news.json', document.currentScript.src);
    let data = null;
    let language = 'zh';
    let limit = 6;
    let loadFailed = false;
    const $ = id => document.getElementById(id);
    const text = value => value == null ? '' : String(value);
    const local = (zh, en) => language === 'en' ? en : zh;
    const translated = (item, key) => text(language === 'en' ? item[key + '_en'] || item[key] : item[key] || item[key + '_en']);
    const element = (tag, className, value) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (value != null) node.textContent = text(value);
        return node;
    };
    function displayDate(item) {
        const date = text(item.date);
        const precision = item.date_precision;
        if (precision === 'year' || /^\d{4}$/.test(date)) return date.slice(0, 4);
        if (precision === 'month' || /^\d{4}-\d{2}$/.test(date)) return date.slice(0, 7);
        return date.slice(0, 10);
    }
    function card(item) {
        const article = element('article', 'catalog-news-card');
        const date = element('time', 'catalog-news-date', displayDate(item));
        date.dateTime = displayDate(item);
        article.append(date, element('h3', 'catalog-news-title', translated(item, 'title')));
        const description = translated(item, 'desc');
        if (description) article.append(element('p', 'catalog-news-description', description));
        const members = Array.isArray(item.members) ? item.members.map(value => typeof value === 'string' ? value : translated(value || {}, 'name')).filter(Boolean) : [];
        if (members.length) article.append(element('p', 'catalog-members', local('团队作者：', 'Team authors: ') + members.join(' · ')));
        try {
            const url = new URL(text(item.link));
            if (/^https?:$/.test(url.protocol)) {
                const link = element('a', 'publication-link', local('阅读论文 →', 'Read publication →'));
                link.href = url.href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                article.append(link);
            }
        } catch (_) { /* A record without an external source remains readable. */ }
        return article;
    }
    function render() {
        document.querySelectorAll('[data-news-zh]').forEach(node => {
            node.textContent = node.getAttribute(language === 'en' ? 'data-news-en' : 'data-news-zh');
        });
        if (!$('news-list')) return;
        const container = $('news-list');
        if (!data) {
            if (loadFailed) container.replaceChildren(element('p', 'catalog-empty', local('动态暂时无法加载，请刷新重试。', 'News is temporarily unavailable. Please refresh to try again.')));
            return;
        }
        const items = [...data.items].sort((a, b) => text(b.date).localeCompare(text(a.date)) || text(a.id).localeCompare(text(b.id)));
        container.replaceChildren();
        items.slice(0, limit).forEach(item => container.append(card(item)));
        if (!items.length) container.append(element('p', 'catalog-empty', local('最近三个月暂无新的成果动态。', 'No new research updates in the last three months.')));
        if ($('load-more-news')) $('load-more-news').hidden = items.length <= limit;
        if ($('news-window')) {
            const meta = data.meta || {};
            $('news-window').textContent = meta.window_start && meta.window_end ? text(meta.window_start) + ' — ' + text(meta.window_end) : '';
        }
        if ($('news-updated')) $('news-updated').textContent = data.meta && data.meta.updated_at ? local('最近更新：', 'Last updated: ') + text(data.meta.updated_at).slice(0, 10) : '';
    }
    document.addEventListener('languageChanged', event => {
        language = event.detail.language === 'en' ? 'en' : 'zh';
        render();
    });
    document.addEventListener('DOMContentLoaded', async () => {
        language = document.documentElement.lang === 'en' ? 'en' : 'zh';
        render();
        if (!$('news-list')) return;
        if ($('load-more-news')) $('load-more-news').addEventListener('click', () => { limit += 6; render(); });
        try {
            const response = await fetch(dataURL.href, {cache: 'no-cache'});
            if (!response.ok) throw new Error('News request failed: ' + response.status);
            const result = await response.json();
            if (!Array.isArray(result.items)) throw new Error('Invalid news feed');
            data = result;
            render();
        } catch (error) {
            loadFailed = true;
            console.error('Research news:', error.message);
            if ($('load-more-news')) $('load-more-news').hidden = true;
            render();
        }
    });
})();
