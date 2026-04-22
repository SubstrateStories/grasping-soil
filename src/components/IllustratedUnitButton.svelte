<script>
    import { withBase } from '../lib/base';
    export let unit;
    export let title;
    export let path;
</script>
<a href={withBase(path)} class="button">
    <span class="label-position">
        <span class="label">{unit}. {title}</span>
    </span>
    <img
        role="presentation"
        class="color-overlay"
        src={withBase(`/images/unit-${unit}/banner.jpg`)}
        alt=""
    />
    <img
        role="presentation"
        class="fade-underlay"
        src={withBase(`/images/unit-${unit}/banner-fade.png`)}
        alt=""
    />
</a>

<style>
a.button {
    container-type: inline-size;
    display: inline-block;
    position: relative;
    width: 100%;
}

span.label-position {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    z-index: 2;
}

span.label {
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--primary-text-color);
    display: block;
    font-family: 'Paix', sans-serif;
    font-size: 3rem;
    padding: .3333em .6667em;
    text-transform: uppercase;
    z-index: 2;
}

img.color-overlay {
    display: block;
    max-width: 100%;
    opacity: 0;
    position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    transition: .3s all ease;
    width: 100%;
    z-index: 1;
}

a.button:hover img.color-overlay {
    opacity: 1;
}

img.fade-underlay {
    display: block;
    position: relative;
    max-width: 100%;
    width: 100%;
    z-index: 0;
}

@container (max-width: 680px) {
    span.label {
        font-size: 2.5rem;
    }

}

@container (max-width: 580px) {
    span.label {
        font-size: 2rem;
    }
}

@container (max-width: 464px) {
    span.label {
        font-size: 1.5rem;
    }
}

@container (max-width: 350px) {
    span.label {
        font-size: 1.25rem;
    }
}
</style>
