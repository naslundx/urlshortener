function create() {
    const url = document.getElementById("url").value;
    let label = document.getElementById("result");
    let userid = getCookie("userid");
    let history = document.getElementById("previouslist");

    makeRequest("GET", "/create?url=" + encodeURIComponent(url) + "&userid=" + userid)
        .then((result) => {
            result = JSON.parse(result);
            console.log(result);
            let newUrl = window.location.href + result.uid;
            label.innerText = label.href = newUrl;
            history.innerHTML = 
                `<li><a href="${newUrl}">/${result.uid}</a> -- ${result.url}</li>` 
                + history.innerHTML;
        })
        .catch((reason) => {
            console.log(reason);
        });
}