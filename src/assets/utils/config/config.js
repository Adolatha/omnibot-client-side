async function getConfig() {
    return fetch(`config.json`)
        .then(res => res.json())
        .catch(err => console.error("Could not fetch config.json:", err));
}

const config = await getConfig();
const siteBaseUrl = `${config.year ? config.year + '/' : ''}${config.group ? config.group + '/' : ''}`;
const apiBaseUrl = `${config.host ? config.host + '/' : ''}${siteBaseUrl}api/`;

export { siteBaseUrl, apiBaseUrl };
