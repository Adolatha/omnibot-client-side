self.addEventListener("push", (event) => {
    let data = { title: "Default Title", body: "Default body" };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            console.error("Error parsing push data:", e);
        }
    }

    const options = {
        body: data.body,
        icon: "/icon.png",
    };

    // Check permission before showing the notification
    if (Notification.permission === "granted") {
        event.waitUntil(self.registration.showNotification(data.title, options));
    } else {
        console.warn("Notification permission not granted.");
    }
});
