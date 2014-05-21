chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create("html/index.html", {
        id: "app-window",
        bounds: {
            width: 320,
            height: 240
        }
    });
});
