(function () {
    // ── Menu mobile ──
    var btn      = document.querySelector('.nav-toggle');
    var sidebar  = document.getElementById('site-sidebar');
    var backdrop = document.querySelector('.nav-backdrop');
    if (!btn || !sidebar || !backdrop) return;

    function setOpen(open) {
        document.body.classList.toggle('nav-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label',    open ? 'Fermer le menu' : 'Ouvrir le menu');
        backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) { backdrop.removeAttribute('inert'); }
        else       { backdrop.setAttribute('inert', ''); }
    }

    btn.addEventListener('click',    function () { setOpen(!document.body.classList.contains('nav-open')); });
    backdrop.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    sidebar.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.matchMedia('(max-width: 991.98px)').matches) setOpen(false);
        });
    });

    // ── Lien actif au scroll ──
    var navLinks = Array.from(sidebar.querySelectorAll('a[href^="#"]'));
    var sections = navLinks.map(function (l) {
        return document.querySelector(l.getAttribute('href'));
    }).filter(Boolean);

    function updateActive() {
        var scrollY = window.scrollY + 120;
        var current = sections[0];
        sections.forEach(function (s) { if (s.offsetTop <= scrollY) current = s; });
        navLinks.forEach(function (l) {
            l.classList.toggle('active', current && current.id === l.getAttribute('href').slice(1));
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();
