function newRes(prevRes,wordname,catname,taskNb, idcat, idword){
    let res = prevRes;
    res.catname = catname;
    res.wordname = wordname;
    res.taskNb = parseInt(taskNb); 
    res.idcat = parseInt(idcat);
    res.idword = parseInt(idword);
    console.log(res)
    chrome.runtime.sendMessage({msg: "keywordFindItem", value: res})
}

function findingArticleByKeyword(kw,catname,taskNb,idcat){
    console.log(taskNb)
    let reg=new RegExp("[,]+", "g");
    let words=kw.split(reg);
    let res = {};
    let i = 0;
    let articles = document.getElementsByClassName('inner-article')
    while (i < words.length)
    {
        let mdlFind = words[i].split('/')[0].toLowerCase().trim();
        let colorFind = words[i].split('/')[1].toLowerCase().trim();
        let j = 0;
        while (j < articles.length) {
            let mdl = articles[j].getElementsByTagName('a')[1].innerText.toLowerCase().trim();
            let color = articles[j].getElementsByTagName('a')[2].innerText.toLowerCase().trim();

            if (color == ""){
                color = true;
            }
            if (color.includes(colorFind) && mdl.includes(mdlFind))
            {
                res.link = articles[j].getElementsByTagName('a')[2].href;
            }

            j++;
        }
        newRes(res,words[i], catname, taskNb, idcat, i);
        i++;
    }
    
    
}
