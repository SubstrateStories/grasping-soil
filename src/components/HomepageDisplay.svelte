<script>
    import {onMount} from 'svelte';
    import IllustratedUnitButton from "./IllustratedUnitButton.svelte";
    import { withBase } from '../lib/base';

    let scrollY;
    let container;
    let footer;
    let banner;
    let resizeTimer;
    let contentWrapper;
    let bannerHeight;
    let viewportHeight;
    let title;

    let starSvg;

    $: progress = calculateProgress(scrollY);
    $: bannerStyle = calculateBannerStyle(progress);
    $: {
        if (footer) {
            if (Math.ceil(window.innerHeight + scrollY) >= document.body.offsetHeight) {
                footer.classList.add('visible');
            } else {
                footer.classList.remove('visible');
            }
        }
    }

    const calculateProgress = (scroll) => {
        if (!viewportHeight) return 0;
        const scrollRange = viewportHeight;
        return Math.min(Math.max(scroll / scrollRange, 0), 1);
    };

    const calculateBannerStyle = (progress) => {
        if (!viewportHeight || !bannerHeight) return '';

        const startPosition = (viewportHeight - bannerHeight) / 4;
        const endPosition = viewportHeight - bannerHeight;
        const currentPosition = startPosition + (progress * (endPosition - startPosition));
        const opacity = progress === 1 ? 0.2 : 1 - (progress * 0.8);

        if (progress === 1) {
            return `position: fixed; bottom: 0; left: 0; right: 0; opacity: ${opacity};`;
        }

        return `position: fixed; top: ${currentPosition}px; left: 0; right: 0; opacity: ${opacity};`;
    };

    const ensureTitleVisible = () => {
        if (!title || !banner || !contentWrapper) return;

        setTimeout(() => {
            const titleRect = title.getBoundingClientRect();
            const viewportBottom = window.innerHeight;

            // If title is below viewport, adjust content position
            if (titleRect.top + (titleRect.height / 2) >= viewportBottom) {
                contentWrapper.style.marginTop = `${window.innerHeight / 2}px`;
            }
        }, 10);
    };

    const adjustLayout = (() => {
        viewportHeight = window.innerHeight;
        bannerHeight = banner.offsetHeight;

        // Set initial content margin to place it below the banner
        const initialBannerPosition = (viewportHeight - bannerHeight) / 4;
        contentWrapper.style.marginTop = `${initialBannerPosition + bannerHeight + 20}px`;

        progress = calculateProgress(scrollY);
        bannerStyle = calculateBannerStyle(progress);

        // Apply adjustment to make title visible if needed
        ensureTitleVisible();
    });

    onMount(() => {
        adjustLayout();

        import("../assets/star.svg?raw").then(result => starSvg = result.default);

        const handleResize = () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                adjustLayout();
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
</script>

<svelte:window bind:scrollY/>

<div class="container" bind:this={container}>
    <div
            class="banner"
            bind:this={banner}
            style={bannerStyle}
    >
        <div class="banner-content">
            <img src={withBase('/images/homepage-banner.jpg')} width="1440" height="486" alt=""/>
        </div>
    </div>

    <!-- Content -->
    <div class="content-wrapper" bind:this={contentWrapper}>
        <div class="content">
            <h1 class="title" bind:this={title}>Grasping Soil</h1>

            <div class="intro-links">
                a <a class="syllabus-link" href={withBase('/syllabus')}>syllabus</a> + <a class="essays-link" href={withBase('/essays')}>essays</a>
            </div>
            <div class="horizontal-stars">
                {#if starSvg}
                    <span>{@html starSvg}</span>
                    <span>{@html starSvg}</span>
                    <span>{@html starSvg}</span>
                {/if}
            </div>
            <div class="abstract">
                <p class="large">
                    Welcome to Grasping Soil, a syllabus and collection of essays that all ask, in some fundamental way: what
                    comes into view when we consider soil as both a container of human history and point of view for inquiry?
                </p>
                <p>
                    Soil occupies a nearly ubiquitous presence in our lives regardless of whether we spend much time noticing it. Soil
                    holds worlds within it and also builds other worlds; it devours and remakes things; it sustains life and gives cover
                    to the dead. When was the last time you stuck your hands in it or found it under your nails? Your answer probably
                    reveals something about where you live, your age, your job. You might interact with soil for a living or retreat
                    to it as an escape from the demands of life. But even if it has been a long time since you last held it in your hands,
                    can you still recall what soil smells like after it rains? Conjuring that smell might even transport you back to a
                    very specific moment in your life. In this way, soil is a generous and generative thing -- a material we all draw
                    on for life as well as a figurative vessel holding deep emotion and connection.
                </p>
                <p>
                    Even if actual soil might be invisible in your everyday routines, once you’re attuned to it, you might start
                    noticing that a language and imagery of it pervades political and cultural life. As you explore the syllabus
                    you will find links here to books, articles, videos, and art. Please enjoy discovering new things! But beyond
                    being a repository of links, <a href={withBase('/contributors')}>we</a> have sought to create a syllabus that can actually
                    be taught (or self-taught), including assignments, discussion questions, writing prompts and forays out into
                    the world to actually touch soil. As a collective endeavor, there is a delightful and inevitable patchiness to
                    the final product. Not every section of the syllabus has the same voice and different units might be pitched to different learners.
                </p>
                <p>
                    Where possible, we have linked to open source texts alongside other media. Because of the nature of academic publishing,
                    that is not always possible. If you would like to get access to something but cannot, <a href="#">contact us</a>. Also, we would
                    love to hear from you about how you use the syllabus – whether from top to bottom, as something to browse, or if you
                    borrow chunks of it for your own purposes.
                </p>
                <p>
                    As you explore the syllabus, you will also find links to our essays along the way, which you can also find
                    <a href={withBase('/essays')}>here</a>. The essays, based on our research interests, explore moments where soil is
                    both the subject at hand (being assessed, amended, removed, etc) and the vehicle for remaking politics, health,
                    ideas of home and belonging as well as visions of the future.
                </p>
            </div>
            <div class="links">
                <IllustratedUnitButton
                        unit={1}
                        title="Soil as Substrate"
                        path="/units/1-soil-as-substrate"
                />
            </div>
        </div>
    </div>

    <footer bind:this={footer}>
        <p>
            &copy; {(new Date().getFullYear())} / <a href={withBase('/colophon')}>Colophon</a>
        </p>
    </footer>
</div>

<style>
    h1.title {
        box-shadow: 0 10px 10px rgba(255, 255, 255, 0.9);
        background-color: white;
        color: var(--primary-text-color);
        font-family: 'Ocotillo', sans-serif;
        font-size: 5rem;
        font-weight: normal;
        line-height: 80%;
        margin: 0;
        padding: 2rem;
        position: relative;
        top: -2rem;
        right: -2rem;
        left: -2rem;
        text-align: center;
        text-transform: uppercase;
        width: calc(100% + 4rem);
    }

    .container {
        position: relative;
        min-height: 200vh;
    }

    .banner {
        width: 100%;
        transition: all 75ms;
        z-index: 1;
    }

    .banner-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .banner-content img {
        border-color: #96b4aa;
        border-style: solid;
        border-width: 0 0 8px 0;
        display: block;
        height: auto;
        margin: 0 auto;
        max-width: 100%;
        width: auto;
    }

    .content {
        background-color: rgba(255, 255, 255, 0.85);
        font-size: 18px;
        max-width: 800px;
        margin: 0 auto 520px auto;
        overflow: hidden;
        padding: 2rem;
        position: relative;
        width: 80%;
        z-index: 10;
    }

    .abstract a {
        color: var(--secondary-text-color);
        font-weight: 500;
        text-decoration-color: #96b4aa;
        transition: all .1s ease;
    }

    .abstract a:hover {
        color: #96b4aa;
    }

    .intro-links {
        color: var(--secondary-text-color);
        font-family: 'Paix', sans-serif;
        font-size: 2rem;
        margin: 0 0 3rem 0;
        text-align: center;
        text-transform: uppercase;
    }

    .intro-links a {
        color: var(--primary-text-color);
        text-decoration-color: transparent;
        transition: all .3s ease;
    }

    .intro-links a:hover {
        text-decoration-color: var(--primary-text-color);
    }

    .abstract p:first-of-type {
        margin-top: 0;
    }

    .abstract p {
        font-size: 1.2rem;
        font-weight: 300;
        line-height: 145%;
        margin: 2rem auto;
        max-width: 740px;
    }

    .abstract p.large {
        font-size: 1.4rem;
        font-weight: 400;
    }

    .horizontal-stars {
        column-gap: .5rem;
        display: flex;
        justify-content: center;
        margin-bottom: 3rem;
    }

    .horizontal-stars span {
        display: block;
        width: 1.5rem;
    }

    .horizontal-stars span :global(svg path) {
        fill: #96b4aa;
    }

    .links {
        margin-top: 4rem;
    }

    footer {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 -4px 10px rgba(255, 255, 255, 0.8);
        height: auto;
        min-height: auto;
        opacity: 0;
        padding: .5rem 2rem;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        transition: .3s all ease;
        z-index: 100;
    }

    :global(footer.visible) {
        opacity: 1;
    }

    footer p {
        font-size: 1rem;
        height: auto;
        line-height: 100%;
        text-align: right;
        margin: 0;
    }

    footer a {
        color: var(--primary-text-color);
        text-decoration-color: transparent;
        transition: .1s all ease;
    }

    footer a:hover {
        text-decoration-color: var(--primary-text-color);
    }

    @media all and (max-width: 664px) {
        h1.title {
            font-size: 4.5rem;
        }
    }

    @media all and (max-width: 604px) {
        h1.title {
            font-size: 4rem;
        }

        .intro-links {
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }
    }

    @media all and (max-width: 540px) {
        .content {
            width: 94%;
        }

        .abstract p.large {
            font-size: 1.2rem;
            font-weight: 400;
        }
    }

    @media all and (max-width: 454px) {
        h1.title {
            font-size: 3rem;
        }
    }

    @media all and (max-width: 366px) {
        h1.title {
            font-size: 2.5rem;
        }
    }
</style>