/**
 * @param min The minimum number that should be possible
 * @param max The maximum number that should be possible
 * @returns A random integer number between min and max (inclusive)
 */
export function random(min: number, max: number) {
    return Math.max(min, Math.round(Math.random() * max));
}

type generationConstraint = [number, number];

/** 
 * @param constraints A set of [min, max] constraints for each random generation
 * @returns A list of numbers representing the linked random generations
 */
export function linkedRandom(constraints: generationConstraint[]) {
    const rand = Math.random();
    let results = constraints.map(constraint => {
        return Math.max(constraint[0], Math.round(rand * constraint[1]));
    });
    return results;
}

/**
 * Returns a boolean based on whether the provided object has been
 * scrolled past, meaning it is more than halfway up the viewport.
 * @param scrollBody The DOM element being scrolled
 * @param object The child of scrollBody to check
 * @returns {boolean} Whether or not the object has been scrolled past
 */
export function scrolledPast(scrollBody: Element, object: HTMLElement): boolean {
    return (scrollBody.scrollTop > (object.offsetTop - 2 * object.offsetHeight));
}

/**
 * @param scrollBody The DOM element being scrolled
 * @param object The child of scrollBody to scroll to
 */
function scrollTo(scrollBody: HTMLElement, object: HTMLElement) {
    scrollBody.scrollTo({ top: (object.offsetTop - object.offsetHeight), behavior: "smooth" });
}

export function scrollToTop() {
    const wrapper = document.getElementById("wrapper")!;
    wrapper.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToHref(href: string) {
    const wrapper = document.getElementById("wrapper")!;
    const target = document.getElementById(href)!;
    scrollTo(wrapper, target);
}

export function isBrowserFirefox() {
    return navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
}