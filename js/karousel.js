document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const items = Array.from(track.children);

    items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    const allItems = track.querySelectorAll(".carousel-item");

    allItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            track.classList.add("paused");
            item.classList.add("zoomed");
        });

        item.addEventListener("mouseleave", () => {
            track.classList.remove("paused");
            item.classList.remove("zoomed");
        });

        item.addEventListener("click", (e) => {
            if (item.classList.contains("zoomed")) {
                item.classList.remove("zoomed");
                track.classList.remove("paused");
            } else {
                allItems.forEach(i => i.classList.remove("zoomed"));
                item.classList.add("zoomed");
                track.classList.add("paused");
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!track.contains(e.target)) {
            allItems.forEach((item) => {
                item.classList.remove("zoomed");
            });
            track.classList.remove("paused");
        }
    });
});