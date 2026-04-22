<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { withBase } from '../lib/base';

    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

    let hamburgerSvg;
    let navVisible = false;
    let currentPath = '';

    const clickHandler = (e) => {
        navVisible = !navVisible;
    };

    const closeMenu = () => {
        navVisible = false;
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape' && navVisible) {
            closeMenu();
        }
    };

    const isActivePath = (href) => {
        if (!currentPath) return false;
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    onMount(() => {
        import("../assets/hamburger.svg?raw").then(result => hamburgerSvg = result.default);
        if (typeof window !== 'undefined') {
            let pathname = window.location.pathname;
            if (basePath && pathname.startsWith(basePath)) {
                pathname = pathname.slice(basePath.length) || '/';
            }
            currentPath = pathname;
            window.addEventListener('keydown', handleEscape);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', handleEscape);
        }
    });
</script>

<div class="hamburger-container">
    <button on:click={clickHandler}>
        {@html hamburgerSvg}
    </button>
</div>
{#if navVisible}
    <div class="backdrop" on:click={closeMenu} on:keydown={(e) => e.key === 'Enter' && closeMenu()} role="button" tabindex="-1" aria-label="Close menu" transition:fade={{ duration: 200 }}></div>
    <div class="nav-overlay" transition:fade={{ duration: 200 }}>
        <ul class="top-level">
            <li>
                <a href={withBase('/syllabus')} class:active={isActivePath('/syllabus')}>Syllabus</a>
                <ul class="unit-list">
                    <li><a href={withBase('/units/1-soil-as-substrate')} class:active={isActivePath('/units/1-soil-as-substrate')}>Soil as Substrate</a></li>
                    <li><a href={withBase('/units/2-soil-as-archive')} class:active={isActivePath('/units/2-soil-as-archive')}>Soil as Archive</a></li>
                    <li><a href={withBase('/units/3-soil-as-health')} class:active={isActivePath('/units/3-soil-as-health')}>Soil as Health</a></li>
                    <li><a href={withBase('/units/4-soil-as-belonging')} class:active={isActivePath('/units/4-soil-as-belonging')}>Soil as Belonging</a></li>
                </ul>
            </li>
            <li><a href={withBase('/essays')} class:active={isActivePath('/essays')}>Essays</a></li>
            <li><a href={withBase('/contributors')} class:active={isActivePath('/contributors')}>Contributors</a></li>
        </ul>
    </div>
{/if}

<style>
.hamburger-container {
    align-items: center;
    display: flex;
    height: 48px;
    justify-content: center;
    position: fixed;
        top: 20px;
        right: 20px;
    width: 48px;
    z-index: 200;
}

button {
    align-items: center;
    background-color: white;
    border-radius: 48px;
    border-width: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 48px;
    width: 48px;
}

button svg {
    max-width: 36px;
}

.backdrop {
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    z-index: 198;
}

.nav-overlay {
    background-color: white;
    border-color: var(--secondary-text-color);
    border-style: solid;
    border-width: 0 0 1px 1px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 80px 40px 20px 20px;
    position: fixed;
        top: 0;
        right: 0;
    z-index: 199;
}

.nav-overlay ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
}

.nav-overlay ul.top-level {
    font-weight: 500;
}

.nav-overlay ul.top-level > li {
    margin-bottom: 0;
}

.nav-overlay ul.top-level > li:last-of-type {
    margin-bottom: 0;
}

.nav-overlay ul.unit-list {
    list-style-type: decimal;
    font-weight: 300;
    margin-left: 24px;
}

.nav-overlay a {
    color: var(--primary-text-color);
    display: inline-block;
    padding: 12px 8px;
    text-decoration-color: transparent;
    transition: .1s all ease;
}

.nav-overlay a:hover {
    color: var(--secondary-text-color);
    text-decoration-color: var(--secondary-text-color);
}

.nav-overlay a.active {
    color: var(--secondary-text-color);
    text-decoration-color: var(--secondary-text-color);
    text-decoration-line: underline;
}

@media all and (max-width: 440px) {
    .hamburger-container {
        height: 40px;
        width: 40px;
    }

    button {
        height: 40px;
        width: 40px;
        border-radius: 40px;
    }

    button svg {
        max-width: 30px;
    }
}
</style>
