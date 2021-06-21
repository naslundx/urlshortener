"use strict";

let links = {};

function create_uid(length = 7) {
    return Math.random().toString(36).substring(length);
}

function getValidUrl(url = "") {
    let newUrl = decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if(/^(:\/\/)/.test(newUrl)){
        return `http${newUrl}`;
    }
    if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
        return `https://${newUrl}`;
    }

    return newUrl;
};

function shorten(url, userid) {
    let uid = create_uid();
    let result = {
        uid,
        url: getValidUrl(url),
        userid,
        date: new Date()
    };

    links[uid] = result;

    console.log(links[uid]);

    return result;
}

function follow(uid) {
    if (uid in links) {
        return links[uid].url;
    }

    return null;
}

function allByUser(userid) {
    if (typeof userid === "string") {
        return Object.values(links).filter((l) => l.userid === userid);
    }
    return [];
}

function prune() {
    // TODO remove links that are too old
}

module.exports = {follow, allByUser, shorten, prune, create_uid};