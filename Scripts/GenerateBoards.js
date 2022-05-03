document.getElementById("grid-container").innerHTML = localStorage.getItem("boardsHTML");
if (!("hasCodeRunBefore" in localStorage)) {
    localStorage.setItem("boardsHTML", "");
    localStorage.setItem("boardsCount", "0");
    document.getElementById("grid-container").innerHTML = generateBoards(6);
    localStorage.setItem("hasCodeRunBefore", "true");
}
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById("grid-container").innerHTML = generateBoards(4);
    }
};
//# sourceMappingURL=GenerateBoards.js.map