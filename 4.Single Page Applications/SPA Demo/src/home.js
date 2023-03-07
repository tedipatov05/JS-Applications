const section = document.getElementById('home-view');
section.remove();

export function showHomeView(inCtx) {
    inCtx.render(section)
}